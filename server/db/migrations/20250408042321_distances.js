/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
  return knex.schema.createTable('distances', (table) => {
    table.integer('first_location_id').references('locations.id')
    table.integer('second_location_id').references('locations.id')
    table.integer('distance')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function (knex) {
  return knex.schema.dropTableIfExists('distances')
}
