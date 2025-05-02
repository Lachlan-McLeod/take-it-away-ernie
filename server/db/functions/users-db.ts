import { User, UserData, UserWithDetails } from '../../../models/Users.ts'
import { getTicketsByUserAuthId } from './tickets-db.ts'

import db from '../connection.ts'

export const userKeys = [
  'users.id as id',
  'users.auth_id as authId',
  'users.name as name',
  'users.avatar_id as avatarId',
]

export const userWithAvatarKeys = [...userKeys, 'avatars.image as avatarImage']

function convertUserDataToSnakeCase(data: UserData) {
  return { name: data.name, auth_id: data.authId, avatar_id: data.avatarId }
}

export async function getUserById(id: number): Promise<User> {
  const user = await db('users').where('users.id', id).select(userKeys).first()

  return user as User
}

export async function getUserByAuthId(
  authId: string,
): Promise<UserWithDetails | undefined> {
  const user = await db('users')
    .join('avatars', 'users.avatar_id', '=', 'avatars.id')
    .where('users.auth_id', authId)
    .select(userWithAvatarKeys)
    .first()

  const userWithDetails = { ...user }

  userWithDetails.tickets = await getTicketsByUserAuthId(authId)

  return userWithDetails as UserWithDetails
}

export async function addUser(newUser: UserData): Promise<number> {
  const existingUser = await getUserByAuthId(newUser.authId)

  if (existingUser?.name) {
    throw new Error('User already exists')
  }

  const results = await db('users').insert(convertUserDataToSnakeCase(newUser))

  return results[0]
}
