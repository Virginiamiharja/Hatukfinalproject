import React from "react";
import "./Therapist.css";
import ButtonCstm from "../../components/button/Button";
import { Form, Col, FormGroup, Label, Input, CustomInput } from "reactstrap";
import Axios from "axios";
import { API_URL } from "../../../constants/API";
import TherapistCard from "../../components/therapistcard/TherapistCard";

class Therapist extends React.Component {
  state = {
    cities: [],
    days: [],
    hours: [],
    therapistdetails: [],
    value: "",
  };

  getCities = () => {
    Axios.get(`${API_URL}/cities`)
      .then((res) => {
        this.setState({ cities: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getDays = () => {
    Axios.get(`${API_URL}/days`)
      .then((res) => {
        console.log(res.data);
        this.setState({ days: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getHours = () => {
    Axios.get(`${API_URL}/workinghours`)
      .then((res) => {
        console.log(res.data);
        this.setState({ hours: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  renderCity = () => {
    const { cities } = this.state;
    return cities.map((value) => {
      return (
        <>
          <FormGroup check className="mb-3">
            <Label check>
              <Input type="radio" name="radio1" />
              {value.cityName}
            </Label>
          </FormGroup>
        </>
      );
    });
  };

  renderDays = () => {
    const { days } = this.state;
    return days.map((value) => {
      return (
        <>
          <option>{value.day}</option>
        </>
      );
    });
  };

  showHour = () => {
    const { hours } = this.state;
    return hours.map((value) => {
      if (this.state.value == value.id) return <>{value.hour}</>;
    });
  };

  getTherapistDetails = () => {
    Axios.get(`${API_URL}/therapistdetails?_expand=user&_expand=clinic`, {
      params: {
        _embed: "therapistcategories",
      },
    })
      .then((res) => {
        console.log(res.data);
        this.setState({ therapistdetails: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  renderTherapistCard = () => {
    return this.state.therapistdetails.map((value) => {
      return <TherapistCard therapistdetails={value} />;
    });
  };

  componentDidMount() {
    this.getCities();
    this.getDays();
    this.getHours();
    this.getTherapistDetails();
  }

  render() {
    return (
      <>
        {/* Section 1 */}
        <div
          className="d-flex flex-column flex-lg-row justify-content-center align-items-center col-12 p-4 therapist-body"
          style={{ background: "#84c4d4" }}
        >
          {/* Image */}
          <div className="d-flex justify-content-center col-6">
            <img
              src="http://pngimg.com/uploads/teddy_bear/teddy_bear_PNG142.png"
              alt=""
              style={{ width: "60%" }}
            />
          </div>
          {/* Words */}
          <div className="d-flex justify-content-center flex-column col-6">
            <h4>&bull; Meet our Partners &bull;</h4>
            <h1>
              Book an Appointment <br /> with Our Therapist
            </h1>
            <p className="mb-3">
              We are so happy you trust us your most precious thing! Our
              qualified therapist will take a good care of your child.{" "}
            </p>
            <ButtonCstm type="coral"> Book Now </ButtonCstm>
          </div>
        </div>
        {/* Section 2 */}
        <div className="d-flex justify-content-center col-12 border p-4">
          {/* Filter 1 */}
          {/* By City */}
          <div className="col-3">
            <h5 className="mb-3">Choose City</h5>
            <div className="mb-3 border"></div>
            {this.renderCity()}
          </div>
          {/* Filter and Content */}
          <div className="d-flex flex-column col-9">
            {/* Filter */}
            {/* Filter 2 - Days */}
            <FormGroup className="align-items-center border" row>
              {/* Filter 2 - Days */}
              <Col sm={4}>
                <Input type="select" name="select" id="exampleSelect">
                  <option disabled selected>
                    Choose Working Day
                  </option>
                  {this.renderDays()}
                </Input>
              </Col>
              {/* Filter 2 - Hour */}
              <Col sm={4}>
                <FormGroup>
                  <Label for="exampleCustomRange">
                    Service Hours: {this.showHour()}
                  </Label>
                  <CustomInput
                    type="range"
                    id="exampleCustomRange"
                    name="customRange"
                    min="0"
                    max="4"
                    onChange={(e) => {
                      this.setState({ value: e.target.value });
                    }}
                  />
                </FormGroup>
              </Col>
            </FormGroup>
            {/* Content */}
            <div className="d-flex flex-wrap align-items-around justify-content-around">
              {this.renderTherapistCard()}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Therapist;
