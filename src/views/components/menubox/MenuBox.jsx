import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faHospital,
  faFile,
  faUserNurse,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";

class MenuBox extends React.Component {
  renderIcon = () => {
    const { title } = this.props.data;
    if (title == "Therapist") {
      return (
        <FontAwesomeIcon icon={faUserNurse} style={{ fontSize: "45px" }} />
      );
    } else if (title == "Clinic") {
      return <FontAwesomeIcon icon={faHospital} style={{ fontSize: "45px" }} />;
    } else if (title == "Transaction") {
      return <FontAwesomeIcon icon={faWallet} style={{ fontSize: "45px" }} />;
    } else if (title == "User") {
      return <FontAwesomeIcon icon={faUser} style={{ fontSize: "45px" }} />;
    }
  };

  render() {
    const { title, color, total } = this.props.data;
    return (
      <div
        className="col-3 rounded p-4 d-flex"
        style={{
          backgroundColor: color,
          color: "white",
          border: "1px solid white",
        }}
      >
        <div className="col-4 d-flex align-items-center justify-content-center">
          {this.renderIcon()}
        </div>
        <div className="col-8 d-flex flex-column">
          <div className="d-flex p-0 align-items-center">
            <span style={{ fontSize: "20px" }}>{total}</span>
          </div>
          <div className="d-flex p-0 align-items-center">
            <span style={{ fontSize: "20px" }}>{title}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default MenuBox;
