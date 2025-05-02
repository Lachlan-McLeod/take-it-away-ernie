import { useState } from 'react'
import { useLocations } from '../hooks/use-locations-data'
import { useTravelOptions } from '../hooks/use-travel-options'
import Dialog from '@mui/material/Dialog'
import { DialogContent } from '@mui/material'
import sound from '/sounds/where-abouts-are-you-headed.ogg'
import JourneySelector from './JourneySelector'
import { LocationNames } from '../../models/Locations'

const initialLocations: LocationNames[] = [
  { name: 'Option 1' },
  { name: 'Option 2' },
]

function JourneyPlanner() {
  const [selections, setSelection] = useState({
    selectFrom: 'From',
    selectTo: 'To',
  })

  const { data: locationList, error, isPending } = useLocations()

  const [formVisible, setFormVisible] = useState(false)
  const [alertVisible, setAlertVisible] = useState(false)
  const [availableFromLocations, setAvailableFromLocations] =
    useState(initialLocations)
  const [availableToLocations, setAvailableToLocations] =
    useState(initialLocations)

  const audio = new Audio(sound)

  const getTravelOptions = useTravelOptions(selections)

  if (error || getTravelOptions.error)
    return <div>There was an error: {error?.message}</div>

  if (isPending || getTravelOptions.isPending) return <div>Loading ...</div>

  function handleState() {
    setFormVisible(!formVisible)
    setAvailableFromLocations(locationList)
    setAvailableToLocations(locationList)
  }

  function handleSelection(e: React.ChangeEvent<HTMLSelectElement>) {
    if (e.target.name === 'from') {
      setSelection((prev) => ({ ...prev, selectFrom: e.target.value }))
      setAvailableToLocations(
        locationList.filter(
          (location: LocationNames) => location.name !== e.target.value,
        ),
      )
      setAvailableFromLocations(locationList)
    }

    if (e.target.name === 'to') {
      setSelection((prev) => ({ ...prev, selectTo: e.target.value }))
      setAvailableFromLocations(
        locationList.filter(
          (location: LocationNames) => location.name !== e.target.value,
        ),
      )
      setAvailableToLocations(locationList)
    }
  }

  function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault()
    if (
      selections.selectFrom !== 'default' &&
      selections.selectTo !== 'default' &&
      selections.selectFrom !== 'From' &&
      selections.selectTo !== 'To'
    )
      getTravelOptions.mutate({ ...selections })
    else {
      setAlertVisible(true)
      audio.play()
    }
  }

  function handleAlertClose() {
    setAlertVisible(false)
  }

  return (
    <>
      {alertVisible && (
        <Dialog
          open={true}
          onClose={handleAlertClose}
          keepMounted
          aria-describedby="alert-dialog"
        >
          <DialogContent className="error">
            Please complete the travel planner selections
          </DialogContent>
        </Dialog>
      )}
      <div className="journey-planner">
        <button type="button" onClick={handleState}>
          {!formVisible ? 'Plan your journey' : 'Stop travelling'}
        </button>
        {formVisible && (
          <form onSubmit={handleSubmit}>
            <select
              id="from"
              name="from"
              onChange={(e) => handleSelection(e)}
              className="drop-down"
            >
              <option value="default" key="default">
                From
              </option>
              {availableFromLocations.map((location) => (
                <option key={location.name} value={location.name}>
                  {location.name}
                </option>
              ))}
            </select>

            <select
              id="to"
              name="to"
              onChange={(e) => handleSelection(e)}
              className="drop-down"
            >
              <option value="default" key="default">
                To
              </option>
              {availableToLocations.map((location) => (
                <option key={location.name} value={location.name}>
                  {location.name}
                </option>
              ))}
            </select>

            <button type="submit">Take it away Ern!</button>
          </form>
        )}
      </div>
      {getTravelOptions.data && (
        <JourneySelector
          {...{
            options: getTravelOptions.data,
            travelSelections: getTravelOptions.variables,
          }}
        />
      )}
    </>
  )
}

export default JourneyPlanner
