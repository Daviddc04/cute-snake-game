import './DialogueModal.css'

// dialogue: { prompt, options: [ { label, response } ] } x3
// step: 0, 1, 2 for which prompt. phase: 'prompt' | 'response'. responseText when phase is response.
export function DialogueModal({ characterName, characterEmoji, dialogue, step, phase, responseText, onSelectOption, onCloseResponse, onClose }) {
  if (step >= dialogue.length && phase === 'prompt') {
    if (onClose) onClose()
    return null
  }

  const current = dialogue[step]

  if (phase === 'response' && responseText != null) {
    return (
      <div className="dialogue-overlay">
        <div className="dialogue-modal dialogue-modal--response">
          <p className="dialogue-response-text">{responseText}</p>
          <button type="button" className="btn btn-primary dialogue-continue-btn" onClick={onCloseResponse}>
            Continue
          </button>
        </div>
      </div>
    )
  }

  if (!current) return null

  return (
    <div className="dialogue-overlay">
      <div className="dialogue-modal">
        <p className="dialogue-character">
          <span className="dialogue-emoji">{characterEmoji}</span> {characterName}
        </p>
        <p className="dialogue-prompt">{current.prompt}</p>
        <div className="dialogue-options">
          {current.options.map((opt, i) => (
            <button
              key={i}
              type="button"
              className="btn btn-secondary dialogue-option-btn"
              onClick={() => onSelectOption(opt.response)}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
