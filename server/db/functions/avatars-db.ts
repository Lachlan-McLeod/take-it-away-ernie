import { Avatar, AvatarData } from '../../../models/Avatars.ts'
import db from '../connection.ts'

export async function getAllAvatars(): Promise<Avatar[]> {
  const avatars = await db('avatars').select()

  return avatars as Avatar[]
}

export async function addAvatar(newAvatar: AvatarData): Promise<number> {
  const results = await db('avatars').insert(newAvatar)

  return results[0]
}
