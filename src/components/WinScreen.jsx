import './WinScreen.css'

export function WinScreen({ onPlayAgain }) {
  return (
    <div className="screen win-screen overlay">
      <h2 className="heading heading-xl">You did it!</h2>
      <p className="win-message">Congratulations babi! You reached 25 points!</p>
      <p className="win-sub">You&apos;re amazing at games.</p>
      <button type="button" className="btn btn-primary win-btn" onClick={onPlayAgain}>
        Play Again
      </button>
    </div>
  )
}
