import { useState } from 'react'
import { useEncounter } from '../../client/hooks/use-encounter.ts'
import Footsteps from './Footsteps'
import { JourneyDataWithArrival } from '../../models/Journey.ts'

function Encounter() {
  const [showFootsteps, setShowFootsteps] = useState(false)
  const [isCountingDown, setIsCountingDown] = useState(false)

  const {
    event,
    stayOnPage,
    isRedirecting,
    isWaiting,
    waitTimer,
    location,
    navigate,
  } = useEncounter()

  const currentJourneyData = { ...location.state.data }

  function buildJourneyDetails(): JourneyDataWithArrival | null {
    if (!event || !location.state?.data) return null

    const newJourneyDataWithEvent = {
      ...currentJourneyData,
      eventName: event.name,
      eventType: event.eventType,
      eventId: event.id,
      completeDescription: event.completeDescription, 
      destination: 'arrival',
    }

    return newJourneyDataWithEvent
  }

  function handleClick() {
    const journeyDetails = buildJourneyDetails()
    if (!journeyDetails) return

    setShowFootsteps(true)

    setTimeout(() => {
      navigate('/arrival', {
        state: { data: journeyDetails },
        replace: true,
      })
    }, 1200)
  }

  function handleCountdownStart() {
    const audio = new Audio('/sounds/countdown-yah.ogg')
    audio.play()
    setIsCountingDown(true)

    const journeyDetails = buildJourneyDetails()
    if (!journeyDetails) return

    setTimeout(() => {
      setShowFootsteps(true)
      navigate('/arrival', {
        state: { data: journeyDetails },
        replace: true,
      })
    }, 12500)
  }

  if (!stayOnPage || !event) {
    return (
      <p style={{ color: 'white', textAlign: 'center' }}>
        Loading encounter...
      </p>
    )
  }

  return (
    <>
      <div className="encounter-header">
        ✨ You have encountered something on your journey!
      </div>
      <div className="encounter-container">
        <h2 className="encounter-title">{event.name}</h2>
        <p className="encounter-description">{event.description}</p>
        {event.image && (
          <img src={event.image} alt={event.name} className="encounter-image" />
        )}

        {!isRedirecting && (
          <>
            {event.id === 3 && (
              <button
                onClick={handleCountdownStart}
                disabled={isCountingDown}
                className={`encounter-button ${isCountingDown ? 'disabled' : ''}`}
              >
                {isCountingDown ? 'Counting down...' : 'Click to Countdown'}
              </button>
            )}

            {event.id === 8 && (
              <button
                onClick={handleClick}
                disabled={isWaiting}
                className={`encounter-button ${isWaiting ? 'disabled' : ''}`}
              >
                {isWaiting
                  ? `Drunkard wait... ${waitTimer}s`
                  : 'Continue Journey'}
              </button>
            )}

            {![3, 4, 5, 8, 9, 10].includes(event.id) && (
              <button onClick={handleClick}>Continue Journey</button>
            )}
          </>
        )}
      </div>
      {showFootsteps && <Footsteps footsteps={true} />}
    </>
  )
}

export default Encounter
