/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const seed = async function (knex) {
  await knex('travel_types').insert([
    { id: 1, name: 'Broomstick', speed: 1 },
    { id: 2, name: 'Floo powder', speed: 5 },
    { id: 3, name: 'The Knight Bus', speed: 1.4 },
    { id: 4, name: 'Hogwarts Express', speed: 1.8 },
    { id: 5, name: 'Port Key', speed: 3 },
    { id: 6, name: 'Hippogriff', speed: 0.8 },
    { id: 7, name: 'Thestral', speed: 0.6 },
    { id: 8, name: 'Flying car', speed: 1.6 },
  ])
}
