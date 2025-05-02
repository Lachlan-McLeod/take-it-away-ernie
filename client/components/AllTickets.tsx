import { useOutletContext } from 'react-router-dom'
import { UserWithDetails } from '../../models/Users'
import Ticket from './Ticket'
import { TicketWithDetails } from '../../models/Tickets'

function AllTickets() {
  const currentUser = useOutletContext() as UserWithDetails

  return (
    <div className="tickets">
      {currentUser?.tickets.map((ticket: TicketWithDetails) => {
        return <Ticket {...ticket} key={ticket.id} />
      })}
    </div>
  )
}

export default AllTickets
