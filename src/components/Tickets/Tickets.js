import React from "react";
import data from "../Data/Data.json";
import { MDBIcon, MDBBtn, MDBRow, MDBCol } from "mdbreact";
import "./Tickets.css";
const Tickets = () => {
  return (
    // <MDBContainer>
    <MDBRow className="ml-5 mr-5 ticket-container align-items-center">
      {data.map((ticket) => (
        <MDBCol size="12" lg="2" className="ticket align-items-center">
          <p className="ticket-title pt-5">{ticket.Name}</p> <br />
          <MDBBtn className="buy-btn" gradient="peach">
            Buy now
          </MDBBtn>
          <p className="ticket-price">
            <MDBIcon icon="lira-sign" />
            <span> {ticket.Price}</span>
          </p>
        </MDBCol>
      ))}
    </MDBRow>
    // </MDBContainer>
  );
};
export default Tickets;
