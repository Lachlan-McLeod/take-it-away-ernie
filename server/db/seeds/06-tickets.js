/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const seed = async function (knex) {
  await knex('tickets').insert([
    {
      id: 1,
      user_id: 1,
      start_location_id: 1,
      end_location_id: 2,
      travel_type_id: 1,
      event_id: 1,
    },
  ])
}
