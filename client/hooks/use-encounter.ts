import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Event } from '../../models/Events'
import { JourneyDataWithEvent } from '../../models/Journey'

export function useEncounter() {
  const location = useLocation()
  const navigate = useNavigate()
  const [event, setEvent] = useState<Event | null>(null)
  const [stayOnPage, setStayOnPage] = useState(false)
  const [isRedirecting, setIsRedirecting] = useState(false)
  const [isWaiting, setIsWaiting] = useState(false)
  const [waitTimer, setWaitTimer] = useState(20)

  useEffect(() => {
    fetch('/api/v1/locations/encounter/random')
      .then((res) => res.json())
      .then((data: Event) => {
        setEvent(data)

        // Testing loop. 4 is quiz, 5 is game, 9 is vernon, 10 is muggle

        // quiz
        // if (![4].includes(data.id)) {
        //   return window.location.reload()
        // }

        const newJourneyDataWithEvent: JourneyDataWithEvent = {
          ...location.state.data,
          eventName: data.name,
          eventType: data.eventType,
          eventId: data.id,
          completeDescription: data.completeDescription,
        }

        if (data.id === 4) {
          setStayOnPage(true)
          setIsRedirecting(true)
          setTimeout(() => {
            navigate('/quiz', {
              state: {
                data: newJourneyDataWithEvent,
              },
            })
          }, 3000)
        } else if (data.id === 9 || data.id === 10) {
          setStayOnPage(true)
          setIsWaiting(true)
          setTimeout(() => {
            navigate('/quiz', {
              state: {
                data: newJourneyDataWithEvent,
              },
            })
          }, 3000)
        } else if (data.id === 5) {
          setStayOnPage(true)
          setIsRedirecting(true)
          setTimeout(() => {
            navigate('/game', {
              state: {
                data: newJourneyDataWithEvent,
              },
            })
          }, 3000)
        } else if (data.id === 8) {
          setStayOnPage(true)
          setIsWaiting(true)
          let timer = 20
          const countdown = setInterval(() => {
            timer--
            setWaitTimer(timer)
            if (timer <= 0) {
              clearInterval(countdown)
              setIsWaiting(false)
            }
          }, 1000)
        } else {
          setStayOnPage(true)
        }
      })
      .catch((err) => console.error(err))
  }, [navigate, location.state])

  return {
    event,
    stayOnPage,
    isRedirecting,
    isWaiting,
    waitTimer,
    location,
    navigate,
  }
}
