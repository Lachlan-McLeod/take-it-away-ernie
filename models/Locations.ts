export interface LocationData {
  name: string
  image: string
  ticketImage: string
}

export interface Location extends LocationData {
  id: number
}

export interface LocationNames {
  name: string
}

export interface TravelSelections {
  selectFrom: string
  selectTo: string
}
