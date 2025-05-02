import { useLocation, useNavigate } from 'react-router-dom'
import QuizEncounter from '../components/QuizEncounter'
import useQuestions from '../hooks/use-question'
import { JourneyDataWithEvent } from '../../models/Journey'

type QuizData = {
  id: number
  question: string
  choices: string[]
  answers: number[]
}

const QUESTION_COUNT = 3

export default function QuizPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { data: questionList } = useQuestions()
  const journeyData: JourneyDataWithEvent = { ...location.state.data }
  const eventId = journeyData.eventId

  if (!questionList || !Array.isArray(questionList)) {
    return <p>Loading questions...</p>
  }

  const questionsWithIds: QuizData[] = questionList

  let selectedQuestions: QuizData[] = []

  if (eventId === 9) {
    const q = questionsWithIds.find((q) =>
      q.question.toLowerCase().includes('vernon dursley'),
    )
    if (q) {
      selectedQuestions = [q]
    }
  } else if (eventId === 10) {
    const q = questionsWithIds.find((q) =>
      q.question.toLowerCase().includes('muggle has spotted you'),
    )
    if (q) {
      selectedQuestions = [q]
    }
  } else {
    const shuffled = [...questionsWithIds].sort(() => 0.5 - Math.random())
    selectedQuestions = shuffled.slice(0, QUESTION_COUNT)
  }

  if (!selectedQuestions.length) {
    return <p>No valid questions found.</p>
  }

  const handleComplete = (success: boolean) => {
    const destination = success ? 'arrival' : 'departure'

    const newJourneyData = {
      ...journeyData,
      eventName: 'Quizmaster, and you beat them, Nice!',
      eventType: 'quiz',
      eventId: eventId || 4,
      destination,
    }

    navigate(`/${destination}`, {
      state: { data: newJourneyData },
      replace: true,
    })
  }

  return (
    <QuizEncounter questions={selectedQuestions} onComplete={handleComplete} />
  )
}
