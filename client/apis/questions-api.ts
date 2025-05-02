import request from 'superagent'

export const getAllQuestions = async () => {
  const response = await request.get('/api/v1/quizzes')
  return response.body.questions
}

export const getQuestionsByEventId = async (eventId: number) => {
  const questions = await request.get(`/api/v1/quizzes/${eventId}`)

  return questions.body
}
