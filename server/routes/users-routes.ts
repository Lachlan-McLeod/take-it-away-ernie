import express from 'express'
import * as db from '../db/functions/users-db.ts'
import { addTicket } from '../db/functions/tickets-db.ts'
import multer from 'multer'
import checkJwt, { JwtRequest } from '../auth0.ts'

const router = express.Router()

router.get('/', checkJwt, async (req: JwtRequest, res) => {
  try {
    const authId = req.auth?.sub

    if (!authId) {
      throw new Error('No authId')
    }

    const user = await db.getUserByAuthId(authId)

    res.json(user)
  } catch (error) {
    console.error(error)
    res.status(500).send('Could not find user')
  }
})

router.post('/', checkJwt, async (req: JwtRequest, res) => {
  try {
    const results = await db.addUser(req.body)

    return results
  } catch (error) {
    console.error(error)
    res.status(500).send('Could not add user')
  }
})

router.post('/tickets', checkJwt, async (req: JwtRequest, res) => {
  try {
    const results = await addTicket(req.body)

    return results
  } catch (error) {
    console.error(error)
    res.status(500).send('Could not add ticket')
  }
})

export default router
