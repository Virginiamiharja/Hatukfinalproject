import React from "react";
import "./TherapistCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStethoscope,
  faHospital,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import ButtonCstm from "../button/Button";
import Axios from "axios";
import { API_URL } from "../../../constants/API";
import { Link } from "react-router-dom";

class TherapistCard extends React.Component {
  state = {
    categories: [],
  };

  getTherapistCategories = () => {
    const { id } = this.props.therapistDetails;
    Axios.get(`${API_URL}/therapistcategories`, {
      params: {
        _expand: "category",
        therapistdetailId: id,
      },
    })
      .then((res) => {
        console.log(res.data);
        this.setState({ categories: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  renderTherapistCategories = () => {
    return this.state.categories.map((value) => {
      return <>{value.category.categoryName}&nbsp;</>;
    });
  };

  componentDidMount() {
    this.getTherapistCategories();
  }

  render() {
    const {
      id,
      user,
      jobdesc,
      clinic,
      experience,
      servicefee,
    } = this.props.therapistDetails;
    return (
      <>
        <div className="d-flex flex-row col-12 mb-3 p-3">
          {/* Section 1 - Profile Image */}
          <div className="d-flex flex-column justify-content-center align-items-center col-3">
            <img
              src={user.image}
              className="rounded"
              style={{ width: "95%" }}
            />
          </div>
          {/* Section 2 */}
          <div className="flex-column col-8">
            <h3 className="mb-0" style={{ color: "#fc8454" }}>
              {user.name}
            </h3>
            <p className="mb-4" style={{ fontSize: "17px" }}>
              {jobdesc}
            </p>
            {/* Experience */}
            <div className="row flex-column flex-xl-row align-items-center">
              <p
                className="col-xl-3"
                style={{ fontSize: "15px", fontWeight: "bold" }}
              >
                Experience
              </p>
              <p className="col-xl-9">{experience} years</p>
            </div>
            {/* Clinic */}
            <div className="row flex-column flex-xl-row align-items-center">
              <p
                className="col-xl-3"
                style={{ fontSize: "15px", fontWeight: "bold" }}
              >
                Clinic
              </p>
              <p className="col-xl-9">{clinic.clinicName}</p>
            </div>
            {/* Specialty */}
            <div className="row flex-column flex-xl-row align-items-center">
              <p
                className="col-xl-3"
                style={{ fontSize: "15px", fontWeight: "bold" }}
              >
                Specialty
              </p>
              <p className="col-xl-9"> {this.renderTherapistCategories()}</p>
            </div>
            {/* Service Fee */}
            <div className="row flex-column flex-xl-row align-items-center">
              <p
                className="col-xl-3"
                style={{ fontSize: "15px", fontWeight: "bold" }}
              >
                Service Fee
              </p>
              <p className="col-xl-9">
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(servicefee)}
              </p>
            </div>
            {/* Rating */}
            <div className="row flex-column flex-xl-row align-items-center mb-4">
              <p
                className="col-xl-3"
                style={{ fontSize: "15px", fontWeight: "bold" }}
              >
                Rating
              </p>
              <p className="col-xl-9">4.0 (10 users)</p>
            </div>
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
