import './GameOverScreen.css'

export function GameOverScreen({ onTryAgain }) {
  return (
    <div className="screen gameover-screen overlay">
      <h2 className="heading heading-lg">Oops! Try again babi!</h2>
      <button type="button" className="btn btn-primary gameover-btn" onClick={onTryAgain}>
        Try Again
      </button>
    </div>
  )
}
