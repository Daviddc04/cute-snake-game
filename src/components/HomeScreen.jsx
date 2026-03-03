import './HomeScreen.css'

export function HomeScreen({ onSelectDevice, onExploreWorld }) {
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
      <p className="home-or">or</p>
      <button
        type="button"
        className="btn btn-secondary home-btn"
        onClick={onExploreWorld}
      >
        🌍 Explore World
      </button>
    </div>
  )
}
