import './EatFeedback.css'

export function EatFeedback({ position, visible }) {
  if (!position || !visible) return null
  return (
    <div
      className="eat-feedback"
      style={{
        gridColumn: position.x + 1,
        gridRow: position.y + 1,
      }}
    >
      <span className="eat-feedback-text">+3</span>
    </div>
  )
}
