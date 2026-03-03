import './HomeScreen.css'

export function HomeScreen({ onSelectDevice }) {
  return (
    <div className="screen home-screen">
      <p className="home-greeting">hello babi this game is just for you</p>
      <p className="home-question">Are you playing on a phone or computer?</p>
      <div className="home-buttons">
        <button
          type="button"
          className="btn btn-primary home-btn"
          onClick={() => onSelectDevice('phone')}
        >
          📱 Phone
        </button>
        <button
          type="button"
          className="btn btn-primary home-btn"
          onClick={() => onSelectDevice('computer')}
        >
          💻 Computer
        </button>
      </div>
    </div>
  )
}
