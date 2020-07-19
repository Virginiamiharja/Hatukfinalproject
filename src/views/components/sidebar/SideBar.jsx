import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faUserNurse,
  faWallet,
  faCommentDots,
  faHospital,
  faUser,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutHandler } from "../../../redux/actions";

class SideBar extends React.Component {
  state = {
    arrLink: [
      "/admin/dashboard",
      "/admin/therapist",
      "/admin/transaction",
      "/admin/user",
      "",
    ],
    arrIcon: [faTachometerAlt, faUserNurse, faWallet, faUser, faSignOutAlt],
    arrMenu: ["Dashboard", "Therapist", "Transaction", "User", "Log Out"],
    indexColor: ["#fc8454", "#f4cc3c", "#84c4d4", "#8ccc7c", "#6d68b8"],
  };

  renderMenu = () => {
    return this.state.arrMenu.map((value, index) => {
      return (
        <div
          className="d-flex p-4 mb-2 rounded"
          onClick={
            this.props.user.role == "admin" && index == 4
              ? this.props.logoutHandler
              : null
          }
          style={{
            backgroundColor: "white",
            color: "black",
            border: `3px solid ${this.state.indexColor[index]}`,
          }}
        >
          <Link
            to={this.state.arrLink[index]}
            className="d-flex p-0 m-0"
            style={{ color: "black" }}
          >
            <FontAwesomeIcon
              icon={this.state.arrIcon[index]}
              style={{ fontSize: "25px", color: this.state.indexColor[index] }}
            />
            <h5 className="ml-4 mb-0">{value}</h5>
          </Link>
        </div>
      );
    });
  };

  render() {
    return <div> {this.renderMenu()}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = {
  logoutHandler,
};

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
