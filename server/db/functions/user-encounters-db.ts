import connection from '../connection.ts'

export async function addUserEncounter(encounterId: number, userId: number, db = connection) {
  return db('user_encounters').insert({
    encounter_id: encounterId,
    user_id: userId,
    completed: true,
  })
}