import React from "react";
import "./Therapist.css";
import ButtonCstm from "../../components/button/Button";
import {
  FormGroup,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faFilter,
  faSort,
  faArrowAltCircleRight,
  faArrowAltCircleLeft,
} from "@fortawesome/free-solid-svg-icons";
import Axios from "axios";
import { API_URL1 } from "../../../constants/API";
import TherapistCard from "../../components/therapistcard/TherapistCard";

class Therapist extends React.Component {
  state = {
    days: [],
    specialties: [],
    therapistDetails: [],
    searchInput: "",
    dayFilter: "",
    specialtyFilter: "",
    offset: 0,
    type: "",
  };

  // Sorting dari front end
  // changeSort = (event) => {
  //   const { value } = event.target;
  //   let newArr = [];

  //   if (value == "priceasc") {
  //     newArr = this.state.therapistDetails.sort((a, b) => {
  //       return a.serviceFee - b.serviceFee;
  //     });
  //     this.setState({ therapistDetails: newArr });
  //   } else if (value == "pricedesc") {
  //     newArr = this.state.therapistDetails.sort((a, b) => {
  //       return b.serviceFee - a.serviceFee;
  //     });
  //     this.setState({ therapistDetails: newArr });
  //   }
  // };

  // Sorting dari back end
  changeSort = (event) => {
    const { value } = event.target;
    this.setState({ type: value });
    this.getTherapistDetails(this.state.offset, value);
  };

  changeDay = (event) => {
    const { value } = event.target;
    this.setState({ dayFilter: value });
  };

  SearchTherapist = (event) => {
    const { value } = event.target;
    this.setState({ searchInput: value });
  };

  dayFilter = (event) => {
    const { value } = event.target;
    this.setState({ cityFilter: value });
  };

  specialtyFilter = (event) => {
    const { value } = event.target;
    this.setState({ specialtyFilter: value });
  };

  getDays = () => {
    Axios.get(`${API_URL1}/days`)
      .then((res) => {
        this.setState({ days: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getSpecialties = () => {
    Axios.get(`${API_URL1}/specialties`)
      .then((res) => {
        this.setState({ specialties: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  renderDays = () => {
    const { days } = this.state;
    return days.map((value) => {
      return (
        <>
          <option value={value.dayName}>{value.dayName}</option>
        </>
      );
    });
  };

  renderSpecialty = () => {
    const { specialties } = this.state;
    return specialties.map((value) => {
      return (
        <>
          <FormGroup check className="mt-3">
            <Label check>
              <Input
                type="radio"
                name="radio1"
                onChange={(e) => {
                  this.specialtyFilter(e);
                }}
                value={value.specialtyName}
              />
              {value.specialtyName}
            </Label>
          </FormGroup>
        </>
      );
    });
  };

  getTherapistDetails = (offset = 0, sortType = "ratingdesc") => {
    Axios.get(`${API_URL1}/therapistdetails`, {
      params: {
        sortType,
        offset: offset,
      },
    })
      .then((res) => {
        console.log(res.data);
        this.setState({ therapistDetails: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  renderTherapistCard = () => {
    return this.state.therapistDetails.map((value) => {
      if (
        value.user.name
          .toLowerCase()
          .includes(this.state.searchInput.toLowerCase()) &&
        value.specialties.find((val) => {
          return val.specialtyName.includes(this.state.specialtyFilter);
        }) &&
        value.therapistServiceSchedules.find((val) => {
          return val.day.dayName.includes(this.state.dayFilter);
        })
      )
        return <TherapistCard therapistDetails={value} />;
    });
  };

  componentDidMount() {
    this.getDays();
    this.getSpecialties();
    this.getTherapistDetails();
  }

  renderPagination = () => {
    return (
      <div className="d-flex p-0 mt-4 flex-wrap justify-content-between">
        <div className="d-flex p-0" onClick={() => this.pagination("prev")}>
          {/* {this.state.offset == 0 ? null : ( */}
          <FontAwesomeIcon
            icon={faArrowAltCircleLeft}
            style={{ color: "#fc8454", fontSize: "35px" }}
          />
          {/* )} */}
        </div>
        <div className="d-flex p-0" onClick={() => this.pagination("next")}>
          {/* Masih bingung nih validasinya */}
          {/* Karena kita limitnya 2 makanya dikali 2 */}
          {/* {this.state.offset * 2 < this.state.therapistDetail.reviews.length ? ( */}
          <FontAwesomeIcon
            icon={faArrowAltCircleRight}
            style={{ color: "#fc8454", fontSize: "35px" }}
          />
          {/* ) : null} */}
        </div>
      </div>
    );
  };

  pagination = (type) => {
    let offset = this.state.offset;
    if (type == "next") {
      offset += 3;
      this.setState({ offset: offset });
    } else if (type == "prev") {
      offset -= 3;
      this.setState({ offset: offset });
    }
    this.getTherapistDetails(offset, this.state.type);
  };

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
            <h4>&bull; Meet our Therapist &bull;</h4>
            <h1>
              Book an Appointment <br /> with Our Therapist
            </h1>
            <p className="mb-3">
              We are so happy you trust us your most precious thing! Our
              qualified <br /> therapist will take a good care of your child.{" "}
            </p>
            <ButtonCstm type="coral"> Book Now </ButtonCstm>
          </div>
        </div>

        {/* Section 2 */}
        <div className="d-flex justify-content-center col-12 p-4">
          {/* Filter 1 */}
          <div className="col-3 mr-4">
            {/* By Specialty */}
            <div className="d-flex flex-column">
              <h5 className="mb-3 border-bottom pt-0 pr-3 pb-3 col-10  d-flex">
                Choose Specialty
              </h5>
              <div className="pb-3 pr-3 pl-3">
                <FormGroup check className="">
                  <Label check>
                    <Input
                      type="radio"
                      name="radio1"
                      onChange={(e) => {
                        this.specialtyFilter(e);
                      }}
                      value=""
                    />
                    All Specialty
                  </Label>
                </FormGroup>
                {this.renderSpecialty()}
              </div>
            </div>
          </div>

          {/* Filter and Content */}
          <div className="d-flex p-0 flex-column col-7">
            {/* Filter */}
            {/* Filter 2 */}
            {/* Search */}
            <FormGroup className="align-items-center d-flex p-0 mb-0">
              {/* Search box */}
              {/* <InputGroup className="mr-4" style={{ width: "350px" }}>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText
                    style={{ background: "#fc8454", border: "white" }}
                  >
                    <FontAwesomeIcon
                      icon={faSearch}
                      style={{ color: "white" }}
                    />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="Find therapist!"
                  style={{ background: "#f2f2f2", border: "white" }}
                  onChange={(e) => {
                    this.SearchTherapist(e);
                  }}
                />
              </InputGroup> */}
              {/* Sort */}
              <InputGroup className="mr-4" style={{ width: "180px" }}>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText
                    style={{ background: "#fc8454", border: "white" }}
                  >
                    <FontAwesomeIcon icon={faSort} style={{ color: "white" }} />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  type="select"
                  name="select"
                  id="exampleSelect"
                  style={{ background: "#f2f2f2", border: "white" }}
                  onChange={(e) => {
                    this.changeSort(e);
                  }}
                >
                  <option>Sort by..</option>
                  <option value="ratingdesc">Highest Rating</option>
                  <option value="ratingasc">Lowest Rating</option>
                  <option value="pricedesc">Highest Price</option>
                  <option value="priceasc">Lowest Price</option>
                </Input>
              </InputGroup>
              {/* Day */}
              <InputGroup style={{ width: "180px" }}>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText
                    style={{ background: "#fc8454", border: "white" }}
                  >
                    <FontAwesomeIcon
                      icon={faFilter}
                      style={{ color: "white" }}
                    />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  type="select"
                  name="select"
                  id="exampleSelect"
                  style={{ background: "#f2f2f2", border: "white" }}
                  onChange={(e) => {
                    this.changeDay(e);
                  }}
                >
                  <option value="">Filter day..</option>
                  {this.renderDays()}
                </Input>
              </InputGroup>
            </FormGroup>

            {/* Content */}
            <div className="d-flex p-0 flex-wrap">
              {this.renderTherapistCard()}
            </div>

            {/* Pagination */}
            {this.renderPagination()}
          </div>
        </div>
      </>
    );
  }
}

export default Therapist;
