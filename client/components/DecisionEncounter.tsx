export default function DecisionEncounter({
  data,
  onComplete
}: {
  data: {
    prompt: string
    choices: string[]
    correctIndex: number
  }
  onComplete: (success: boolean) => void
}) {
  const handleChoice = (index: number) => {
    const success = index === data.correctIndex
    alert(success ? "✅ You made the right call!" : "❌ That didn't work out...")
    onComplete(success)
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h2>{data.prompt}</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {data.choices.map((text, idx) => (
          <li key={idx} style={{ marginBottom: "1rem" }}>
            <button onClick={() => handleChoice(idx)}>{text}</button>
          </li>
        ))}
      </ul>
    </div>
  )
}