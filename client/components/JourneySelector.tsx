import { useNavigate } from 'react-router-dom'
import MapFootsteps from './MapFootsteps'
import { useState } from 'react'
import { JourneyData } from '../../models/Journey'
import sound1 from '/sounds/take-her-away-ern.ogg'
import sound2 from '/sounds/take-it-away-ernie.ogg'
import { TravelSelections } from '../../models/Locations'

interface Props {
  options: JourneyData[]
  travelSelections: TravelSelections | undefined
}

function JourneySelector(props: Props) {
  const [footsteps, setFootsteps] = useState(false)
  const navigate = useNavigate()

  function handleClick(option: JourneyData) {
    const audio1 = new Audio(sound1)
    const audio2 = new Audio(sound2)
    audio1.play()
    audio1.onended = () => {
      audio2.play()
    }
    setFootsteps(true)

    return (
      <>
        {setTimeout(
          () => {
            navigate('/encounter', {
              state: {
                data: option,
              },
            })
          },
          (option.travelTimeNumeric / 20) * 1000 + 3200,
        )}
      </>
    )
  }

  if (!props.travelSelections) {
    return <>Error no travel options selected</>
  }

  return (
    <>
      {footsteps && (
        <MapFootsteps
          footsteps={true}
          from={props.travelSelections.selectFrom}
          to={props.travelSelections.selectTo}
        />
      )}
      <div className="travel-results journey-selector">
        <p>
          The distance between these two locations is{' '}
          {props.options[0].travelDistance} km.
        </p>{' '}
        <p>You can travel using these options:</p>
        {props.options.map((option: JourneyData) => (
          <button
            key={option.travelTypeName}
            className="travel-choice"
            onClick={() => handleClick(option)}
          >
            {option.travelTypeName}, which will take {option.travelTime}
          </button>
        ))}
      </div>
    </>
  )
}

export default JourneySelector
