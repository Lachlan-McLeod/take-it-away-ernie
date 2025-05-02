/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
  return knex.schema.createTable('user_encounters', (table) => {
    table.increments('id').primary()
    table.string('user_id').notNullable()
    table.integer('encounter_id').notNullable()
    table.boolean('completed').defaultTo(true)
    table.timestamp('timestamp').defaultTo(knex.fn.now())
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function (knex) {
  return knex.schema.dropTableIfExists('user_encounters')
}
