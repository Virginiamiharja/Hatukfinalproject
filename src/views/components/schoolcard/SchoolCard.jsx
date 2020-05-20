import React from "react";
import "./SchoolCard.css";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";
import ButtonCstm from "../button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faPhone, faBook } from "@fortawesome/free-solid-svg-icons";

class SchoolCard extends React.Component {
  renderSchoolCategory = () => {
    return (
      <>
        <span
          class="badge badge-pill badge-info mt-2 mr-2"
          style={{ background: "#db3a34" }}
        >
          Autism
        </span>
        <span
          class="badge badge-pill badge-info mt-2 mr-2"
          style={{ background: "#db3a34" }}
        >
          ADHD
        </span>
        <span
          class="badge badge-pill badge-info mt-2 mr-2"
          style={{ background: "#db3a34" }}
        >
          Dyslexia
        </span>
      </>
    );
  };

  render() {
    return (
      <div className="m-3 shadow bg-white rounded">
        <Card style={{ border: "white" }}>
          <CardBody
            className="d-flex justify-content-center border-bottom"
            style={{ height: "200px" }}
          >
            {/* Image */}
            <div className="d-flex p-2 col-4 justify-content-center align-items-center">
              <img
                src="https://www.klinikpela9.com/wp-content/uploads/2017/11/Flyer-bintaro-menteng-thumbs.jpg"
                alt=""
                style={{ height: "100%", borderRadius: "5%" }}
              />
            </div>
            {/* Category, Name, Location */}
            <div className="d-flex flex-wrap flex-column col-4">
              <div className="d-flex flex-wrap">
                {this.renderSchoolCategory()}
              </div>
              <h6 className="mt-2">SLB B/C Harapan Ibu</h6>
              <p style={{ fontSize: "12px" }}>Kebayoran, Jakarta Selatan</p>
            </div>
            {/* Rating */}
            <div className="d-flex flex-column justify-content-start align-items-end col-3">
              {/* Star */}
              <div className="d-flex">
                <FontAwesomeIcon
                  icon={faStar}
                  style={{ color: "#ffbe0b", fontSize: "25px" }}
                />
                <p className="ml-1">4.5</p>
              </div>
              {/* Users */}
              <p style={{ fontSize: "12px", opacity: "80%" }} className="mt-1">
                500 users
              </p>
            </div>
          </CardBody>
          <CardBody>
            <CardText className="text-justify" style={{ width: "500px" }}>
              Klinik Terpadu Tumbuh Kembang Anak dan Remaja Pela 9 (Klinik Pela
              9) didirikan pada tahun 2000 atas prakarsa Dr. Iramaswaty Kamarul,
              Sp.A(K), dokter spesialis Anak sub-spesialis Nerologi Anak dengan
              tujuan membantu keluarga dengan anak yang mengalami hambatan atau
              gangguan tumbuh kembang.
            </CardText>
          </CardBody>
          {/* Ini masih jelek banget nanti benerin */}
          <CardBody className="d-flex border-top">
            <div className="text-center col-6 border-right">
              <FontAwesomeIcon
                icon={faPhone}
                style={{ color: "#7209b7", fontSize: "20px" }}
              />
            </div>
            <div className="text-center col-6">
              <FontAwesomeIcon
                icon={faBook}
                style={{ color: "#7209b7", fontSize: "20px" }}
              />
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default SchoolCard;
