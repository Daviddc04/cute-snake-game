import { useEffect, useState } from 'react'
import { useGameLogic } from '../hooks/useGameLogic'
import { Board } from './Board'
import { Snake } from './Snake'
import { Food } from './Food'
import { TouchControls } from './TouchControls'
import { WinScreen } from './WinScreen'
import { GameOverScreen } from './GameOverScreen'
import { CatStore } from './CatStore'
import './GameScreen.css'

const STORAGE_MAX_SCORE = 'cuteSnakeMaxScore'
const STORAGE_SELECTED_CAT = 'cuteSnakeSelectedCat'

function getStoredMaxScore() {
  try {
    const n = parseInt(localStorage.getItem(STORAGE_MAX_SCORE) || '0', 10)
    return isNaN(n) ? 0 : n
  } catch {
    return 0
  }
}

export function GameScreen({ deviceType }) {
  const {
    snake,
    food,
    score,
    isRunning,
    isGameOver,
    isWin,
    setDirection,
    startGame,
    resetGame,
    gridSize,
  } = useGameLogic()

  const [maxScoreReached, setMaxScoreReached] = useState(getStoredMaxScore)
  const [selectedCat, setSelectedCat] = useState(() => {
    try {
      const s = localStorage.getItem(STORAGE_SELECTED_CAT)
      return s === 'cat2' || s === 'cat3' ? s : 'cat'
    } catch {
      return 'cat'
    }
  })

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
      {showPlayButton && (
        <>
          <p className="game-prompt">Ready when you are!</p>
          <button type="button" className="btn btn-primary game-play-btn" onClick={startGame}>
            Play Game
          </button>
        </>
      )}

      {gameStarted && (
        <>
          <div className="game-score">
            Score: <strong>{score}</strong> / 25
          </div>
          <CatStore
            maxScoreReached={maxScoreReached}
            selectedCat={selectedCat}
            onSelectCat={handleSelectCat}
          />
          <div className="game-board-wrap">
            <Board gridSize={gridSize}>
              <Food food={food} />
              <Snake snake={snake} gridSize={gridSize} selectedCat={selectedCat} />
            </Board>
            {isWin && <WinScreen onPlayAgain={() => resetGame()} />}
            {isGameOver && <GameOverScreen onTryAgain={() => resetGame()} />}
          </div>
          {deviceType === 'phone' && (
            <TouchControls onDirection={setDirection} />
          )}
        </>
      )}
    </div>
  )
}
