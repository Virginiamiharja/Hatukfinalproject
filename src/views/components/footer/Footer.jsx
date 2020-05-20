import React from "react";
import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faEnvelope,
  faPhoneAlt,
  faCalendarAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

class Footer extends React.Component {
  state = {
    latestArticle: [1, 2],
  };

  renderLatestArticle = () => {
    return this.state.latestArticle.map((value) => {
      return (
        <div className="d-flex mb-2 align-items-center justify-content-center">
          <img
            src="https://media.edutopia.org/styles/responsive_2880px_16x9/s3/masters/2018-05/shutterstock_141101980_master.jpg"
            alt=""
            style={{ height: "100px" }}
          />
          <div className="d-flex ml-2 flex-column">
            <h5>Skills to Develop Your Child Memory</h5>
            {/* Date */}
            <div className="d-flex align-items-center">
              <FontAwesomeIcon
                icon={faCalendarAlt}
                style={{ fontSize: "10px", color: "#A1A1A8" }}
              />
              <p
                className="ml-2"
                style={{
                  fontSize: "10px",
                  color: "#A1A1A8",
                }}
              >
                20/05/2020
              </p>
            </div>
            {/* Author */}
            <div className="d-flex align-items-center">
              <FontAwesomeIcon
                icon={faUser}
                style={{ fontSize: "10px", color: "#A1A1A8" }}
              />
              <p
                className="ml-2"
                style={{
                  fontSize: "10px",
                  color: "#A1A1A8",
                }}
              >
                Virginia Miharja
              </p>
            </div>
          </div>
        </div>
      );
    });
  };

  render() {
    return (
      <div
        className="d-flex footer-body flex-column justify-content-center align-items-start p-5"
        style={{ background: "#282424" }}
      >
        {/* Section 1 */}
        <div className="d-flex mb-5">
          <div className="d-flex flex-column col-4">
            <h4 className="mb-4">Have a Question?</h4>
            {/* Alamat */}
            <div className="d-flex align-items-center mb-4">
              <FontAwesomeIcon
                icon={faMapMarkerAlt}
                className="mb-2 col-2"
                style={{ fontSize: "20px" }}
              />
              <p className="ml-3" style={{ opacity: "90%" }}>
                Agung Utara 3C Blok A 28 No 20, Sunter Agung, Jakarta Utara, DKI
                Jakarta
              </p>
            </div>
            {/* Telephone */}
            <div className="d-flex align-items-center mb-4">
              <FontAwesomeIcon
                icon={faPhoneAlt}
                className="mb-2 col-2"
                style={{ fontSize: "20px" }}
              />
              <p className="ml-3" style={{ opacity: "90%" }}>
                021-6508978
              </p>
            </div>
            {/* Email */}
            <div className="d-flex align-items-center mb-4">
              <FontAwesomeIcon
                icon={faEnvelope}
                className="mb-2 col-2"
                style={{ fontSize: "20px" }}
              />
              <p className="ml-3" style={{ opacity: "90%" }}>
                momstory@gmail.com
              </p>
            </div>
          </div>
          <div className="d-flex flex-column col-4">
            <h4 className="mb-4">Latest Article</h4>
            {this.renderLatestArticle()}
          </div>
          <div className="d-flex flex-column col-4 border">
            <h4>Bingung</h4>
          </div>
        </div>

        {/* Section 2 */}
        <div className="d-flex col-12 justify-content-center ">
          <p style={{ fontSize: "15px", opacity: "70%" }}>
            © 2020 Virginia Miharja All Rights Reserved
          </p>
        </div>
      </div>
    );
  }
}

export default Footer;
