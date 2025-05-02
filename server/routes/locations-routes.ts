import express from 'express'
import * as db from '../db/functions/locations-db.ts'

const router = express.Router()

router.get('/encounter', async (req, res) => {
  try {
    // TO DO
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    } else {
      console.error('unknown error')
    }
    res.status(500).json({
      error: `Something went wrong.`,
    })
  }
})

router.get('/', async (req, res) => {
  try {
    const locations = await db.getLocationsNames()
    res.json(locations)
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    } else {
      console.error('unknown error')
    }
    res.status(500).json({
      error: `Something went wrong fetching locations.`,
    })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const locationImages = await db.getLocationImageById(Number(req.params.id))
    res.json(locationImages)
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    } else {
      console.error('unknown error')
    }
    res.status(500).json({
      error: `Something went wrong fetching locations.`,
    })
  }
})

router.get('/encounter/random', async (req, res) => {
  try {
    const randomEvent = await db.getRandomEvent()
    res.json(randomEvent)
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'Unknown error')
    res.status(500).json({
      error: 'Something went wrong fetching a random event.',
    })
  }
})

router.post('/', async (req, res) => {
  try {
    const travelOptions = await db.calculateTravelOptions(req.body)
    res.json(travelOptions)
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    } else {
      console.error('unknown error')
    }
    res.status(500).json({
      error: `Something went wrong fetching options.`,
    })
  }
})

export default router
