import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import {
  faChalkboardTeacher,
  faNewspaper,
  faClock,
  faUsers,
  faQuoteRight,
  faArrowCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image1 from "../../../assets/images/Background.jpg";

class Home extends React.Component {
  state = {
    parentTesti: [1, 2, 3, 4],
    mission: [
      {
        text:
          "Far far away, behind the word mountains, far from the countries Vokalia.",
        icon: faChalkboardTeacher,
      },
      {
        text:
          "Far far away, behind the word mountains, far from the countries Vokalia.",
        icon: faNewspaper,
      },
      {
        text:
          "Far far away, behind the word mountains, far from the countries Vokalia.",
        icon: faClock,
      },
      {
        text:
          "Far far away, behind the word mountains, far from the countries Vokalia.",
        icon: faUsers,
      },
    ],
    reason: [
      {
        text:
          "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.",
        color: "#5c54c4",
      },
      {
        text:
          "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.",
        color: "#f34840",
      },
      {
        text:
          "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.",
        color: "#fba43c",
      },
      {
        text:
          "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.",
        color: "#8cc454",
      },
    ],
  };

  renderParentTestimonials = () => {
    return this.state.parentTesti.map((value) => {
      return (
        <div className="d-flex p-4">
          <div className="d-flex flex-column justify-content-center align-items-center">
            <img
              src="https://images.squarespace-cdn.com/content/v1/592738c58419c2fe84fbdb81/1518947776773-2JBWGO8LC1QIZOED5DPN/ke17ZwdGBToddI8pDm48kJUlZr2Ql5GtSKWrQpjur5t7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1UfNdxJhjhuaNor070w_QAc94zjGLGXCa1tSmDVMXf8RUVhMJRmnnhuU1v2M8fLFyJw/DwayneBrownStudio_Tamara_Student_OttawaLinkedIn_Portraits.jpg"
              alt=""
              style={{ height: "150px", borderRadius: "50%" }}
            />
            <p className="text-center mt-2" style={{ fontSize: "14px" }}>
              Blair Smith
            </p>
            <p
              className="text-center"
              style={{ fontSize: "14px", color: "#1facf4" }}
            >
              Mother
            </p>
          </div>
          <div className="ml-3 text-justify" style={{ opacity: "90%" }}>
            <FontAwesomeIcon
              icon={faQuoteRight}
              className="mb-2"
              style={{ color: "#8cc454", fontSize: "35px" }}
            />
            <p>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
              commodo ligula eget dolor. Aenean massa. Cum sociis natoque
              penatibus et magnis dis parturient montes.
            </p>
          </div>
        </div>
      );
    });
  };

  renderMission = () => {
    return this.state.mission.map((value) => {
      return (
        <div className="d-flex col-6 justify-content-start align-items-center mb-3">
          <div className="d-flex bg-circle justify-content-center align-items-center  ">
            <FontAwesomeIcon
              icon={value.icon}
              style={{ color: "white", fontSize: "40px" }}
            />
          </div>
          <p className="col-8 ml-2" style={{ opacity: "90%" }}>
            {value.text}
          </p>
        </div>
      );
    });
  };

  renderReason = () => {
    return this.state.reason.map((value, index) => {
      return (
        <div className="d-flex mb-3 justify-content-start align-items-center">
          <h1 className="col-1" style={{ color: value.color }}>
            {index + 1}
          </h1>
          <p className="ml-3 text-justify">{value.text}</p>
        </div>
      );
    });
  };

  render() {
    // Ini untuk slider bawaan react
    const settings = {
      dots: true,
      arrows: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };

    return (
      <div className="d-flex flex-column">
        {/* Section 1 */}
        <div className="d-flex flex-column flex-xl-row justify-content-around align-items-center">
          {/* Card */}
          <div
            className="d-flex flex-column justify-content-center p-4 col-8 col-sm-6 col-xl-4"
            style={{
              height: "60%",
              background: "#fc8454",
              color: "white",
            }}
          >
            <h3>Book an Appointment with Our Therapist</h3>
            <p className="mb-5">
              Use our service to find the best therapist for your children
            </p>
            <Link className="d-flex align-items-center card-link">
              <p>More info &nbsp;</p>
              <FontAwesomeIcon
                icon={faArrowCircleRight}
                style={{ fontSize: "20px" }}
              />
            </Link>
          </div>
          {/* Image */}
          <div className="d-none d-md-flex col-sm-3 col-md-4 col-xl-6 align-items-center">
            <img
              src={Image1}
              alt="Kid image"
              className=""
              style={{ width: "100%" }}
            />
          </div>
        </div>
        {/* Section 2 */}
        <div className="d-flex" style={{ height: "160px", color: "white" }}>
          <div
            className="col-4 d-flex flex-column justify-content-center align-items-center"
            style={{ background: "#fc8454" }}
          >
            <h5 className="mt-2">Certified Therapist</h5>
            <p className="text-center mb-2">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
              commodo ligula eget dolor. Aenean massa.
            </p>
          </div>
          <div
            className="col-4 d-flex flex-column justify-content-center align-items-center"
            style={{ background: "#f4cc3c" }}
          >
            <h5 className="mt-2">Trusted School and Clinic</h5>
            <p className="text-center mb-2">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
              commodo ligula eget dolor. Aenean massa.
            </p>
          </div>
          <div
            className="col-4 d-flex flex-column justify-content-center align-items-center"
            style={{ background: "#84c4d4" }}
          >
            <h5 className="mt-2">Accurate Information</h5>
            <p className="text-center mb-2">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
              commodo ligula eget dolor. Aenean massa.
            </p>
          </div>
        </div>
        {/* Section 3 */}
        <div
          id="about"
          className="d-flex justify-content-start align-items-start p-5"
        >
          <div className="d-flex col-7 flex-column justify-content-start">
            <h3 className="mb-3">About Us</h3>
            <p className="text-justify mb-3" style={{ opacity: "90%" }}>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
              commodo ligula eget dolor. Aenean massa. Cum sociis natoque
              penatibus et magnis dis parturient montes, nascetur ridiculus mus.
              Donec quam felis, ultricies nec, pellentesque eu, pretium quis,
              sem. Nulla consequat massa quis enim. Donec pede justo, fringilla
              vel, aliquet nec, vulputate eget, arcu.
            </p>
            {/* Mission */}
            <h3 className="mb-3">Our Mission</h3>
            <div className="d-flex flex-wrap justify-content-center align-items-center">
              {this.renderMission()}
            </div>
          </div>
          {/* Why us */}
          <div className="d-flex col-5 flex-column">
            <h3 className="mb-3">Why Us?</h3>
            {this.renderReason()}
          </div>
        </div>
        {/* Section 4 */}
        <div
          className="d-flex flex-column justify-content-center align-items-center p-5"
          style={{ background: "#F2F2F2" }}
        >
          <h2 className="mb-3">
            <span style={{ color: "#7209b7" }}>What Parents </span>
            <span style={{ color: "#f77f00" }}>Says About Us</span>
          </h2>
          <p className="col-8 text-center mb-3" style={{ opacity: "90%" }}>
            On her way she met a copy. The copy warned the Little Blind Text,
            that where it came from it would have been rewritten a thousand
            times.
          </p>
          <div className="d-flex col-8 flex-column">
            <Slider {...settings}>{this.renderParentTestimonials()}</Slider>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
