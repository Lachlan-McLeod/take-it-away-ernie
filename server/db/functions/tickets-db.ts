import { TicketData, TicketWithDetails } from '../../../models/Tickets.ts'
import db from '../connection.ts'

const ticketKeys = [
  'tickets.id as id',
  'tickets.user_id as userId',
  'tickets.start_location_id as startLocationId',
  'tickets.end_location_id as endLocationId',
  'tickets.travel_type_id as travelTypeId',
  'tickets.event_id as eventId',
]

const ticketWithDetailsKeys = [
  ...ticketKeys,
  'end_location.ticket_image as endLocationImage',
  'start_location.name as startLocationName',
  'end_location.name as endLocationName',
  'events.name as eventName',
  'travel_types.name as travelTypeName',
]

function convertTicketDataToSnakeCase(data: TicketData) {
  return {
    user_id: data.userId,
    start_location_id: data.startLocationId,
    end_location_id: data.endLocationId,
    travel_type_id: data.travelTypeId,
    event_id: data.eventId,
  }
}

export async function getDistanceBetweenLocations(
  locationId1: number,
  locationId2: number,
) {
  const distance = await db('distances')
    .where('distances.first_location_id', locationId1)
    .andWhere('distances.second_location_id', locationId2)
    .orWhere('distances.first_location_id', locationId2)
    .andWhere('distances.second_location_id', locationId1)
    .select('distance')
    .first()

  return distance.distance
}

export async function getTicketsByUserAuthId(
  authId: string,
): Promise<TicketWithDetails[]> {
  const tickets = await db('tickets')
    .join('users', 'tickets.user_id', '=', 'users.id')
    .join(
      'locations as start_location',
      'tickets.start_location_id',
      '=',
      'start_location.id',
    )
    .join(
      'locations as end_location',
      'tickets.end_location_id',
      '=',
      'end_location.id',
    )
    .join('events', 'tickets.event_id', '=', 'events.id')
    .join('travel_types', 'tickets.travel_type_id', '=', 'travel_types.id')
    .where('users.auth_id', authId)
    .select(ticketWithDetailsKeys)

  const ticketsWithDistance = await Promise.all(
    tickets.map(async (ticket) => {
      const distance = await getDistanceBetweenLocations(
        ticket.startLocationId,
        ticket.endLocationId,
      )

      const newTicket = {
        ...ticket,
        travelDistance: distance,
      }

      return newTicket
    }),
  )

  return ticketsWithDistance as TicketWithDetails[]
}

export async function addTicket(newTicket: TicketData): Promise<number> {
  const results = await db('tickets').insert(
    convertTicketDataToSnakeCase(newTicket),
  )

  return results[0]
}
