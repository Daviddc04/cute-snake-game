import './MilestoneToast.css'

export function MilestoneToast({ message, visible }) {
  if (!message || !visible) return null
  return <div className="milestone-toast">{message}</div>
}
