import { useNavigate, useOutletContext } from 'react-router-dom'
import { useUserAuth } from '../hooks/use-user-auth'

import AllTickets from '../components/AllTickets'
import { UserWithDetails } from '../../models/Users'
import { TicketWithDetails } from '../../models/Tickets'
import { useAuth0 } from '@auth0/auth0-react'

function Wallet() {
  const { loginWithRedirect } = useAuth0()
  const { data: user, error } = useUserAuth()
  const navigate = useNavigate()

  const currentUser = useOutletContext() as UserWithDetails

  function totalDistanceTraveled() {
    let total = 0

    currentUser?.tickets.forEach((ticket: TicketWithDetails) => {
      total += ticket.travelDistance
    })

    return total
  }

  const handleLogin = () => {
    loginWithRedirect({
      authorizationParams: {
        redirect_uri: window.location.origin + '/signup',
      },
    })
  }

  const handleRegister = () => {
    navigate('/signup')
  }

  if (error) {
    return <p>Error</p>
  }

  if (!user) {
    return (
      <div className="wallet-register-container">
        <button onClick={handleLogin} className="wallet-register">
          Click here to log in if you want to register and create a wizarding
          wallet!
        </button>
      </div>
    )
  }

  if (!user?.authId) {
    return (
      <div className="wallet-register-container">
        <button onClick={handleRegister} className="wallet-register">
          Click here to register if you want to create a wizarding wallet!
        </button>
      </div>
    )
  }

  return (
    <div className="wallet-container">
      <div className="user-info">
        <div className="avatar">
          <img src={user.avatarImage} alt="users avatar" />
        </div>
        <h1 className="user-name">{user.name}</h1>
        <h3 className="distance">
          Distance travelled: {totalDistanceTraveled()}km
        </h3>
      </div>

      <div className="tickets-container">
        <h1>YOUR TICKETS</h1>
        <AllTickets />
      </div>
    </div>
  )
}

export default Wallet
