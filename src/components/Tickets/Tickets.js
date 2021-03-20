import React, { useContext } from "react";
import data from "../Data/Data.json";
import { MDBIcon, MDBBtn, MDBRow, MDBCol } from "mdbreact";
import "./Tickets.css";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
const Tickets = () => {
  const [ticket, setTicket] = useContext(UserContext);
  const handleBuy = (id) => {
    console.log(id);
  };
  return (
    <MDBRow className="ml-5 mr-5 ticket-container align-items-center">
      {data.map((ticket) => (
        <MDBCol
          size="12"
          lg="2"
          className="ticket "
          style={{
            backgroundImage: `url(${ticket.Photo})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%",
          }}
        >
          <p className="ticket-title pt-5">{ticket.Name}</p> <br />
          <Link to={"/destination/" + ticket.id}>
            <MDBBtn
              onClick={() => handleBuy(ticket.id)}
              className="buy-btn"
              gradient="peach"
            >
              Buy now
            </MDBBtn>
          </Link>
          <p className="ticket-price">
            <MDBIcon icon="lira-sign" />
            <span> {ticket.Price}</span>
          </p>
        </MDBCol>
      ))}
    </MDBRow>
  );
};
export default Tickets;
