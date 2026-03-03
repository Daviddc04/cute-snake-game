import './Board.css'

export function Board({ gridSize, children }) {
  return (
    <div
      className="board"
      style={{
        '--grid-size': gridSize,
      }}
    >
      {children}
    </div>
  )
}
