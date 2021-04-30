import React from "react";
import Maps from "../Maps/Maps";
import { MDBCol, MDBContainer } from "mdbreact";
import "./Destination.css";
import TicketDetails from "../TicketDetails/TicketDetails";
import { useParams } from "react-router-dom";
const Destination = () => {
  const { key } = useParams();
  return (
    <MDBContainer>
      <div className="destination-container mt-5">
        <MDBCol size="12" lg="4">
          <div className="mr-5">
            <TicketDetails></TicketDetails>
          </div>
        </MDBCol>
        <MDBCol size="12" lg="8" style={{ minHeight: "500px" }}>
          <div className="map">
            <Maps></Maps>
          </div>
        </MDBCol>
      </div>
    </MDBContainer>
  );
};
export default Destination;
