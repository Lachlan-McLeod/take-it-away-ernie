export interface JourneyData {
  fromId: number
  fromName: string
  toId: number
  toName: string
  travelDistance: number
  travelTypeId: number
  travelTypeName: string
  travelTimeNumeric: number
  travelTime: string
}

export interface JourneyDataWithEvent extends JourneyData {
  eventId: number
  eventName: string
  eventType: string
  completeDescription: string
}

export interface JourneyDataWithArrival extends JourneyDataWithEvent {
  destination: string
}
