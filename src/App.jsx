import { useState } from 'react'
import { HomeScreen } from './components/HomeScreen'
import { GameScreen } from './components/GameScreen'
import { OpenWorldScreen } from './components/OpenWorldScreen'
import './App.css'

export default function App() {
  const [screen, setScreen] = useState('home')
  const [deviceType, setDeviceType] = useState(null)

  const handleSelectDevice = (device) => {
    setDeviceType(device)
    setScreen('game')
  }

  const handleExploreWorld = () => {
    setScreen('world')
  }

  const handleGoHome = () => {
    setScreen('home')
    setDeviceType(null)
  }

  return (
    <div className="app">
      {screen === 'home' && (
        <HomeScreen
          onSelectDevice={handleSelectDevice}
          onExploreWorld={handleExploreWorld}
        />
      )}
      {screen === 'game' && deviceType && (
        <GameScreen deviceType={deviceType} onGoHome={handleGoHome} />
      )}
      {screen === 'world' && <OpenWorldScreen onGoHome={handleGoHome} />}
    </div>
  )
}
