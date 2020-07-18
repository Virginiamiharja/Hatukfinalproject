import React from "react";
import Axios from "axios";
import { API_URL1 } from "../../../constants/API";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Therapist.css";
import {
  faStar,
  faThumbsUp,
  faChevronDown,
  faChevronUp,
  faSun,
  faClock,
  faArrowAltCircleRight,
  faArrowAltCircleLeft,
} from "@fortawesome/free-solid-svg-icons";
import "react-datepicker/dist/react-datepicker.css";
import "react-calendar/dist/Calendar.css";
import ButtonCstm from "../../components/button/Button";
import { connect } from "react-redux";
import swal from "sweetalert";
import TitleBar from "../../components/titlebar/TitleBar";
import { Modal, ModalBody } from "reactstrap";
import { priceFormatter } from "../../../supports/helpers/formatter";
import { Input } from "reactstrap";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

class TherapistDetail extends React.Component {
  state = {
    month: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ],

    therapistDetail: {
      id: 0,
      user: {
        id: 0,
        name: "",
        username: "",
        email: "",
        password: "",
        phoneNumber: "",
        image: "",
        role: "",
        city: {
          id: 0,
          cityName: "",
        },
        subdistrict: "",
        area: "",
        rt: "",
        rw: "",
        address: "",
      },
      jobdesc: "",
      clinic: {
        id: 0,
        clinicName: "",
      },
      experience: "",
      serviceFee: "",
      about: "",
      reviews: [
        {
          id: 0,
          user: {
            name: "",
          },
          comment: "",
          rating: 0,
          postedDate: "",
        },
      ],
      specialties: [
        {
          id: 0,
          specialtyName: "",
        },
      ],
      therapistServiceSchedules: [
        {
          id: 0,
          day: {
            id: 0,
            dayName: "",
          },
          hour: {
            id: 0,
            hour: "",
          },
          isbooked: 0,
          requests: [{ id: 0, serviceDate: "", status: "" }],
        },
      ],
    },

    bookingRequest: {
      id: 0,
      day: {
        id: 0,
        dayName: "",
      },
      hour: {
        id: 0,
        hour: "",
      },
      status: "pending",
      serviceDate: new Date(),
    },

    transaction: {
      id: 0,
      reason: "",
      status: "waiting for payment",
      totalPrice: 0,
      image: "",
    },

    therapistReviews: [],
    arrBookRequest: [],
    weekSchedule: [],
    meetingQty: 1,
    formOpen: false,
    isOpenDaily: false,
    discCode: "",
    discPrice: 0,
    offset: 0,
  };

  getTherapistDetail = () => {
    Axios.get(
      `${API_URL1}/therapistdetails/${this.props.match.params.therapistId}`
    )
      .then((res) => {
        console.log(res.data);
        this.setState({ therapistDetail: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  renderTherapistSpecialties = () => {
    return this.state.therapistDetail.specialties.map((value) => {
      return (
        <div
          className="d-flex rounded col-6 col-md-2 mr-2 justify-content-center"
          style={{
            background: "#84c4d4",
            color: "white",
            border: "1px solid #84c4d4",
          }}
        >
          {value.specialtyName}
        </div>
      );
    });
  };

  renderTherapistReviews = () => {
    // return this.state.therapistDetail.reviews.map((value) => {
    return this.state.therapistReviews.map((value) => {
      return (
        <div className="d-flex align-items-start mt-4">
          <FontAwesomeIcon
            icon={faThumbsUp}
            style={{ color: "#84c4d4", fontSize: "30px" }}
            className="mr-3"
          />
          {/* Comment details */}
          <div className="d-flex flex-column">
            <h6 className="mb-0">{value.user.name}</h6>
            <p className="mb-2" style={{ fontSize: "10px" }}>
              {value.postedDate}
            </p>
            <p className="text-justify" style={{ fontSize: "15px" }}>
              {value.comment}
            </p>
          </div>
        </div>
      );
    });
  };

  renderDaysInMonth = () => {
    var date = new Date();
    // Array 1 minggu dari sekarang
    var week = [];

    for (var i = 0; i < 7; i++) {
      // Ini biar dia nambah 1 hari trs sampe hari ketujuh
      var result = date.setTime(date.getTime() + 1 * 24 * 60 * 60 * 1000);
      var newDate = new Date(result);
      week.push(newDate);
    }

    this.setState({
      weekSchedule: week,
    });
  };

  renderSchedules = () => {
    return this.state.weekSchedule.map((value) => {
      const { therapistServiceSchedules } = this.state.therapistDetail;

      return therapistServiceSchedules.map((val, index) => {
        if (value.getDay() == val.day.id)
          return (
            <>
              <div className="d-flex p-2 rounded align-items-center  flex-column flex-xl-row border mt-4">
                <h6 className="m-0">
                  {val.day.dayName}, {value.getDate()}{" "}
                  {this.state.month[value.getMonth()]} {value.getFullYear()}
                </h6>
              </div>
              <div className="border-bottom border-right pb-3 pr-3 pl-3 border-left">
                <div className="mt-3 align-items-center d-flex">
                  <FontAwesomeIcon
                    icon={faSun}
                    style={{ color: "#f4cc3c", fontSize: "20px" }}
                  />
                  <p className="col-9">{val.hour.hour}</p>
                  {/* {val.isbooked ? null : ( */}
                  <ButtonCstm
                    onClick={
                      // () => this.send(val.id, value)
                      () => this.confirmationButton(index, value)
                    }
                  >
                    Book Now
                  </ButtonCstm>
                  {/* )} */}
                </div>
              </div>
            </>
          );
      });
    });
  };

  calculateAverageRating = () => {
    var rating = 0;
    var avgRating = 0;
    var review = this.state.therapistDetail.reviews.length;

    this.state.therapistDetail.reviews.map((value) => {
      return (rating += value.rating);
    });

    avgRating = rating / review;

    if (this.state.therapistDetail.reviews.length == 0) return <>0</>;

    return <>{avgRating.toFixed(1)}</>;
  };

  componentDidMount() {
    this.getTherapistDetail();
    this.renderDaysInMonth();
    this.getTherapistReviews();
  }

  toggleDaily = () => {
    this.setState({ isOpenDaily: !this.state.isOpenDaily });
  };

  send = (scheduleId) => {
    Axios.post(
      `${API_URL1}/transactions/add`,
      { ...this.state.transaction, totalPrice: this.totalAmount() },
      {
        params: {
          userId: this.props.user.id,
          therapistId: this.state.therapistDetail.id,
          scheduleId: scheduleId,
        },
      }
    )
      .then((res) => {
        console.log(res.data);

        return this.state.arrBookRequest.map((value) => {
          Axios.post(
            `${API_URL1}/requests/bookschedule`,
            { serviceDate: value },
            {
              params: {
                transactionId: res.data.id,
                userId: this.props.user.id,
                scheduleId: scheduleId,
              },
            }
          )
            .then((res) => {
              console.log(res.data);
              this.setState({ formOpen: false });
              swal("Congrats!", "We have placed your booking", "success");
            })
            .catch((err) => {
              console.log(err);
            });
        });
      })
      .catch((err) => {
        console.log(err);
      });

    // return this.state.arrBookRequest.map((value) => {
    //   Axios.post(
    //     `${API_URL1}/requests/bookschedule`,
    //     { serviceDate: value },
    //     {
    //       params: {
    //         userId: this.props.user.id,
    //         scheduleId: scheduleId,
    //       },
    //     }
    //   )
    //     .then((res) => {
    //       console.log(res.data);
    //       this.setState({ formOpen: false });
    //       swal("Congrats!", "We have placed your booking", "success");
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // });
  };

  toggleModal = () => {
    this.setState({ formOpen: !this.state.formOpen, meetingQty: 0 });
  };

  confirmationButton = (idx, value) => {
    var now = new Date();

    if (this.props.user.id && this.props.user.verified) {
      this.setState({
        bookingRequest: {
          ...this.state.therapistDetail.therapistServiceSchedules[idx],
          serviceDate: value,
          createdAt: now,
        },
        formOpen: true,
      });
    } else if (!this.props.user.id) {
      swal(
        "Oops, sorry!",
        "You cannot book this therapist before login!",
        "info"
      );
    } else if (!this.props.user.verified) {
      swal(
        "Oops, sorry!",
        "You cannot book this therapist before verifying your account!",
        "info"
      );
    }
  };

  totalAmount = () => {
    let result =
      this.state.therapistDetail.serviceFee * this.state.meetingQty -
      this.state.discPrice;
    return result;
  };

  discCode = (event) => {
    const { value } = event.target;
    this.setState({ discCode: value });
  };

  useCode = () => {
    let discCode = "missqueen";
    if (this.state.discCode == discCode) {
      this.setState({ discPrice: 50000 });
    } else {
      swal("Oops!", "The promotion code is not valid", "error");
    }
  };

  changePeriod = (event) => {
    const { value } = event.target;
    this.setState({ meetingQty: value });

    let date = new Date(this.state.bookingRequest.serviceDate);
    // Kalo pake yang ini doang datenya ancur
    // let date = this.state.confirmationForm.serviceDate;
    let arrDate = [this.state.bookingRequest.serviceDate];

    for (var i = 1; i < value; i++) {
      arrDate.push(date);
      var result = date.setTime(date.getTime() + 7 * 24 * 60 * 60 * 1000);
      date = new Date(result);
    }

    console.log("ini arr date" + arrDate);
    this.setState({ arrBookRequest: arrDate });
    console.log("ini book request" + this.state.arrBookRequest);
  };

  renderUserSchedule = () => {
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];

    let date = new Date(this.state.bookingRequest.serviceDate);
    // Kalo pake yang ini doang datenya ancur
    // let date = this.state.confirmationForm.serviceDate;
    let arrDate = [this.state.bookingRequest.serviceDate];

    for (var i = 1; i < this.state.meetingQty; i++) {
      arrDate.push(date);
      var result = date.setTime(date.getTime() + 7 * 24 * 60 * 60 * 1000);
      date = new Date(result);
    }

    return this.state.arrBookRequest.map((value) => {
      return (
        <div>
          <p>
            {days[value.getDay()]}, {value.getDate()}{" "}
            {this.state.month[value.getMonth()]} {value.getFullYear()}
          </p>
        </div>
      );
    });
  };

  getTherapistReviews = (offset = 0) => {
    Axios.get(`${API_URL1}/reviews`, {
      params: {
        therapistId: this.props.match.params.therapistId,
        offset: offset,
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

  pagination = (type) => {
    let offset = this.state.offset;
    if (type == "next") {
      offset += 2;
      // Bingung deh kenapa gabisa langsung di setStatenya aja offset : this.state.offset+2
      this.setState({ offset: offset });
    } else if (type == "prev") {
      offset -= 2;
      this.setState({ offset: offset });
    }
    this.getTherapistReviews(offset);
  };

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

  render() {
    const {
      id,
      user,
      jobdesc,
      clinic,
      experience,
      serviceFee,
      about,
    } = this.state.therapistDetail;

    return (
      <>
        <TitleBar title={user.name} />

        <div className="d-flex p-4 col-12 justify-content-center">
          <div className="flex-column p-0 d-flex col-7 mr-4">
            {/* Image & Name & Rating */}
            <div className="d-flex flex-wrap align-items-center justify-content-center flex-lg-row flex-column">
              {/* Image */}
              <div className="d-flex col-2 justify-content-center">
                <img
                  src={user.image}
                  style={{ width: "100%" }}
                  className="rounded-circle"
                />
              </div>
              {/* Name */}
              <div className="d-flex flex-column col-8">
                <h3 className="mb-0">{user.name}</h3>
                <p className="" style={{ fontSize: "17px" }}>
                  {jobdesc}
                </p>
              </div>
              {/* Rating */}
              <div className="d-flex align-items-end flex-column col-2">
                <div className="d-flex">
                  <FontAwesomeIcon
                    icon={faStar}
                    style={{ color: "#f4cc3c", fontSize: "25px" }}
                  />
                  <h5 className="ml-1">{this.calculateAverageRating()}</h5>
                </div>
                <p style={{ fontSize: "14px" }}>
                  {this.state.therapistDetail.reviews.length} reviews
                </p>
              </div>
            </div>
            {/* About */}
            <div className="d-flex mt-4 flex-column">
              <h5 className="mb-0">Therapist Profile</h5>
              <p className="text-justify mt-2">{about}</p>
            </div>
            {/* Clinic Location and Home Service Schedule */}
            <div className="d-flex mt-4 flex-column">
              <h5 className="mb-0">Location & Home Service Schedule</h5>
              <div className="border d-flex flex-column rounded mt-2 p-4">
                {/* Location */}
                <div className="d-flex">
                  <img
                    src={clinic.image}
                    className="rounded mr-4"
                    style={{ width: "15%" }}
                    alt=""
                  />
                  <div className="flex-column">
                    <h6 className="mb-0" style={{ color: "#84c4d4" }}>
                      {clinic.clinicName}
                    </h6>
                    <p style={{ color: "#fc8454" }}>
                      Service Fee{" "}
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      }).format(serviceFee)}
                    </p>
                  </div>
                </div>
                {/* Service */}
                <div
                  className="d-flex border flex-wrap rounded mt-4 p-2"
                  onClick={this.toggleDaily}
                >
                  <h6 className="row col-11 mr-5 mb-0">Weekly Schedule</h6>
                  <FontAwesomeIcon
                    icon={this.state.isOpenDaily ? faChevronUp : faChevronDown}
                    style={{ color: "#f4cc3c", fontSize: "20px" }}
                  />
                </div>
                {this.state.isOpenDaily ? this.renderSchedules() : null}
              </div>
            </div>
            {/* Therapist Review */}
            <div className="d-flex mt-4 flex-column">
              <h5 className="mb-0">Therapist Review</h5>
              <div className="border d-flex flex-column rounded mt-2 pr-4 pb-4 pl-4 pt-0">
                {this.renderTherapistReviews()}
                {/* Pagination */}
                {/* {this.state.therapistDetail.reviews.length != 1
                  ? this.renderPagination()
                  : null} */}
                {this.renderPagination()}
              </div>
            </div>
          </div>

          <div className="d-flex p-0 col-3 flex-column border"></div>
        </div>
        <Modal
          toggle={this.toggleModal}
          isOpen={this.state.formOpen}
          className="confirmation-modal modal-lg"
        >
          <ModalBody className="d-flex p-4" style={{ backgroundImage: "" }}>
            <div className="d-flex col-12 flex-column">
              <div className="row flex-wrap">
                {/* Booking Details
                <div className="col-12 d-flex flex-column border rounded mb-3 p-3">
                  <h4 className="m-0">Booking Details</h4>
                  <div className="mt-3 border">
                    
                    {this.renderCoba()}
                  </div>
                </div> */}

                {/* Details */}
                <div className="d-flex border flex-column rounded flex-wrap p-3 col-7">
                  <h4 className="mb-3">Appointment Details</h4>
                  <div className="border"></div>
                  {/* Form */}
                  <div className="row pr-3 pl-3 mt-3">
                    <div className="col-5 d-flex p-0 align-items-center">
                      Name
                    </div>
                    <div className="col-7 d-flex p-0">
                      <Input
                        className="m-0"
                        style={{ width: "100%" }}
                        value={this.props.user.name}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="row pr-3 pl-3 mt-3">
                    <div className="col-5 d-flex p-0 align-items-center">
                      Phone Number
                    </div>
                    <div className="col-7 d-flex p-0">
                      <Input
                        className="m-0"
                        style={{ width: "100%" }}
                        value={this.props.user.phoneNumber}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="row pr-3 pl-3 mt-3">
                    <div className="col-5 d-flex p-0">Address</div>
                    <div className="col-7 d-flex p-0">
                      <Input
                        type="textarea"
                        className="m-0"
                        style={{ width: "100%" }}
                        value={
                          this.props.user.address +
                          " RT " +
                          this.props.user.rt +
                          " RW " +
                          this.props.user.rw +
                          ", " +
                          this.props.user.area +
                          ", " +
                          this.props.user.subdistrict +
                          ", " +
                          this.props.user.city.cityName
                        }
                        disabled
                      />
                    </div>
                  </div>
                  <div className="row pr-3 pl-3 mt-3">
                    <div className="col-5 d-flex p-0 align-items-center">
                      Recurring Period
                    </div>
                    <div className="col-7 d-flex p-0">
                      <Input
                        type="select"
                        name="select"
                        id="exampleSelect"
                        style={{ background: "#f2f2f2", border: "white" }}
                        onChange={(e) => {
                          this.changePeriod(e);
                        }}
                      >
                        <option selected value="1">
                          1
                        </option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                      </Input>
                    </div>
                  </div>
                  <div className="row pr-3 pl-3 mt-3">
                    <div className="col-5 d-flex p-0 ">Your Schedule</div>
                    <div className="col-7 d-flex p-0">
                      {this.renderUserSchedule()}
                    </div>
                  </div>
                </div>

                {/* Payment */}
                <div className="d-flex pt-0 pb-0 pr-0 pl-3 col-5">
                  <div
                    className="d-flex border rounded flex-column p-3"
                    style={{ backgroundColor: "#f2f2f2", height: "350px" }}
                  >
                    <h4 className="m-0">Payment Summary</h4>
                    <div className="mt-3 border"></div>
                    <div className="row mt-3">
                      <div className="d-flex col-5">Service Fee</div>
                      <div className="d-flex justify-content-end col-7">
                        {priceFormatter(this.state.therapistDetail.serviceFee)}
                      </div>
                    </div>
                    <div className="row mt-2">
                      <div className="d-flex col-7">Num of Meeting</div>
                      <div className="d-flex justify-content-end col-5">
                        {this.state.meetingQty}
                      </div>
                    </div>
                    <div className="row mt-2">
                      <div className="d-flex col-5">Discount</div>
                      <div className="d-flex justify-content-end col-7">
                        {priceFormatter(this.state.discPrice)}
                      </div>
                    </div>
                    <div className="d-flex mt-2">
                      <Input
                        placeholder="Disc code"
                        className="m-0 col-7"
                        value={this.state.discCode}
                        onChange={(e) => {
                          this.discCode(e);
                        }}
                      />
                      <div className="col-1"></div>
                      <ButtonCstm
                        onClick={this.useCode}
                        type="green"
                        className="col-4"
                      >
                        Use
                      </ButtonCstm>
                    </div>
                    <div className="border mt-3"></div>
                    <div className="row mt-3">
                      <div className="d-flex col-6">
                        <h6>Amount to Pay</h6>
                      </div>
                      <div className="d-flex justify-content-end col-6">
                        {priceFormatter(this.totalAmount())}
                      </div>
                    </div>
                    <div className="d-flex mt-2">
                      <ButtonCstm
                        onClick={() => this.send(this.state.bookingRequest.id)}
                        type="light-blue"
                        style={{ width: "100%" }}
                      >
                        Pay Now
                      </ButtonCstm>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ModalBody>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(TherapistDetail);
