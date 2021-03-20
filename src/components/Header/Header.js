import React, { useContext, useState } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import logo from "../../images/image.png";
import "./Header.css";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBFormInline,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
} from "mdbreact";
import { UserContext } from "../../App";
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };
  console.log(loggedInUser);
  return (
    <div>
      <MDBNavbar dark expand="md">
        <MDBNavbarBrand>
          <img alt="" src={logo} style={{ width: "40px" }} />
          <strong className="white-text">RailGari</strong>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={isOpen} navbar>
          <MDBNavbarNav right>
            <ul className="navbar-items">
              <li>
                <Link to="/home">Home</Link>
              </li>
              <li>
                <Link to="/destination">Destination</Link>
              </li>
              <li>
                {loggedInUser.isSignedIn ? (
                  <span>
                    <img
                      alt=""
                      style={{ borderRadius: "50%", width: "40px" }}
                      src={loggedInUser.photo}
                    />
                    <span className="pl-3 pr-3" style={{ color: "white" }}>
                      {loggedInUser.name}
                    </span>
                  </span>
                ) : (
                  <Link to="/form">Login</Link>
                )}
              </li>
            </ul>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
    </div>
  );
};
export default Header;
