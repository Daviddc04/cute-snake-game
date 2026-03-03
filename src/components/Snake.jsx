import { useState } from 'react'
import './Snake.css'

const CAT_SRC = { cat: '/assets/cat.JPG', cat2: '/assets/cat2.JPG', cat3: '/assets/cat3.JPG' }

export function Snake({ snake, gridSize, selectedCat = 'cat' }) {
  const [headImgError, setHeadImgError] = useState(false)
  const [head] = snake
  const body = snake.slice(1)
  const headSrc = CAT_SRC[selectedCat] || CAT_SRC.cat

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
              src={headSrc}
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
