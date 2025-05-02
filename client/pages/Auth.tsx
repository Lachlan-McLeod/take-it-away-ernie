import { useAuth0 } from '@auth0/auth0-react'
import {
  IfAuthenticated,
  IfNotAuthenticated,
} from '../components/Authenticated'
import SignUpForm from '../components/SignUpForm'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { UserWithDetails } from '../../models/Users'

function Auth() {
  const { loginWithRedirect } = useAuth0()
  const currentUser = useOutletContext() as UserWithDetails
  const navigate = useNavigate()

  const handleLogin = () => {
    loginWithRedirect()
  }

  if (currentUser?.authId) {
    navigate('/map')
  }

  return (
    <>
      <IfNotAuthenticated>
        <button onClick={handleLogin}>Click here to log in</button>
      </IfNotAuthenticated>
      <IfAuthenticated>
        <SignUpForm />
      </IfAuthenticated>
    </>
  )
}

export default Auth
