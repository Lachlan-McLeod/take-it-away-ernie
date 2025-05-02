import { useState } from 'react'
import { QuizData } from '../../models/Questions'

type Props = {
  questions: QuizData[]
  onComplete: (success: boolean) => void
}

export default function QuizEncounter({ questions, onComplete }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [showDoor, setShowDoor] = useState(false)
  const [showFailGif, setShowFailGif] = useState(false)

  const current = questions[currentIndex]

  const handleSubmit = () => {
    if (selected === null) return
    setSubmitted(true)

    const isCorrect = current.answers.includes(selected)

    if (!isCorrect) {
      const audio = new Audio('/sounds/oof.ogg')
      audio.play()
      setShowFailGif(true)
      setTimeout(() => {
        onComplete(false)
      }, 4000)
      return
    }

    if (currentIndex < questions.length - 1) {
      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1)
        setSelected(null)
        setSubmitted(false)
      }, 1000)
    } else {
      const audio = new Audio('/sounds/door.ogg')
      audio.play()
      setShowDoor(true)
      setTimeout(() => {
        onComplete(true)
      }, 6550)
    }
  }

  return (
    <div className="home-container-header">
      <div className="encounter-header">✨ Quiz Encounter</div>

      <div className="quiz-wrapper">
        <h2 className="quiz-question">{current.question}</h2>

        <div className="quiz-choices">
          {current.choices.map((choice, index) => {
            const isSelected = selected === index
            const isDisabled = submitted

            return (
              <button
                key={index}
                onClick={() => !submitted && setSelected(index)}
                disabled={isDisabled}
                className={`quiz-choice ${isSelected ? 'selected' : ''} ${
                  isDisabled ? 'disabled' : ''
                }`}
              >
                📜 {choice}
              </button>
            )
          })}
        </div>

        <button
          className="quiz-submit-button"
          onClick={handleSubmit}
          disabled={selected === null || submitted}
        >
          ✨ Cast Your Answer ✨
        </button>

        {submitted && selected !== null && !showDoor && !showFailGif && (
          <p className="quiz-feedback">
            {current.answers.includes(selected) ? '✅ Correct!' : '❌ Wrong answer!'}
          </p>
        )}

        {showDoor && (
          <div className="door-overlay">
            <img
              src="../images/encounters/door.gif"
              alt="Spooky door opens..."
              className="door-image"
            />
          </div>
        )}

        {showFailGif && (
          <div className="door-overlay">
            <img
              src="../images/encounters/quizfail.gif"
              alt="Oops, you failed!"
              className="fail-image"
            />
          </div>
        )}
      </div>
    </div>
  )
}