import { useState } from 'react'
import { HomeScreen } from './components/HomeScreen'
import { GameScreen } from './components/GameScreen'
import './App.css'

export default function App() {
  const [screen, setScreen] = useState('home')
  const [deviceType, setDeviceType] = useState(null)

  const handleSelectDevice = (device) => {
    setDeviceType(device)
    setScreen('game')
  }

  return (
    <div className="app">
      {screen === 'home' && <HomeScreen onSelectDevice={handleSelectDevice} />}
      {screen === 'game' && deviceType && <GameScreen deviceType={deviceType} />}
    </div>
  )
}
