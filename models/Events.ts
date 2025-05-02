export interface EventData {
  name: string
  description: string
  image: string
  eventType: string
  completeDescription: string
  timeout: number
  speedChange: number
}

export interface Event extends EventData {
  id: number
}
