import React from "react";
import "./TherapistCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStethoscope,
  faHospital,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import ButtonCstm from "../button/Button";
import { Link } from "react-router-dom";

class TherapistCard extends React.Component {
  renderTherapistSpecialties = () => {
    const { specialties } = this.props.therapistDetails;
    return specialties.map((value) => {
      return <>{value.specialtyName}&nbsp;</>;
    });
  };

  calculateAverageRating = () => {
    var rating = 0;
    var avgRating = 0;
    var review = this.props.therapistDetails.reviews.length;

    this.props.therapistDetails.reviews.map((value) => {
      return (rating += value.rating);
    });

    avgRating = rating / review;

    if (this.props.therapistDetails.reviews.length == 0) return <>0</>;

    return <>{avgRating.toFixed(1)}</>;
  };

  render() {
    const {
      id,
      user,
      jobdesc,
      clinic,
      reviews,
      serviceFee,
    } = this.props.therapistDetails;
    return (
      <>
        <div className="d-flex flex-column flex-lg-row flex-wrap col-12 mt-4 border rounded p-3">
          {/* Section 1 - Profile Image */}
          <div className="d-flex flex-column justify-content-start align-items-center col-12 col-lg-3">
            <img
              src={user.image}
              className="rounded-circle"
              style={{ width: "80%" }}
            />
          </div>

          {/* Section 2 - Content */}
          <div className="flex-column col-12 col-lg-5">
            <h4 className="mb-0" style={{ color: "#fc8454" }}>
              {user.name}
            </h4>
            <p className="mb-3" style={{ fontSize: "17px" }}>
              {jobdesc}
            </p>
            {/* Clinic */}
            <div className="d-flex mb-1 flex-column flex-xl-row align-items-center">
              <FontAwesomeIcon
                icon={faHospital}
                style={{ fontSize: "15px", color: "#84c4d4" }}
              />
              <p className="ml-2" style={{ fontSize: "13px" }}>
                {clinic.clinicName}
              </p>
            </div>
            {/* Specialty */}
            <div className="d-flex flex-column flex-xl-row align-items-center">
              <FontAwesomeIcon
                icon={faStethoscope}
                style={{ fontSize: "15px", color: "#84c4d4" }}
              />
              <p className="ml-2" style={{ fontSize: "13px" }}>
                {this.renderTherapistSpecialties()}
              </p>
            </div>
          </div>

          {/* Section 3 - Rating & Fee */}
          <div className="d-flex align-items-end flex-column col-12 col-lg-4">
            {/* Star */}
            <div className="d-flex">
              <FontAwesomeIcon
                icon={faStar}
                style={{ color: "#f4cc3c", fontSize: "25px" }}
              />
              <h5 className="ml-1">{this.calculateAverageRating()}</h5>
            </div>
            {/* Users */}
            <p className="mb-3" style={{ fontSize: "14px" }}>
              {reviews.length} reviews
            </p>
            <p style={{ fontSize: "14px" }}>Service Fee</p>
            <p
              className="mb-4"
              style={{ fontSize: "12px", color: "#fc8454", fontWeight: "bold" }}
            >
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
              }).format(serviceFee)}
            </p>
            <div className="row justify-content-end col-10">
              <Link
                style={{ textDecoration: "none", color: "inherit" }}
                to={`/therapistdetail/${id}`}
              >
                <ButtonCstm>Book Now</ButtonCstm>
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default TherapistCard;
