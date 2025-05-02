import { Link, useNavigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'
import { useUserAuth } from '../hooks/use-user-auth'

export default function Nav() {
  const navigate = useNavigate()
  const { loginWithRedirect, logout } = useAuth0()
  const { data: currentUser } = useUserAuth()

  const handleNavigate = (path: string) => {
    navigate(path)
  }

  const handleLogout = () => {
    logout()
  }

  const handleLogin = async () => {
    await loginWithRedirect({
      authorizationParams: {
        redirect_uri: window.location.origin + '/signup',
      },
    })
  }

  return (
    <nav>
      <div>
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700&display=swap"
          rel="stylesheet"
        ></link>
        <div className="nav-left">
          <div className="navigate">
            <button
              onClick={() => {
                handleNavigate('/wallet')
              }}
            >
              Wizarding Wallet
            </button>
            <button
              onClick={() => {
                handleNavigate('/map')
              }}
            >
              Map
            </button>
          </div>
        </div>
      </div>
      <div className="nav-center">
        <Link to="/" className="home-link">
          <h1>Take It Away Ernie</h1>
        </Link>
      </div>
      <div className="nav-right">
        {currentUser && currentUser.authId && (
          <p
            className="welcome-text"
            style={{ marginRight: '30px' }}
          >{`Welcome, ${currentUser.name}!`}</p>
        )}
        <div className="login">
          <IfNotAuthenticated>
            <button onClick={handleLogin}>Login</button>
          </IfNotAuthenticated>
          <IfAuthenticated>
            <button onClick={handleLogout}>Mischief Managed</button>
          </IfAuthenticated>
        </div>
      </div>
    </nav>
  )
}
