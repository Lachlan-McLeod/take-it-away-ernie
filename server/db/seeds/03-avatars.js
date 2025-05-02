/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const seed = async function (knex) {
  await knex('avatars').insert([
    { id: 1, image: '/images/avatars/avatar1.png' },
    { id: 2, image: '/images/avatars/avatar2.png' },
    { id: 3, image: '/images/avatars/avatar3.png' },
    { id: 4, image: '/images/avatars/avatar4.png' },
    { id: 5, image: '/images/avatars/avatar5.png' },
    { id: 6, image: '/images/avatars/avatar6.png' },
  ])
}
