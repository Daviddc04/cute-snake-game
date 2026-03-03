import { useState, useEffect, useCallback } from 'react'
import { worldMap, NPCs, WORLD_SIZE } from '../data/worldData'
import { DialogueModal } from './DialogueModal'
import './OpenWorldScreen.css'

const PLAYER_EMOJI = '👧'

function isAdjacent(ax, ay, bx, by) {
  return Math.abs(ax - bx) <= 1 && Math.abs(ay - by) <= 1
}

export function OpenWorldScreen({ onGoHome }) {
  const [player, setPlayer] = useState({ x: 15, y: 15 })
  const [nearbyNpc, setNearbyNpc] = useState(null)
  const [dialogueNpc, setDialogueNpc] = useState(null)
  const [dialogueStep, setDialogueStep] = useState(0)
  const [dialoguePhase, setDialoguePhase] = useState('prompt')
  const [responseText, setResponseText] = useState(null)

  useEffect(() => {
    const npc = NPCs.find((n) => {
      const [r, c] = n.position
      return isAdjacent(player.x, player.y, r, c)
    })
    setNearbyNpc(npc ?? null)
  }, [player])

  const move = useCallback((dx, dy) => {
    setPlayer((p) => {
      const nx = Math.max(0, Math.min(WORLD_SIZE - 1, p.x + dx))
      const ny = Math.max(0, Math.min(WORLD_SIZE - 1, p.y + dy))
      return { x: nx, y: ny }
    })
  }, [])

  useEffect(() => {
    const onKeyDown = (e) => {
      if (dialogueNpc) return
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          e.preventDefault()
          move(-1, 0)
          break
        case 'ArrowDown':
        case 's':
        case 'S':
          e.preventDefault()
          move(1, 0)
          break
        case 'ArrowLeft':
        case 'a':
        case 'A':
          e.preventDefault()
          move(0, -1)
          break
        case 'ArrowRight':
        case 'd':
        case 'D':
          e.preventDefault()
          move(0, 1)
          break
        case 'e':
        case 'E':
          e.preventDefault()
          if (nearbyNpc && !dialogueNpc) setDialogueNpc(nearbyNpc)
          break
        default:
          break
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [move, nearbyNpc, dialogueNpc])

  const handleSelectOption = useCallback((resp) => {
    setResponseText(resp)
    setDialoguePhase('response')
  }, [])

  const handleCloseResponse = useCallback(() => {
    setResponseText(null)
    setDialoguePhase('prompt')
    setDialogueStep((s) => s + 1)
  }, [])

  const handleCloseDialogue = useCallback(() => {
    setDialogueNpc(null)
    setDialogueStep(0)
    setDialoguePhase('prompt')
    setResponseText(null)
  }, [])

  return (
    <div className="open-world-screen">
      <button type="button" className="world-home-btn" onClick={onGoHome}>
        Home
      </button>
      <p className="world-instructions">
        Use Arrow keys or WASD to move. Get close to a character and press <kbd>E</kbd> to talk.
      </p>
      <div className="world-grid-wrap">
        <div
          className="world-grid"
          style={{
            '--world-size': WORLD_SIZE,
          }}
        >
          {worldMap.map((row, r) =>
            row.map((tile, c) => (
              <div key={`${r}-${c}`} className="world-cell">
                {tile}
              </div>
            ))
          )}
          {NPCs.map((npc) => {
            const [r, c] = npc.position
            return (
              <div
                key={npc.id}
                className="world-entity world-npc"
                style={{
                  left: `${(c / WORLD_SIZE) * 100}%`,
                  top: `${(r / WORLD_SIZE) * 100}%`,
                  width: `${100 / WORLD_SIZE}%`,
                  height: `${100 / WORLD_SIZE}%`,
                }}
              >
                {npc.emoji}
              </div>
            )
          })}
          <div
            className="world-entity world-player"
            style={{
              left: `${(player.y / WORLD_SIZE) * 100}%`,
              top: `${(player.x / WORLD_SIZE) * 100}%`,
              width: `${100 / WORLD_SIZE}%`,
              height: `${100 / WORLD_SIZE}%`,
            }}
          >
            {PLAYER_EMOJI}
          </div>
        </div>
      </div>
      {nearbyNpc && !dialogueNpc && (
        <div className="world-press-e">
          Press <kbd>E</kbd> to talk to {nearbyNpc.name}
        </div>
      )}
      {dialogueNpc && (
        <DialogueModal
          characterName={dialogueNpc.name}
          characterEmoji={dialogueNpc.emoji}
          dialogue={dialogueNpc.dialogue}
          step={dialogueStep}
          phase={dialoguePhase}
          responseText={responseText}
          onSelectOption={handleSelectOption}
          onCloseResponse={handleCloseResponse}
          onClose={handleCloseDialogue}
        />
      )}
    </div>
  )
}
