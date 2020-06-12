import React from "react";
import Axios from "axios";
import { API_URL } from "../../../constants/API";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class TherapistDetail extends React.Component {
  state = {
    therapistDetailObj: {},
    therapistDetailArr: [],
    categories: [],
    therapistReviews: [],
    startDate: new Date(),
    avgRating: 0,
  };

  getTherapistDetail = () => {
    Axios.get(`${API_URL}/therapistdetails?_expand=user&_expand=clinic`, {
      params: {
        id: this.props.match.params.id,
        _embed: "therapistcategories",
      },
    })
      .then((res) => {
        console.log(res.data[0]);
        this.setState({
          therapistDetailObj: res.data[0],
          therapistDetailArr: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getTherapistCategories = () => {
    Axios.get(`${API_URL}/therapistcategories`, {
      params: {
        _expand: "category",
        therapistdetailId: this.props.match.params.id,
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

  getTherapistReviews = () => {
    Axios.get(`${API_URL}/therapistreviews`, {
      params: {
        therapistdetailId: this.props.match.params.id,
        _expand: "user",
      },
    })
      .then((res) => {
        console.log(res.data);
        this.setState({ therapistReviews: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  renderTherapistCategories = () => {
    return this.state.categories.map((value) => {
      return (
        <div
          className="d-flex rounded col-6 col-md-2 mr-2 justify-content-center"
          style={{
            background: "#84c4d4",
            color: "white",
            border: "1px solid #84c4d4",
          }}
        >
          {value.category.categoryName}
        </div>
      );
    });
  };

  renderTherapistReviews = () => {
    var rating = 0;
    var avgRating = 0;
    var review = this.state.therapistReviews.length;

    return this.state.therapistReviews.map((value) => {
      return (
        <div className="d-flex align-items-start mb-4">
          <FontAwesomeIcon
            icon={faThumbsUp}
            style={{ color: "#84c4d4", fontSize: "25px" }}
            className="mr-3"
          />
          {/* Comment details */}
          <div className="d-flex flex-column">
            <h6 className="mb-0">{value.user.name}</h6>
            <p className="mb-2" style={{ fontSize: "10px" }}>
              {value.reviewdate}
            </p>
            <p className="text-justify" style={{ fontSize: "15px" }}>
              {value.comment}
            </p>
          </div>
        </div>
      );
    });
  };

  calculateAverageRating = () => {
    var rating = 0;
    var avgRating = 0;
    var review = this.state.therapistReviews.length;

    this.state.therapistReviews.map((value) => {
      rating += value.rating;
      return rating;
    });

    avgRating = rating / review;

    if (this.state.therapistReviews.length == 0) {
      return <>0</>;
    }
    return <>{avgRating.toFixed(1)}</>;
  };

  handleChange = (date) => {
    this.setState({
      startDate: date,
    });
  };

  componentDidMount() {
    this.getTherapistDetail();
    this.getTherapistCategories();
    this.getTherapistReviews();
  }

  renderTherapistName = () => {
    return this.state.therapistDetailArr.map((value) => {
      return <h5>{value.user.name}</h5>;
    });
  };

  renderTherapistDetail = () => {
    return this.state.therapistDetailArr.map((value) => {
      return (
        <>
          {/* Section 1 */}
          <div className="d-flex flex-column flex-lg-row justify-content-center align-items-center p-4">
            {/* Section 1 - Image */}
            <div className="d-flex justify-content-center col-3">
              <img
                src={value.user.image}
                style={{ width: "100%" }}
                className="rounded"
              />
            </div>
            {/* Section 1 - Therapist Details*/}
            <div className="d-flex flex-column col-6">
              {/* Name, title and rating */}
              <div className="row mb-4">
                {/* Name and title */}
                <div className="d-flex col-12 col-lg-6 flex-column">
                  <h5 className="mb-0">{value.user.name}</h5>
                  <p className="" style={{ fontSize: "17px" }}>
                    {value.jobdesc}
                  </p>
                </div>
                {/* Rating */}
                <div className="d-flex align-items-end col-12 col-lg-6 flex-column">
                  {/* Star */}
                  <div className="d-flex">
                    <FontAwesomeIcon
                      icon={faStar}
                      style={{ color: "#f4cc3c", fontSize: "25px" }}
                    />
                    <h5 className="ml-1">{this.calculateAverageRating()}</h5>
                  </div>
                  {/* Users */}
                  <p style={{ fontSize: "14px" }}>
                    {this.state.therapistReviews.length} reviews
                  </p>
                </div>
              </div>
              <p className="">
                Clinic:{" "}
                <span style={{ color: "#fc8454" }}>
                  {value.clinic.clinicName}
                </span>
              </p>
              <p className="mb-4">
                Service Fee:{" "}
                <span style={{ color: "#fc8454" }}>
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(value.servicefee)}
                </span>
              </p>
              <p className="text-justify mb-4">{value.about}</p>
              <div className="d-flex flex-wrap">
                {this.renderTherapistCategories()}
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div className="d-flex flex-column flex-lg-row justify-content-center p-4">
            {/* Section 2 - Reviews */}
            <div className="d-flex flex-column col-4 ">
              <h5
                className="d-flex align-items-center mb-4"
                style={{ color: "#fc8454" }}
              >
                &bull; Review &bull;
              </h5>
              {this.renderTherapistReviews()}
            </div>
            {/* Section 2 - Therapist Details*/}
            <div className="d-flex flex-column col-5 border">
              <h5
                className="d-flex align-items-center border mb-0"
                style={{ color: "#fc8454" }}
              >
                &bull; Service Schedule &bull;
              </h5>
              {/* <DatePicker
                selected={this.state.startDate}
                onChange={this.handleChange}
              /> */}
            </div>
          </div>
        </>
      );
    });
  };

  render() {
    const {
      id,
      user,
      jobdesc,
      clinic,
      experience,
      servicefee,
    } = this.state.therapistDetailObj;

    return (
      <>
        {/* Section 1 */}
        <div
          className="d-flex justify-content-start col-12 p-4 therapist-body"
          style={{ background: "#fc8454" }}
        >
          {this.renderTherapistName()}
          {/* {user.name} */}
        </div>
        {/* Section 2 */}
        {this.renderTherapistDetail()}
      </>
    );
  }
}

export default TherapistDetail;
