import {
  Link,
  useLocation,
  useNavigate,
  useOutletContext,
} from 'react-router-dom'
import { useLocationImages } from '../hooks/use-locations-data'
import { useUserAuth } from '../hooks/use-user-auth'
import { useAuth0 } from '@auth0/auth0-react'
import { useState } from 'react'
import { UserWithDetails } from '../../models/Users'
import { JourneyDataWithArrival } from '../../models/Journey'

function Location() {
  const location = useLocation()
  const { getAccessTokenSilently } = useAuth0()
  const [ticketCollected, setTicketCollected] = useState(false)
  const navigate = useNavigate()
  const currentUser = useOutletContext() as UserWithDetails
  const { addTicket } = useUserAuth()

  const journeyDataWithArrival: JourneyDataWithArrival = {
    ...location.state.data,
  }
  const handleNavigate = (path: string) => {
    navigate(path)
  }

  const locationId =
    journeyDataWithArrival.destination === 'arrival'
      ? journeyDataWithArrival.toId
      : journeyDataWithArrival.fromId

  const {
    data: locationImages,
    isPending: isImagePending,
    error,
  } = useLocationImages(locationId)

  if (error) return <div>There was an error: {error?.message}</div>

  if (isImagePending) return <div>Loading ...</div>

  const userId = currentUser?.id

  const handleCollectTicket = async () => {
    const audio = new Audio('/sounds/kaching-ticket.ogg')
    audio.play()
    const token = await getAccessTokenSilently()
    addTicket.mutate({
      newTicket: {
        userId: Number(userId),
        startLocationId: Number(journeyDataWithArrival.fromId),
        endLocationId: Number(journeyDataWithArrival.toId),
        travelTypeId: Number(journeyDataWithArrival.travelTypeId),
        eventId: Number(journeyDataWithArrival.eventId),
      },
      token: String(token),
    })
    setTicketCollected(true)
  }

  return (
    <>
      <div className="encounter-container">
        {journeyDataWithArrival.destination === 'arrival' ? (
          <>
            <h1 className="arrival-h">
              Arrived at {journeyDataWithArrival.toName}
            </h1>
            <img
              src={locationImages[0].image}
              alt={`${journeyDataWithArrival.toName}`}
              className="encounter-image"
            />

            <p className="arrival-p">
              You began your magical journey in{' '}
              {journeyDataWithArrival.fromName} and travelled by{' '}
              {journeyDataWithArrival.travelTypeName}, covering{' '}
              {journeyDataWithArrival.travelDistance}km. Along the way you came
              across the {journeyDataWithArrival.completeDescription}{' '}
              {journeyDataWithArrival.eventType === 'nothing' ? (
                <>
                  You&apos;ve safely arrived at {journeyDataWithArrival.toName}.
                  Magic was truly on your side.
                </>
              ) : (
                <>
                  Against all odds, you made it to{' '}
                  {journeyDataWithArrival.toName}. Magic was truly on your side.
                </>
              )}
            </p>

            <p className="arrival-p">
              <strong>We present you with this collectable ticket!</strong>
            </p>

            <img
              src={locationImages[0].ticketImage}
              alt={`ticket for ${journeyDataWithArrival.toName}`}
              className="encounter-image"
            />

            {currentUser?.authId && !ticketCollected ? (
              <button onClick={handleCollectTicket}>Collect your ticket</button>
            ) : null}

            {!currentUser ? (
              <div className="arrival-unregistered-message">
                If you want to keep a collection of your tickets, make sure you
                log in before your next journey.
              </div>
            ) : (
              !currentUser?.authId && (
                <div className="arrival-unregistered-message">
                  <Link to="/signup" style={{ textDecoration: 'none' }}>
                    If you want to keep a collection of your tickets, make sure
                    you register before your next journey.
                  </Link>
                </div>
              )
            )}
          </>
        ) : (
          <>
            <h1>You didn&apos;t make it to {journeyDataWithArrival.toName}</h1>
            <img
              src={locationImages[0].image}
              alt={`${journeyDataWithArrival.fromName}`}
              className="encounter-image"
            />
            <p>You&apos;re still at {journeyDataWithArrival.fromName}.</p>
          </>
        )}

        <button onClick={() => handleNavigate('/map')}>
          Take another journey
        </button>
      </div>
    </>
  )
}

export default Location
