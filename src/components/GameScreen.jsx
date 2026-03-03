import { useEffect, useState, useCallback } from 'react'
import { useGameLogic } from '../hooks/useGameLogic'
import { Board } from './Board'
import { Snake } from './Snake'
import { Food } from './Food'
import { EatFeedback } from './EatFeedback'
import { MilestoneToast } from './MilestoneToast'
import { TouchControls } from './TouchControls'
import { WinScreen } from './WinScreen'
import { GameOverScreen } from './GameOverScreen'
import { CatStore } from './CatStore'
import './GameScreen.css'

const STORAGE_MAX_SCORE = 'cuteSnakeMaxScore'
const STORAGE_SELECTED_CAT = 'cuteSnakeSelectedCat'
const STORAGE_TOTAL_GAMES = 'cuteSnakeTotalGames'
const STORAGE_TOTAL_FISH = 'cuteSnakeTotalFish'

function getStoredMaxScore() {
  try {
    const n = parseInt(localStorage.getItem(STORAGE_MAX_SCORE) || '0', 10)
    return isNaN(n) ? 0 : n
  } catch {
    return 0
  }
}

function getStoredStat(key, def = 0) {
  try {
    const n = parseInt(localStorage.getItem(key) || String(def), 10)
    return isNaN(n) ? def : n
  } catch {
    return def
  }
}

function setStoredStat(key, value) {
  try {
    localStorage.setItem(key, String(value))
  } catch {}
}

const EAT_FEEDBACK_MS = 400
const MILESTONE_SCORES = [5, 10, 15, 20]
const MILESTONE_MESSAGES = {
  5: "You're doing great!",
  10: 'Halfway there!',
  15: 'Almost there!',
  20: 'So close!',
}

const STORAGE_SEEN_HINT = 'cuteSnakeSeenHint'
const SPEED_EASY = 350
const SPEED_NORMAL = 290
const SPEED_HARD = 220

export function GameScreen({ deviceType, onGoHome }) {
  const [eatFeedback, setEatFeedback] = useState(null)
  const [milestoneMessage, setMilestoneMessage] = useState(null)
  const [maxScoreReached, setMaxScoreReached] = useState(getStoredMaxScore)
  const [totalGames, setTotalGames] = useState(() => getStoredStat(STORAGE_TOTAL_GAMES))
  const [totalFish, setTotalFish] = useState(() => getStoredStat(STORAGE_TOTAL_FISH))
  const [selectedCat, setSelectedCat] = useState(() => {
    try {
      const s = localStorage.getItem(STORAGE_SELECTED_CAT)
      return s === 'cat2' || s === 'cat3' ? s : 'cat'
    } catch {
      return 'cat'
    }
  })
  const [difficulty, setDifficulty] = useState('normal')
  const [showHint, setShowHint] = useState(() => {
    try {
      return !localStorage.getItem(STORAGE_SEEN_HINT)
    } catch {
      return false
    }
  })

  const speedMs = difficulty === 'easy' ? SPEED_EASY : difficulty === 'hard' ? SPEED_HARD : SPEED_NORMAL

  const handleAteFood = useCallback((position) => {
    setEatFeedback({ ...position, key: Date.now() })
    setTotalFish((prev) => {
      const next = prev + 1
      setStoredStat(STORAGE_TOTAL_FISH, next)
      return next
    })
  }, [])

  const {
    snake,
    food,
    score,
    isRunning,
    isPaused,
    togglePause,
    isGameOver,
    isWin,
    setDirection,
    startGame,
    resetGame,
    gridSize,
  } = useGameLogic({ onAteFood: handleAteFood, speedMs })

  const handleStartGame = useCallback(() => {
    startGame()
    setTotalGames((prev) => {
      const next = prev + 1
      setStoredStat(STORAGE_TOTAL_GAMES, next)
      return next
    })
  }, [startGame])

  const dismissHint = useCallback(() => {
    setShowHint(false)
    try {
      localStorage.setItem(STORAGE_SEEN_HINT, '1')
    } catch {}
  }, [])

  useEffect(() => {
    if (!eatFeedback) return
    const t = setTimeout(() => setEatFeedback(null), EAT_FEEDBACK_MS)
    return () => clearTimeout(t)
  }, [eatFeedback])

  useEffect(() => {
    if (MILESTONE_SCORES.includes(score)) {
      setMilestoneMessage(MILESTONE_MESSAGES[score])
      const t = setTimeout(() => setMilestoneMessage(null), 1500)
      return () => clearTimeout(t)
    }
  }, [score])

  useEffect(() => {
    if (isGameOver || isWin) {
      const newMax = Math.max(maxScoreReached, score)
      setMaxScoreReached(newMax)
      try {
        localStorage.setItem(STORAGE_MAX_SCORE, String(newMax))
      } catch {}
    }
  }, [isGameOver, isWin, score, maxScoreReached])

  const handleSelectCat = (catId) => {
    setSelectedCat(catId)
    try {
      localStorage.setItem(STORAGE_SELECTED_CAT, catId)
    } catch {}
  }

  const isComputer = deviceType === 'computer'

  useEffect(() => {
    if (!isComputer || !isRunning) return
    const map = {
      ArrowUp: 'UP',
      ArrowDown: 'DOWN',
      ArrowLeft: 'LEFT',
      ArrowRight: 'RIGHT',
      w: 'UP',
      W: 'UP',
      s: 'DOWN',
      S: 'DOWN',
      a: 'LEFT',
      A: 'LEFT',
      d: 'RIGHT',
      D: 'RIGHT',
    }
    const onKeyDown = (e) => {
      const dir = map[e.key]
      if (dir) {
        e.preventDefault()
        setDirection(dir)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isComputer, isRunning, setDirection])

  const showPlayButton = !isRunning && !isGameOver && !isWin && snake.length === 1 && score === 0
  const gameStarted = isRunning || isGameOver || isWin || score > 0

  return (
    <div className="screen game-screen">
      {onGoHome && (
        <button type="button" className="game-home-btn" onClick={onGoHome}>
          Home
        </button>
      )}
      {showPlayButton && (
        <>
          <p className="game-prompt">Ready when you are!</p>
          <p className="game-difficulty-label">How do you want to play?</p>
          <div className="game-difficulty-btns">
            <button
              type="button"
              className={`btn ${difficulty === 'easy' ? 'btn-primary' : 'btn-secondary'} game-difficulty-btn`}
              onClick={() => setDifficulty('easy')}
            >
              Easy
            </button>
            <button
              type="button"
              className={`btn ${difficulty === 'normal' ? 'btn-primary' : 'btn-secondary'} game-difficulty-btn`}
              onClick={() => setDifficulty('normal')}
            >
              Normal
            </button>
            <button
              type="button"
              className={`btn ${difficulty === 'hard' ? 'btn-primary' : 'btn-secondary'} game-difficulty-btn`}
              onClick={() => setDifficulty('hard')}
            >
              Hard
            </button>
          </div>
          <button type="button" className="btn btn-primary game-play-btn" onClick={handleStartGame}>
            Play Game
          </button>
        </>
      )}

      {gameStarted && (
        <>
          <div className="game-score-row">
            <div className="game-score">
              Score: <strong>{score}</strong> / 25
            </div>
            {isRunning && (
              <button type="button" className="btn btn-secondary game-pause-btn" onClick={togglePause}>
                {isPaused ? 'Resume' : 'Pause'}
              </button>
            )}
          </div>
          <div className="game-stats">
            Best: <strong>{maxScoreReached}</strong> &bull; Games: <strong>{totalGames}</strong> &bull; Fish eaten: <strong>{totalFish}</strong>
          </div>
          <CatStore
            maxScoreReached={maxScoreReached}
            selectedCat={selectedCat}
            onSelectCat={handleSelectCat}
          />
          <div className="game-board-wrap">
            {isPaused && <div className="game-paused-overlay">Paused</div>}
            {isRunning && showHint && (
              <div className="game-hint-overlay">
                <p className="game-hint-text">
                  Tap the arrows (or use keyboard) to move. Eat the fish to grow. Don&apos;t hit the walls or your tail!
                </p>
                <button type="button" className="btn btn-primary game-hint-btn" onClick={dismissHint}>
                  Got it
                </button>
              </div>
            )}
            <Board gridSize={gridSize}>
              <Food food={food} />
              <Snake snake={snake} gridSize={gridSize} selectedCat={selectedCat} />
              <EatFeedback position={eatFeedback} visible={!!eatFeedback} />
            </Board>
            {isWin && <WinScreen onPlayAgain={() => resetGame()} />}
            {isGameOver && <GameOverScreen onTryAgain={() => resetGame()} />}
          </div>
          {deviceType === 'phone' && !isPaused && (
            <TouchControls onDirection={setDirection} />
          )}
          <MilestoneToast message={milestoneMessage} visible={!!milestoneMessage} />
        </>
      )}
    </div>
  )
}
