import { LocationNames, TravelSelections } from '../../../models/Locations.ts'
import { JourneyData } from '../../../models/Journey.ts'
import db from '../connection.ts'
import connection from '../connection.ts'

export async function getLocationsNames() {
  const result = await db('locations').select('name')
  return result as LocationNames[]
}

export async function getLocationImageById(id: number) {
  const result = await db('locations')
    .select('image', 'ticket_image as ticketImage')
    .where('id', id)
  return result
}

export async function calculateTravelOptions(selections: TravelSelections) {
  const firstLocation = await db('locations')
    .select('id', 'name')
    .where('name', selections.selectFrom)
    .first()

  const secondLocation = await db('locations')
    .select('id', 'name')
    .where('name', selections.selectTo)
    .first()

  const distance = await db('distances')
    .select('distance')
    .where('first_location_id', firstLocation.id)
    .andWhere('second_location_id', secondLocation.id)
    .orWhere('first_location_id', secondLocation.id)
    .andWhere('second_location_id', firstLocation.id)
    .first()

  const travelTypes = await db('travel_types')

  const results = travelTypes.map((travelType) => {
    const travelTimeNumeric = distance.distance / travelType.speed

    const minutes = Math.floor(travelTimeNumeric / 60)

    let minutesText = ''

    if (minutes === 0) minutesText = ''
    if (minutes === 1) minutesText = minutes + ' minute '
    if (minutes > 1) minutesText = minutes + ' minutes '

    const seconds = Math.round(travelTimeNumeric - minutes * 60)

    let secondsText = ''

    if (seconds === 0) secondsText = ''
    if (seconds === 1) secondsText = seconds + ' second'
    if (seconds > 1) secondsText = seconds + ' seconds'

    const travelTimeText = minutesText + secondsText

    return {
      fromId: firstLocation.id,
      fromName: firstLocation.name,
      toId: secondLocation.id,
      toName: secondLocation.name,
      travelDistance: distance.distance,
      travelTypeId: travelType.id,
      travelTypeName: travelType.name,
      travelTimeNumeric: travelTimeNumeric,
      travelTime: travelTimeText,
    }
  })

  return results as JourneyData[]
}

export async function getAllEvents(db = connection) {
  return db('events').select(
    'id',
    'name',
    'description',
    'image',
    'event_type as eventType',
    'complete_description as completeDescription',
    'timeout',
    'speed_change as speedChange',
  )
}

export async function getRandomEvent(): Promise<Event> {
  const events = await getAllEvents()
  const randomIndex = Math.floor(Math.random() * events.length)
  return events[randomIndex]
}
