export interface QuestionData {
  question: string
  answer1: string
  answer2: string
  answer3: string
  answer4: string
  answer1Correct: boolean
  answer2Correct: boolean
  answer3Correct: boolean
  answer4Correct: boolean
}

export interface Question extends QuestionData {
  id: number
}

export interface QuizData {
  id: number
  question: string
  choices: string[]
  answers: number[]
}

export interface Quizzes {
  questions: QuizData[]
}
