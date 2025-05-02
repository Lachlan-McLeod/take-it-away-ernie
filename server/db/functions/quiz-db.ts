import { QuizData, Quizzes } from '../../../models/Questions'
import db from '../connection'

async function getQuestionAsQuizData(id: number): Promise<QuizData> {
  const question = await db('questions')
    .where('questions.id', id)
    .select()
    .first()

  const choices = []
  choices.push(question.answer_1)
  choices.push(question.answer_2)
  choices.push(question.answer_3)
  choices.push(question.answer_4)

  const answers = []
  if (question.answer_1_correct == 1) {
    answers.push(0)
  }
  if (question.answer_2_correct == 1) {
    answers.push(1)
  }
  if (question.answer_3_correct == 1) {
    answers.push(2)
  }
  if (question.answer_4_correct == 1) {
    answers.push(3)
  }

  const quizData = { question: question.question, choices, answers }

  return quizData
}

export async function getQuestions(): Promise<Quizzes> {
  const questions = await db('questions').select()

  const quizDatas = []

  for (const i in questions) {
    quizDatas.push(await getQuestionAsQuizData(questions[i].id))
  }

  const result = { questions: quizDatas }

  return result as Quizzes
}

export async function getQuestionsByEventId(eventId: number): Promise<Quizzes> {
  const questions = await db('questions')
    .join(
      'events_questions',
      'questions.id',
      '=',
      'events_questions.question_id',
    )
    .where('events_questions.event_id', eventId)
    .select()

  const quizDatas = []

  for (const i in questions) {
    quizDatas.push(await getQuestionAsQuizData(questions[i].id))
  }

  const result = { questions: quizDatas }

  return result as Quizzes
}
