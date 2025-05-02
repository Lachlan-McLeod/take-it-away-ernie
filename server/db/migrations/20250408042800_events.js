/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
  return knex.schema.createTable('events', (table) => {
    table.integer('id').primary()
    table.string('name')
    table.string('description')
    table.string('image')
    table.string('event_type')
    table.string('complete_description')
    table.integer('timeout')
    table.float('speed_change')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function (knex) {
  return knex.schema.dropTableIfExists('events')
}
