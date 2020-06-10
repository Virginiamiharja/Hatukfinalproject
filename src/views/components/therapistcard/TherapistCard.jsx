import React from "react";
import "./TherapistCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStethoscope,
  faHospital,
  faThumbsUp,
  faPhone,
  faBook,
} from "@fortawesome/free-solid-svg-icons";
import ButtonCstm from "../button/Button";

class TherapistCard extends React.Component {
  render() {
    return (
      <>
        <div className="d-flex flex-row border col-12 mb-3 rounded p-3">
          <div
            className="d-flex border-right justify-content-center col-6 col-lg-3"
            // style={{ borderRight: "1px solid #f4cc3c" }}
          >
            <img
              src="https://engineering.unl.edu/images/staff/Kayla_Person-small.jpg"
              className="rounded"
              alt=""
              style={{ width: "50%" }}
            />
          </div>
          <div
            className="d-flex border-right flex-column col-6"
            // style={{ borderRight: "1px solid #f4cc3c" }}
          >
            <h5 className="mb-1">Kayla Person, S.Psi</h5>
            <div className="d-flex align-items-center">
              <FontAwesomeIcon
                icon={faStethoscope}
                className="mr-2"
                style={{ color: "#A1A1A8", fontSize: "14px" }}
              />
              <p style={{ color: "#A1A1A8", fontSize: "14px" }}>ADHD</p>
            </div>
            <div className="d-flex align-items-center">
              <FontAwesomeIcon
                icon={faHospital}
                className="mr-2"
                style={{ color: "#A1A1A8", fontSize: "14px" }}
              />
              <p style={{ color: "#A1A1A8", fontSize: "14px" }}>
                Miracle School Special Needs Education
              </p>
            </div>
          </div>
          <div className="d-flex flex-column col-3">
            <h5 className="mb-1">Rating</h5>
            <div className="d-flex align-items-center mb-3">
              <FontAwesomeIcon
                icon={faThumbsUp}
                className="mr-2"
                style={{ color: "#84c4d4", fontSize: "14px" }}
              />
              <p style={{ color: "#A1A1A8", fontSize: "14px" }}>4.5</p>
            </div>
            <h6 className="mb-1">Service Fee</h6>
            <p
              style={{ color: "#fc8454", fontWeight: "bold" }}
              className="mb-3"
            >
              Rp. 250.000
            </p>
            <ButtonCstm type="coral"> Book Service </ButtonCstm>
          </div>
        </div>
      </>
    );
  }
}

export default TherapistCard;
