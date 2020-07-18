import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faUserNurse,
  faWallet,
  faCommentDots,
  faHospital,
} from "@fortawesome/free-solid-svg-icons";

class SideBar extends React.Component {
  state = {
    arrIcon: [faTachometerAlt, faUserNurse, faWallet, faHospital],
    arrMenu: ["Dashboard", "Therapist", "Transaction", "Clinic"],
    indexColor: ["#fc8454", "#f4cc3c", "#84c4d4", "#8ccc7c", "#6d68b8"],
  };

  renderMenu = () => {
    return this.state.arrMenu.map((value, index) => {
      return (
        <div
          className="d-flex p-4 mb-2 rounded"
          style={{
            backgroundColor: "white",
            color: "black",
            border: `3px solid ${this.state.indexColor[index]}`,
          }}
          onClick={() => this.changePage(index)}
        >
          <FontAwesomeIcon
            icon={this.state.arrIcon[index]}
            style={{ fontSize: "25px", color: this.state.indexColor[index] }}
          />
          <h5 className="ml-4 mb-0">{value}</h5>
        </div>
      );
    });
  };

  render() {
    return <div> {this.renderMenu()}</div>;
  }
}

export default SideBar;
