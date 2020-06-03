import React from "react";
import "./Navbar.css";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Modal,
  ModalFooter,
  ModalHeader,
  ModalBody,
  Form,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
} from "reactstrap";
import ButtonCstm from "../button/Button";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { loginHandler } from "../../../redux/actions";

class NavbarCstm extends React.Component {
  state = {
    dropdownOpen: false,
    modal: false,
    showPassword: false,
    loginForm: {
      username: "",
      password: "",
    },
  };

  valueHandler = (event, form, field) => {
    const { value } = event.target;
    this.setState({
      [form]: { ...this.state[form], [field]: value },
    });
  };

  loginHandler = () => {
    const { username, password } = this.state.loginForm;
    let userLogin = { username, password };
    this.props.loginHandler(userLogin);
    console.log(this.props.user.username);
    this.setState({ modal: !this.state.modal });
  };

  onClick = () => {
    this.setState({ dropdownOpen: !this.state.dropdownOpen });
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  showPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
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
              {this.props.user.id ? (
                <ButtonCstm type="coral" onClick={this.toggle}>
                  Log Out
                </ButtonCstm>
              ) : (
                <ButtonCstm type="coral" onClick={this.toggle}>
                  Join Us!
                </ButtonCstm>
              )}
            </NavItem>
          </Nav>
        </Navbar>

        {/* Login Modal */}
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader
            className="border-0"
            style={{ border: "0px none" }}
            toggle={this.toggle}
          ></ModalHeader>
          <ModalBody className="d-flex border flex-column align-items-center">
            <h3 className="mb-3">Login</h3>
            <p className="text-center mb-3">
              Sign in and explore the latest and most complete health
              information according to your needs here!
            </p>
            <Form className="mt-2 col-9">
              <InputGroup className="mb-3">
                <Input
                  placeholder="Username"
                  onChange={(e) => {
                    this.valueHandler(e, "loginForm", "username");
                  }}
                />
              </InputGroup>
              <InputGroup className="mb-3">
                <Input
                  type={this.state.showPassword ? "text" : "password"}
                  placeholder="Password"
                  onChange={(e) => {
                    this.valueHandler(e, "loginForm", "password");
                  }}
                />
                <InputGroupAddon addonType="append">
                  <InputGroupText
                    style={{
                      background: "#fba43c",
                      border: "white",
                      color: "white",
                    }}
                  >
                    <FontAwesomeIcon
                      onClick={this.showPassword}
                      icon={faEye}
                      style={{ color: "white" }}
                    />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              <ButtonCstm
                className="mb-2"
                type="green"
                style={{ width: "100%" }}
                onClick={this.loginHandler}
              >
                Sign In
              </ButtonCstm>
            </Form>
            <p>
              Don't have an account?{" "}
              <Link style={{ textDecoration: "none" }}>Sign Up!</Link>
            </p>
          </ModalBody>
          <ModalFooter className="text-center p-3">
            <p style={{ fontSize: "14px" }}>
              By logging in or registering, you agree to the Mom Story Terms &
              Conditions and Privacy.
            </p>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = {
  loginHandler,
};

export default connect(mapStateToProps, mapDispatchToProps)(NavbarCstm);
