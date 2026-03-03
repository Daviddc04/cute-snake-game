import './CatStore.css'

const CATS = [
  { id: 'cat', src: '/assets/cat.JPG', unlockAt: 0, label: 'Cat 1' },
  { id: 'cat2', src: '/assets/cat2.JPG', unlockAt: 7, label: 'Cat 2' },
  { id: 'cat3', src: '/assets/cat3.JPG', unlockAt: 25, label: 'Cat 3' },
]

export function CatStore({ maxScoreReached, selectedCat, onSelectCat }) {
  return (
    <div className="cat-store">
      <p className="cat-store-title">Your cats</p>
      <div className="cat-store-grid">
        {CATS.map((cat) => {
          const unlocked = maxScoreReached >= cat.unlockAt
          const selected = selectedCat === cat.id
          return (
            <button
              key={cat.id}
              type="button"
              className={`cat-store-item ${!unlocked ? 'cat-store-item--locked' : ''} ${selected ? 'cat-store-item--selected' : ''}`}
              onClick={() => unlocked && onSelectCat(cat.id)}
              disabled={!unlocked}
              title={unlocked ? `Play as ${cat.label}` : `Reach ${cat.unlockAt} to unlock`}
            >
              <span className="cat-store-img-wrap">
                <img src={cat.src} alt={cat.label} onError={(e) => { e.target.style.display = 'none' }} />
                {!unlocked && <span className="cat-store-lock">🔒</span>}
              </span>
              {unlocked ? (
                <span className="cat-store-label">{cat.label}</span>
              ) : (
                <span className="cat-store-requirement">Score {cat.unlockAt}+</span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
