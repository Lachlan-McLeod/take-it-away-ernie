import express from 'express'
import * as db from '../db/functions/avatars-db.ts'
import checkJwt, { JwtRequest } from '../auth0.ts'
import multer from 'multer'

const router = express.Router()

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/images/avatars')
  },
  filename: (req, file, cb) => {
    const generatedFilename = `${Date.now()}-${file.originalname}`
    cb(null, generatedFilename)
  },
})

const upload = multer({ storage: storage })

router.get('/', async (req, res) => {
  try {
    const avatars = await db.getAllAvatars()

    res.json(avatars)
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

router.post('/', checkJwt, upload.single('image'), async (req, res) => {
  try {
    if (req.file) {
      const newAvatar = {
        image: '/images/avatars/' + req.file?.filename,
      }

      const newAvatarId = await db.addAvatar(newAvatar)
      res.json(newAvatarId)
    } else {
      const results = await db.addAvatar(req.body)

      res.json(results)
    }
  } catch (error) {
    console.error(error)
    res.status(500).send('Could not add avatar')
  }
})

// router.post('/', checkJwt, async (req: JwtRequest, res) => {
//   try {
//     const results = await db.addAvatar(req.body)

//     res.json(results)
//   } catch (error) {
//     if (error instanceof Error) {
//       console.error(error.message)
//     } else {
//       console.error('unknown error')
//     }
//     res.status(500).json({
//       error: `Something went wrong.`,
//     })
//   }
// })

export default router
