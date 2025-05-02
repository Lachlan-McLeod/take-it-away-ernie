import express from 'express'
import * as db from '../db/functions/quiz-db.ts'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const quizzes = await db.getQuestions()
    res.json(quizzes)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch quizzes' })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    const quizzes = await db.getQuestionsByEventId(id)
    res.json(quizzes)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch quizzes' })
  }
})

export default router
