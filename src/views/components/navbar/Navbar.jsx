import React from "react";
import "./Navbar.css";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";
import ButtonCstm from "../button/Button";

class NavbarCstm extends React.Component {
  state = {
    dropdownOpen: false
  };

  onClick = () => {
    this.setState({ dropdownOpen: !this.state.dropdownOpen });
  };

  render() {
    return (
      <>
        <Navbar fixed="top" className="custom-nav">
          <NavbarBrand href="/">
            <h3 className="navbar-logo">Mom Story</h3>
          </NavbarBrand>
          <Nav className="justify-content-around align-items-center">
            <NavLink href="/" className="navbar-text">
              Home
            </NavLink>
            <NavLink href="/#about" className="navbar-text">
              About
            </NavLink>
            <NavLink href="/article" className="navbar-text">
              Article
            </NavLink>
            <NavLink href="/school" className="navbar-text">
              School
            </NavLink>
            <NavLink tag="div" className="navbar-text">
              Clinic
            </NavLink>
            <NavLink tag="div" className="navbar-text">
              Therapist
            </NavLink>
            <NavItem>
              <ButtonCstm type="coral"> Join Us !</ButtonCstm>
            </NavItem>
          </Nav>
        </Navbar>
      </>
    );
  }
}

export default NavbarCstm;
