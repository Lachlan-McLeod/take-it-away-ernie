import { useState, useEffect } from "react"

const INITIAL_SPEED = 450
const MIN_SPEED = 10
const INITIAL_TIME = 10
const SNITCH_SIZE = 60

export default function SnitchGame({
  onComplete
}: {
  onComplete: (result: "won" | "lost") => void
}) {
  const [position, setPosition] = useState({ top: 50, left: 50 })
  const [speed, setSpeed] = useState(INITIAL_SPEED)
  const [misses, setMisses] = useState(0)
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME)
  const [result, setResult] = useState<"won" | "lost" | null>(null)

  const isPlaying = result === null

  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      setPosition({
        top: Math.random() * 90,
        left: Math.random() * 90
      })
    }, speed)

    return () => clearInterval(interval)
  }, [speed, isPlaying])

  useEffect(() => {
    if (!isPlaying) return

    if (timeLeft <= 0) {
      setResult("lost")
      setTimeout(() => onComplete("lost"), 1000)
      return
    }

    const timer = setTimeout(() => {
      setTimeLeft(prev => prev - 1)
    }, 1000)

    return () => clearTimeout(timer)
  }, [timeLeft, isPlaying, onComplete])

  const handleMiss = () => {
    if (!isPlaying) return
    setMisses(prev => prev + 1)
    setSpeed(prev => Math.max(MIN_SPEED, prev - 40))
  }

  const handleCatch = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!isPlaying) return
    setResult("won")
    setTimeout(() => {
      onComplete("won")
    }, 1000)
  }

  return (
    <div className="home-container-header">
      <div className="encounter-header">Catch the Snitch!</div>
      
      <div className="snitch-game-wrapper">
        <div
          role="button"
          tabIndex={0}
          onClick={handleMiss}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault()
              handleMiss()
            }
          }}
          aria-label="Try to catch the snitch!"
          className="snitch-game-container"
        >
          {isPlaying && (
            <>
              <button
                onClick={handleCatch}
                className="snitch-button"
                style={{
                  top: `${position.top}%`,
                  left: `${position.left}%`,
                  width: `${SNITCH_SIZE}px`,
                  height: `${SNITCH_SIZE}px`,
                }}
                aria-label="Catch the Snitch"
              />
              <div className="snitch-text snitch-timer">
                ⏱️ Time Left: {timeLeft.toFixed(0)}s
              </div>
              <div className="snitch-text snitch-misses">
                ❌ Misses: {misses}
              </div>
            </>
          )}

          {result === "won" && (
            <div className="snitch-win-message">
              <h2>🎉 You caught the snitch!</h2>
              <p>Misses: {misses}</p>
            </div>
          )}

          {result === "lost" && (
            <div className="snitch-lose-message">
              <h2>❌ Time is up!</h2>
              <p>The snitch got away...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}