import React from "react";
import "./Navbar.css";
import {
  Navbar,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
} from "reactstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";

class NavbarCstm extends React.Component {
  render() {
    return (
      <Navbar className="d-flex justify-content-center align-items-center">
        {/* Section 1 */}
        <div className="d-flex flex-column flex-lg-row align-items-center col-lg-10">
          {/* Logo */}
          <div className="d-flex col-sm-6 justify-content-center justify-content-lg-start">
            <div className="brand-text1">
              <span style={{ color: "#fc8454" }}>M</span>
              <span style={{ color: "#84c4d4" }}>O</span>
              <span style={{ color: "#8ccc7c" }}>M</span>
              &nbsp;
              <span style={{ color: "#f4cc3c" }}>&bull;</span>
              &nbsp;
            </div>
            <div className="brand-text2">Story</div>
          </div>
          {/* Other */}
          <div className="d-flex flex-column justify-content-start align-items-center align-items-lg-end col-sm-6">
            {/* Login and Register or user's name */}
            {this.props.user.id ? (
              <div
                className="d-flex align-items-center navbar-text"
                style={{ color: "#fc8454" }}
              >
                Hello, {this.props.user.name}!
              </div>
            ) : (
              <div className="d-flex" style={{ color: "#fc8454" }}>
                <Link className="navbar-text">Register</Link>
                <span style={{ fontSize: "33px", marginRight: "5px" }}>
                  &bull;
                </span>
                <Link className="navbar-text">Login</Link>
              </div>
            )}
            {/* Search */}
            <InputGroup style={{ width: "75%" }}>
              <Input
                placeholder="Search the best therapist!"
                style={{ border: "white", background: "#f2f2f2" }}
              />
              <InputGroupAddon addonType="append">
                <InputGroupText
                  style={{ border: "white", background: "#f2f2f2" }}
                >
                  <FontAwesomeIcon icon={faSearch} style={{ color: "black" }} />
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </div>
        </div>

        {/* Section 2  */}
        <div className="d-flex flex-wrap align-items-center justify-content-center mb-3 col-12">
          <div className="d-flex flex-wrap flex-row col-4 col-lg-2 mt-4">
            <div
              className="d-flex"
              style={{ width: "100%", height: "15px", background: "#84c4d4" }}
            ></div>
            <Link
              to="/"
              className="d-flex justify-content-center align-items-center navbar-link navbar-blue"
            >
              Home
            </Link>
          </div>
          <div className="d-flex flex-wrap flex-column col-4 col-lg-2 mt-4">
            <div
              className="d-flex"
              style={{ width: "100%", height: "15px", background: "#fc8454" }}
            ></div>
            <Link
              to="/"
              className="d-flex justify-content-center align-items-center navbar-link navbar-coral"
            >
              About
            </Link>
          </div>
          <div className="d-flex flex-wrap flex-column col-4 col-lg-2 mt-4">
            <div
              className="d-flex"
              style={{ width: "100%", height: "15px", background: "#f4cc3c" }}
            ></div>
            <Link className="d-flex justify-content-center align-items-center navbar-link navbar-sandy">
              Therapist
            </Link>
          </div>
          <div className="d-flex flex-wrap flex-column col-4 col-lg-2 mt-4">
            <div
              className="d-flex"
              style={{ width: "100%", height: "15px", background: "#8ccc7c" }}
            ></div>
            <Link
              to="/article"
              className="d-flex justify-content-center align-items-center navbar-link navbar-green"
            >
              Article
            </Link>
          </div>
          <div className="d-flex flex-wrap flex-column col-4 col-lg-2 mt-4">
            <div
              className="d-flex"
              style={{ width: "100%", height: "15px", background: "#84c4d4" }}
            ></div>
            <Link className="d-flex justify-content-center align-items-center navbar-link navbar-blue">
              School
            </Link>
          </div>
          <div className="d-flex flex-wrap flex-column col-4 col-lg-2 mt-4">
            <div
              className="d-flex"
              style={{ width: "100%", height: "15px", background: "#fc8454" }}
            ></div>
            <Link className="d-flex justify-content-center align-items-center navbar-link navbar-coral">
              Clinic
            </Link>
          </div>
        </div>
      </Navbar>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(NavbarCstm);
