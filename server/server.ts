import * as Path from 'node:path'
import express from 'express'

import locationsRoutes from './routes/locations-routes'
import usersRoutes from './routes/users-routes'
import quizRoutes from './routes/quiz-routes'
import avatarsRoutes from './routes/avatars-routes'

const server = express()
server.use(express.json())

server.use('/api/v1/locations', locationsRoutes)
server.use('/api/v1/users', usersRoutes)
server.use('/api/v1/quizzes', quizRoutes)
server.use('/api/v1/avatars', avatarsRoutes)

if (process.env.NODE_ENV === 'production') {
  server.use(express.static(Path.resolve('public')))
  server.use('/assets', express.static(Path.resolve('./dist/assets')))
  server.get('*', (req, res) => {
    res.sendFile(Path.resolve('./dist/index.html'))
  })
}

export default server
