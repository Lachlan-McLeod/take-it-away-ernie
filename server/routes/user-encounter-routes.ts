import express from 'express'
import { addUserEncounter } from '../db/functions/user-encounters-db'

const router = express.Router()

router.post('/', async (req, res) => {
  const { encounterId, userId } = req.body

  if (!encounterId || !userId) {
    return res.status(400).json({ error: 'Missing encounterId or userId' })
  }

  try {
    await addUserEncounter(encounterId, userId)
    res.status(201).json({ message: 'Encounter recorded' })
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    } else {
      console.error('Unknown error')
    }

    res.status(500).json({ error: 'Failed to track encounter' })
  }
})

export default router