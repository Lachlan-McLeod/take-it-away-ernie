import { TicketWithDetails } from './Tickets'

export interface UserData {
  name: string
  authId: string
  avatarId: number
}

export interface User extends UserData {
  id: number
}

export interface UserWithAvatar extends User {
  avatarImage: string
}
export interface UserWithDetails extends UserWithAvatar {
  tickets: TicketWithDetails[]
}
