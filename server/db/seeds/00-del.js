/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('tickets').del()
  await knex('distances').del()
  await knex('events_questions').del()
  await knex('users').del()
  await knex('travel_types').del()
  await knex('events').del()
  await knex('avatars').del()
  await knex('locations').del()
  await knex('questions').del()
}
