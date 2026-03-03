import { useEffect } from 'react'
import { useGameLogic } from '../hooks/useGameLogic'
import { Board } from './Board'
import { Snake } from './Snake'
import { Food } from './Food'
import { TouchControls } from './TouchControls'
import { WinScreen } from './WinScreen'
import { GameOverScreen } from './GameOverScreen'
import './GameScreen.css'

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
          <div className="game-board-wrap">
            <Board gridSize={gridSize}>
              <Food food={food} />
              <Snake snake={snake} gridSize={gridSize} />
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
