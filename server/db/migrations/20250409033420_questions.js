/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
  return knex.schema.createTable('questions', (table) => {
    table.integer('id').primary()
    table.string('question')
    table.string('answer_1')
    table.string('answer_2')
    table.string('answer_3')
    table.string('answer_4')
    table.boolean('answer_1_correct')
    table.boolean('answer_2_correct')
    table.boolean('answer_3_correct')
    table.boolean('answer_4_correct')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function (knex) {
  return knex.schema.dropTableIfExists('questions')
}
