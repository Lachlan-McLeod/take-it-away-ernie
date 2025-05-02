import { Outlet, useLocation } from 'react-router-dom'
import Nav from './Nav'
import { useUserAuth } from '../hooks/use-user-auth'

function App() {
  const { data: user } = useUserAuth()
  const location = useLocation()

  const hideNavRoutes = ['/quiz', '/game', '/encounter']
  const shouldHideNav = hideNavRoutes.includes(location.pathname)

  return (
    <div>
      <header>{!shouldHideNav && <Nav />}</header>
      <main>
        <Outlet context={user && user} />
      </main>
    </div>
  )
}

export default App
