import { TicketWithDetails } from '../../models/Tickets'

function Ticket(props: TicketWithDetails) {
  return (
    <>
      <div className="ticket" key={props.endLocationName}>
        <div className="ticket-info">
          <h3>{props.endLocationName}</h3>
          <p>
            <strong>Departed:</strong> {props.startLocationName}
          </p>
          <p>
            <strong>Arrived:</strong> {props.endLocationName}
          </p>
          <p>
            <strong>Travelled by:</strong> {props.travelTypeName}
          </p>
          <p>
            <strong>Encountered:</strong> {props.eventName}
          </p>
          <p>
            <strong>Distance: </strong>
            {props.travelDistance}
            km
          </p>
        </div>
        <img
          className="ticket-image"
          src={props.endLocationImage}
          alt="a ticket for your arrival"
        />
      </div>
    </>
  )
}

export default Ticket
