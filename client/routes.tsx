import { Route, createRoutesFromElements } from 'react-router-dom'

import App from './components/App'
import Home from './pages/Home'
import Location from './components/Location'
import Encounter from './components/Encounter'
import QuizPage from './pages/QuizPage'
import Wallet from './pages/Wallet'
import NotFound from './pages/NotFound'
import Map from './pages/Map'
import GamePage from './pages/GamePage'
import Auth from './pages/Auth'

export const routes = createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route index element={<Home />} />
    <Route path="/map" element={<Map />} />
    <Route path="/arrival" element={<Location />} />
    <Route path="/encounter" element={<Encounter />} />
    <Route path="/departure" element={<Location />} />
    <Route path="/wallet" element={<Wallet />} />
    <Route path="/signup" element={<Auth />} />
    <Route path="/quiz" element={<QuizPage />} />
    <Route path="/game" element={<GamePage />} />
    <Route path="*" element={<NotFound />} />
  </Route>,
)
