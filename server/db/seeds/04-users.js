/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const seed = async function (knex) {
  await knex('users').insert([
    {
      id: 1,
      auth_id: 'auth|999999999999999999999999',
      name: "Roger Ster O'Signuplease",
      avatar_id: 1,
    },
  ])
}
