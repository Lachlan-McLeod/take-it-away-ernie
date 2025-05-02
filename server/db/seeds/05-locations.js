/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const seed = async function (knex) {
  await knex('locations').insert([
    {
      id: 1,
      name: 'Hogsmeade',
      image: '/images/locations/hogsmeade.jpg',
      ticket_image: '/images/tickets/hogsmeade-ticket.png',
    },
    {
      id: 2,
      name: 'Hogwarts',
      image: '/images/locations/hogwarts.jpg',
      ticket_image: '/images/tickets/hogwarts-ticket.png',
    },
    {
      id: 3,
      name: 'Forbidden Forest',
      image: '/images/locations/forbidden-forest.jpg',
      ticket_image: '/images/tickets/forbidden-forest-ticket.jpg',
    },
    {
      id: 4,
      name: 'Azkaban',
      image: '/images/locations/azkaban.jpg',
      ticket_image: '/images/tickets/azkaban-ticket.png',
    },
    {
      id: 5,
      name: "King's Cross",
      image: '/images/locations/kings-cross.jpg',
      ticket_image: '/images/tickets/kings-cross-ticket.png',
    },
    {
      id: 6,
      name: 'Privet Drive',
      image: '/images/locations/privet-drive.jpg',
      ticket_image: '/images/tickets/privet-drive-ticket.png',
    },
    {
      id: 7,
      name: 'The Burrow',
      image: '/images/locations/the-burrow.jpg',
      ticket_image: '/images/tickets/the-burrow-ticket.png',
    },
    {
      id: 8,
      name: "Godric's Hollow",
      image: '/images/locations/godrics-hollow.jpg',
      ticket_image: '/images/tickets/godrics-hollow-ticket.png',
    },
    {
      id: 9,
      name: 'Shell Cottage',
      image: '/images/locations/shell-cottage.jpg',
      ticket_image: '/images/tickets/shell-cottage-ticket.png',
    },
    {
      id: 10,
      name: 'Durmstrang',
      image: '/images/locations/durmstrang.jpg',
      ticket_image: '/images/tickets/durmstrang-ticket.png',
    },
    {
      id: 11,
      name: 'Beauxbatons',
      image: '/images/locations/beauxbatons.jpg',
      ticket_image: '/images/tickets/beauxbatons-ticket.png',
    },
  ])
}
