import './Food.css'

export function Food({ food }) {
  if (!food) return null
  return (
    <div
      className="food-cell"
      style={{
        gridColumn: food.x + 1,
        gridRow: food.y + 1,
      }}
    >
      🐟
    </div>
  )
}
