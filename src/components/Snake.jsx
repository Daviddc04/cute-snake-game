import { useState } from 'react'
import './Snake.css'

export function Snake({ snake, gridSize }) {
  const [headImgError, setHeadImgError] = useState(false)
  const [head] = snake
  const body = snake.slice(1)

  return (
    <>
      {head && (
        <div
          className="snake-cell snake-head"
          style={{
            gridColumn: head.x + 1,
            gridRow: head.y + 1,
          }}
        >
          {headImgError ? (
            <span className="snake-head-emoji" aria-hidden>🐱</span>
          ) : (
            <img
              src="/assets/cat.JPG"
              alt="Snake head"
              className="snake-head-img"
              onError={() => setHeadImgError(true)}
            />
          )}
        </div>
      )}
      {body.map((segment, i) => (
        <div
          key={`${segment.x}-${segment.y}-${i}`}
          className="snake-cell snake-body"
          style={{
            gridColumn: segment.x + 1,
            gridRow: segment.y + 1,
          }}
        >
          🐱
        </div>
      ))}
    </>
  )
}
