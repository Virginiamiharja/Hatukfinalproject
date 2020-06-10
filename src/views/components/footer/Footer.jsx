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
import { Form, Input, Row, Col, FormGroup } from "reactstrap";
import ButtonCstm from "../button/Button";
import facebook from "../../../assets/icons/facebook.png";
import twitter from "../../../assets/icons/twitter.png";
import instagram from "../../../assets/icons/instagram.png";
import linkedin from "../../../assets/icons/linkedin.png";

class Footer extends React.Component {
  state = {
    latestArticle: [1, 2],
  };

  renderLatestArticle = () => {
    return this.state.latestArticle.map((value) => {
      return (
        <div className="d-flex mb-4 align-items-center justify-content-center">
          <img
            src="https://media.edutopia.org/styles/responsive_2880px_16x9/s3/masters/2018-05/shutterstock_141101980_master.jpg"
            alt=""
            className="rounded"
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
        className="d-flex footer-body flex-column justify-content-center align-items-start p-4"
        style={{ background: "#444c4c" }}
      >
        {/* Section 1 - Column 1 */}
        <div className="d-flex flex-wrap mb-5">
          <div className="d-flex flex-column col-12 col-md-6 col-lg-4">
            <div className="d-flex mb-2">
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
            {/* Description */}
            <p className="mb-4">
              We help your children develop properly and grow through hands-on
              learning and fun experiences.
            </p>
            {/* Address */}
            <div className="d-flex align-items-center mb-4">
              <FontAwesomeIcon
                icon={faMapMarkerAlt}
                className="col-2"
                style={{ fontSize: "20px", color: "#fc8454" }}
              />
              <p className="">
                Jl. Menteng Raya blok.FA.1/21 sektor 7, Bintaro Jaya Tangerang
                Selatan, 15224.
              </p>
            </div>
            {/* Telephone */}
            <div className="d-flex align-items-center mb-4">
              <FontAwesomeIcon
                icon={faPhoneAlt}
                className="col-2"
                style={{ fontSize: "20px", color: "#fc8454" }}
              />
              <p>021-6508978</p>
            </div>
            {/* Email */}
            <div className="d-flex align-items-center mb-4">
              <FontAwesomeIcon
                icon={faEnvelope}
                className="col-2"
                style={{ fontSize: "20px", color: "#fc8454" }}
              />
              <p>momstory@gmail.com</p>
            </div>
          </div>
          {/* Section 1 - Column 2 */}
          <div className="d-flex flex-column col-12 col-md-6 col-lg-4">
            <h4 className="mb-4 mt-2">Latest Article</h4>
            {this.renderLatestArticle()}
          </div>
          {/* Section 1 - Column 3 */}
          <div className="d-flex flex-column col-12 col-lg-4">
            <h4 className="mb-4 mt-2">Contact Us</h4>
            <Form className="d-flex flex-column justify-content-center align-items-center mt-2">
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Input type="text" placeholder="Name" className="mb-3" />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Input type="email" placeholder="Email" className="mb-3" />
                  </FormGroup>
                </Col>
              </Row>
              <Input
                type="textarea"
                name="text"
                placeholder="Message"
                className="mb-3"
              />
            </Form>
            <ButtonCstm type="coral" className="mb-4">
              Submit
            </ButtonCstm>
            <h6 className="mb-2">Connect with Us</h6>
            <div className="d-flex ">
              <img
                src={facebook}
                alt=""
                className="mr-2"
                style={{ width: "30px" }}
              />
              <img
                src={twitter}
                alt=""
                className="mr-2"
                style={{ width: "30px" }}
              />
              <img
                src={instagram}
                alt=""
                className="mr-2"
                style={{ width: "30px" }}
              />
              <img
                src={linkedin}
                alt=""
                className="mr-2"
                style={{ width: "30px" }}
              />
            </div>
          </div>
        </div>

        {/* Section 2 */}
        <div className="d-flex col-12 justify-content-center ">
          <p style={{ fontSize: "15px", color: "#A1A1A8" }}>
            © 2020 Mom Story All Rights Reserved
          </p>
        </div>
      </div>
    );
  }
}

export default Footer;
