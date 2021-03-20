import React from "react";
import { useParams } from "react-router-dom";
import Maps from "../Maps/Maps";
import { MDBCol, MDBContainer, MDBRow } from "mdbreact";
import "./Destination.css";

const Destination = (props) => {
  const { id } = useParams();
  console.log(id);
  return <Maps></Maps>;
};
export default Destination;
