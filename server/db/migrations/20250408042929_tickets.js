/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
  return knex.schema.createTable('tickets', (table) => {
    table.integer('id').primary()
    table.integer('user_id').references('users.id')
    table.integer('start_location_id').references('locations.id')
    table.integer('end_location_id').references('locations.id')
    table.integer('travel_type_id').references('travel_types.id')
    table.integer('event_id').references('events.id')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function (knex) {
  return knex.schema.dropTableIfExists('tickets')
}
