import { useState, useCallback, useRef, useEffect } from 'react'

const GRID_SIZE = 15
const WIN_SCORE = 25
const SPEED_MS = 150

const DIRECTIONS = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 },
}

function randomCell() {
  return {
    x: Math.floor(Math.random() * GRID_SIZE),
    y: Math.floor(Math.random() * GRID_SIZE),
  }
}

function randomFoodNotOnSnake(snake) {
  const set = new Set(snake.map((s) => `${s.x},${s.y}`))
  let cell = randomCell()
  while (set.has(`${cell.x},${cell.y}`)) {
    cell = randomCell()
  }
  return cell
}

export function useGameLogic() {
  const [snake, setSnake] = useState([{ x: Math.floor(GRID_SIZE / 2), y: Math.floor(GRID_SIZE / 2) }])
  const [food, setFood] = useState(() => randomFoodNotOnSnake([{ x: Math.floor(GRID_SIZE / 2), y: Math.floor(GRID_SIZE / 2) }]))
  const [direction, setDirectionState] = useState(DIRECTIONS.RIGHT)
  const [score, setScore] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [isGameOver, setIsGameOver] = useState(false)
  const [isWin, setIsWin] = useState(false)

  const nextDirectionRef = useRef(DIRECTIONS.RIGHT)
  const intervalRef = useRef(null)
  const scoreRef = useRef(0)
  scoreRef.current = score

  const setDirection = useCallback((dir) => {
    if (!dir || !DIRECTIONS[dir]) return
    const next = DIRECTIONS[dir]
    const current = nextDirectionRef.current
    const opposite =
      (current.x === 1 && next.x === -1) ||
      (current.x === -1 && next.x === 1) ||
      (current.y === 1 && next.y === -1) ||
      (current.y === -1 && next.y === 1)
    if (!opposite) nextDirectionRef.current = next
  }, [])

  const startGame = useCallback(() => {
    const startSnake = [{ x: Math.floor(GRID_SIZE / 2), y: Math.floor(GRID_SIZE / 2) }]
    const startFood = randomFoodNotOnSnake(startSnake)
    setSnake(startSnake)
    setFood(startFood)
    setDirectionState(DIRECTIONS.RIGHT)
    nextDirectionRef.current = DIRECTIONS.RIGHT
    setScore(0)
    setIsGameOver(false)
    setIsWin(false)
    setIsRunning(true)
  }, [])

  const resetGame = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    const startSnake = [{ x: Math.floor(GRID_SIZE / 2), y: Math.floor(GRID_SIZE / 2) }]
    const startFood = randomFoodNotOnSnake(startSnake)
    setSnake(startSnake)
    setFood(startFood)
    setDirectionState(DIRECTIONS.RIGHT)
    nextDirectionRef.current = DIRECTIONS.RIGHT
    setScore(0)
    setIsRunning(false)
    setIsGameOver(false)
    setIsWin(false)
  }, [])

  useEffect(() => {
    if (!isRunning || isGameOver || isWin) return

    intervalRef.current = setInterval(() => {
      setSnake((prevSnake) => {
        const head = prevSnake[0]
        const dir = nextDirectionRef.current
        const newHead = {
          x: head.x + dir.x,
          y: head.y + dir.y,
        }

        const hitWall =
          newHead.x < 0 || newHead.x >= GRID_SIZE || newHead.y < 0 || newHead.y >= GRID_SIZE
        const hitSelf = prevSnake.some((s) => s.x === newHead.x && s.y === newHead.y)

        if (hitWall || hitSelf) {
          setIsRunning(false)
          setIsGameOver(true)
          return prevSnake
        }

        const ateFood = newHead.x === food.x && newHead.y === food.y
        const newSnake = ateFood ? [newHead, ...prevSnake] : [newHead, ...prevSnake.slice(0, -1)]

        if (ateFood) {
          const nextScore = scoreRef.current + 1
          setScore(nextScore)
          if (nextScore >= WIN_SCORE) {
            setIsRunning(false)
            setIsWin(true)
          }
          setFood(randomFoodNotOnSnake(newSnake))
        }

        return newSnake
      })
    }, SPEED_MS)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isRunning, isGameOver, isWin, food])

  return {
    snake,
    food,
    direction,
    score,
    isRunning,
    isGameOver,
    isWin,
    setDirection,
    startGame,
    resetGame,
    gridSize: GRID_SIZE,
    winScore: WIN_SCORE,
  }
}
