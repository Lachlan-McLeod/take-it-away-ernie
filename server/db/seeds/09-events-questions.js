/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const seed = async function (knex) {
  await knex('events_questions').insert([
    {
      event_id: 9,
      question_id: 1,
    },
    {
      event_id: 10,
      question_id: 2,
    },
    {
      event_id: 4,
      question_id: 3,
    },
    {
      event_id: 4,
      question_id: 4,
    },
    {
      event_id: 4,
      question_id: 5,
    },
    {
      event_id: 4,
      question_id: 6,
    },
    {
      event_id: 4,
      question_id: 7,
    },
    {
      event_id: 4,
      question_id: 8,
    },
    {
      event_id: 4,
      question_id: 9,
    },
    {
      event_id: 4,
      question_id: 10,
    },
    {
      event_id: 4,
      question_id: 11,
    },
    {
      event_id: 4,
      question_id: 12,
    },
  ])
}
