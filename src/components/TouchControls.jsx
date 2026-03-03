import './TouchControls.css'

export function TouchControls({ onDirection }) {
  return (
    <div className="touch-controls" role="group" aria-label="Direction controls">
      <button
        type="button"
        className="touch-btn touch-up"
        onClick={() => onDirection('UP')}
        aria-label="Up"
      >
        ↑
      </button>
      <div className="touch-row">
        <button
          type="button"
          className="touch-btn touch-left"
          onClick={() => onDirection('LEFT')}
          aria-label="Left"
        >
          ←
        </button>
        <div className="touch-spacer" />
        <button
          type="button"
          className="touch-btn touch-right"
          onClick={() => onDirection('RIGHT')}
          aria-label="Right"
        >
          →
        </button>
      </div>
      <button
        type="button"
        className="touch-btn touch-down"
        onClick={() => onDirection('DOWN')}
        aria-label="Down"
      >
        ↓
      </button>
    </div>
  )
}
