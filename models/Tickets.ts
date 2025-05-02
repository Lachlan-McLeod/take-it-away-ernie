export interface TicketData {
  userId: number
  startLocationId: number
  endLocationId: number
  travelTypeId: number
  eventId: number | null
}

export interface Ticket extends TicketData {
  id: number
}

export interface TicketWithDetails extends Ticket {
  endLocationImage: string
  startLocationName: string
  endLocationName: string
  travelTypeName: string
  eventName: string
  travelDistance: number
}
