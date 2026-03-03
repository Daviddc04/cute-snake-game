import './WinScreen.css'

const WIN_MESSAGES = [
  { title: 'You did it!', sub: "Congratulations babi! You reached 25 points! You're amazing at games." },
  { title: 'So good, babi!', sub: "25 points! You crushed it. You're a natural." },
  { title: "You're a star!", sub: 'Congratulations! 25 points. So proud of you.' },
  { title: 'Amazing at games!', sub: 'You reached 25 points! Well done, babi.' },
  { title: 'Incredible!', sub: "25 points! You're so good at this. Love it." },
]

export function WinScreen({ onPlayAgain }) {
  const msg = WIN_MESSAGES[Math.floor(Math.random() * WIN_MESSAGES.length)]
  return (
    <div className="screen win-screen overlay">
      <h2 className="heading heading-xl">{msg.title}</h2>
      <p className="win-message">{msg.sub}</p>
      <button type="button" className="btn btn-primary win-btn" onClick={onPlayAgain}>
        Play Again
      </button>
    </div>
  )
}
