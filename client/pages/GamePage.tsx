import SnitchGame from '../components/SnitchGame'
import { useLocation, useNavigate } from 'react-router-dom'
import { useRef, useState } from 'react'

export default function GamePage() {
  const navigate = useNavigate()
  const location = useLocation()
  const journeyData = { ...location.state.data }
  const [audioStarted, setAudioStarted] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const handleStartAudio = () => {
    const audio = new Audio('/sounds/snitch-buzz.ogg')
    audio.loop = true
    audio.volume = 0.6

    audio
      .play()
      .then(() => {})
      .catch((err) => {
        console.warn('❌ Audio failed to play', err)
      })

    audioRef.current = audio
    setAudioStarted(true)
  }

  return (
    <>
      {!audioStarted && (
        <div
          role="button"
          tabIndex={0}
          onClick={handleStartAudio}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleStartAudio()
            }
          }}
          style={{
            position: 'absolute',
            zIndex: 9999,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0,0,0,0.7)',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            cursor: 'pointer',
          }}
        >
          Click to Start the Game
        </div>
      )}

      <SnitchGame
        onComplete={(result) => {
          if (audioRef.current) {
            audioRef.current.pause()
            audioRef.current.currentTime = 0
          }

          const destination = result === 'won' ? 'arrival' : 'departure'

          const newJourneyData = {
            ...journeyData,
            eventName:
              result === 'won'
                ? 'Game, and you beat it! Nice!'
                : 'Oops, you lost.',
            eventType: 'game',
            eventId: 5,
            destination,
          }

          navigate(`/${destination}`, {
            state: { data: newJourneyData },
            replace: true,
          })
        }}
      />
    </>
  )
}
