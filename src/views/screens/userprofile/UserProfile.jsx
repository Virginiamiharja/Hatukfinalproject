import React from "react";
import "./UserProfile.css";
import {
  Input,
  Form,
  Row,
  Col,
  FormText,
  FormGroup,
  Label,
  Modal,
  ModalBody,
  Table,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfoCircle,
  faMap,
  faCalendarAlt,
  faSignOutAlt,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import ButtonCstm from "../../components/button/Button";
import { API_URL1 } from "../../../constants/API";
import Axios from "axios";
import TitleBar from "../../components/titlebar/TitleBar";
import { connect } from "react-redux";
import {
  getCities,
  forgotPassword,
  changeStatus,
  logoutHandler,
} from "../../../redux/actions";
import swal from "sweetalert";
import { Link, Redirect } from "react-router-dom";
import { priceFormatter } from "../../../supports/helpers/formatter";

class UserProfile extends React.Component {
  state = {
    userData: {
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
      verifyToken: "",
      verified: false,
    },

    therapistForm: {
      id: 0,
      about: "",
      experience: "",
      jobdesc: "",
      serviceFee: 0,
      clinic: {
        id: 0,
        clinicName: "",
      },
      transactions: [],
    },

    editTransaction: {
      id: 0,
      totalPrice: 0,
      image: "",
      status: "",
      reason: "",
      createdAt: "",
      bookingRequests: [],
    },

    review: {
      comment: "",
      rating: 0,
      userId: 0,
      therapistDetailId: 0,
    },

    userList: [],
    therapistList: [],
    therapistDetails: [],
    arrIcon: [faInfoCircle, faMap, faCalendarAlt, faSignOutAlt],
    arrMenu: ["Information", "Address", "My Bookings", "Log Out"],
    indexColor: ["#fc8454", "#f4cc3c", "#84c4d4", "#8ccc7c", "#6d68b8"],
    activePage: 0,
    currPass: "",
    formOpen: false,
    formTrf: false,
    editForm: false,
    reviewForm: false,
    // Ini untuk kirim review
    therapistId: 0,
    date: "",
  };

  inputTextHandler = (event, field) => {
    const { value } = event.target;
    if (field == "currPass") {
      this.setState({ [field]: value });
    } else {
      this.setState({ userData: { ...this.state.userData, [field]: value } });
    }
  };

  fileChangeHandler = (e, form) => {
    this.setState({
      [form]: {
        ...this.state[form],
        image: e.target.files[0],
      },
    });
  };

  getUserData = () => {
    Axios.get(`${API_URL1}/users/userprofile`, {
      params: {
        userId: this.props.match.params.userId,
      },
    })
      .then((res) => {
        this.setState({ userData: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getTherapistData = () => {
    Axios.get(`${API_URL1}/therapistdetails/findbyuser`, {
      params: {
        userId: this.props.match.params.userId,
      },
    })
      .then((res) => {
        this.setState({ therapistForm: res.data });
      })
      .catch((err) => {
        console.log("hallo");
        console.log(err);
      });
  };

  changePage = (activePage) => {
    this.setState({ activePage });
  };

  renderMenu = () => {
    return this.state.arrMenu.map((value, index) => {
      return (
        <div
          className="d-flex p-4 mb-2 rounded"
          style={{
            backgroundColor: "white",
            color: "black",
            border: `3px solid ${this.state.indexColor[index]}`,
          }}
          onClick={
            index == 3 ? this.props.logoutHandler : () => this.changePage(index)
          }
        >
          <FontAwesomeIcon
            icon={this.state.arrIcon[index]}
            style={{ fontSize: "25px", color: this.state.indexColor[index] }}
          />
          <h5 className="ml-4 mb-0">
            {this.state.userData.role == "therapist" && index == 2
              ? "Booking Requests"
              : value}
          </h5>
        </div>
      );
    });
  };

  renderInformationPage = () => {
    const {
      id,
      name,
      username,
      email,
      phoneNumber,
      image,
    } = this.state.userData;
    return (
      <>
        <h5 className="m-0" style={{ color: "#fc8454" }}>
          Edit Information
        </h5>
        {/* Image */}
        <div className="col-12 mt-4 p-0 d-flex">
          <div className="col-4">
            <img
              src={image}
              style={{ width: "100%" }}
              className="rounded-circle"
              alt=""
            />
          </div>
          <div className="d-flex p-0 col-8 align-items-end">
            <FormGroup className="w-100 m-0">
              <ButtonCstm onClick={() => this.toggleModal()}>Upload</ButtonCstm>

              <FormText color="muted">
                Acceptable formats .jpg .png only
                <br />
                Max file size is 15mb and min file size is 10mb
              </FormText>
            </FormGroup>
          </div>
        </div>
        <h5 className="mb-0 mt-4" style={{ color: "#fc8454" }}>
          Account Information
        </h5>
        {/* Account Information */}
        <Form className="mt-4">
          <FormGroup className="d-flex mb-0 p-0 align-items-center">
            <Label className="m-0 d-flex p-0 align-items-center col-3">
              Full Name
            </Label>
            <Input
              style={{ width: "50%" }}
              type="text"
              value={name}
              onChange={(event) => {
                this.inputTextHandler(event, "name");
              }}
              // onChange={(e) => {
              //   this.setState({
              //     userData: { ...this.state.userData, name: e.target.value },
              //   });
              // }}
            />
            {this.state.userData.name}
          </FormGroup>
          <FormGroup className="d-flex mb-0 mt-3 p-0 align-items-center">
            <Label className="m-0 d-flex p-0 align-items-center col-3">
              Username
            </Label>
            <Input
              style={{ width: "50%" }}
              type="text"
              value={username}
              onChange={(e) => {
                this.inputTextHandler(e, "username");
              }}
            />
          </FormGroup>
          <FormGroup className="d-flex mb-0 mt-3 p-0 align-items-center">
            <Label className="m-0 d-flex p-0 align-items-center col-3">
              Email
            </Label>
            <Input
              style={{ width: "50%" }}
              type="email"
              value={email}
              onChange={(e) => {
                this.inputTextHandler(e, "email");
              }}
              disabled
            />
          </FormGroup>
          <FormGroup className="d-flex mb-0 mt-3 p-0 align-items-center">
            <Label className="m-0 d-flex p-0 align-items-center col-3">
              Phone Number
            </Label>
            <Input
              style={{ width: "50%" }}
              type="text"
              value={phoneNumber}
              onChange={(e) => {
                this.inputTextHandler(e, "phoneNumber");
              }}
            />
          </FormGroup>
        </Form>
        <h5 className="mb-0 mt-4" style={{ color: "#fc8454" }}>
          Change Password
        </h5>
        <Form className="mt-4">
          <FormGroup className="col-12 d-flex mb-0 p-0 align-items-center">
            <Label className="m-0 d-flex p-0 align-items-center col-3">
              Current Password
            </Label>
            <Input
              style={{ width: "50%" }}
              // className="mr-5"
              type="password"
              onChange={(e) => {
                this.inputTextHandler(e, "currPass");
              }}
            />
          </FormGroup>
          <FormGroup className="col-12 d-flex mb-0 p-0 align-items-center">
            <div className="m-0 d-flex p-0 align-items-center col-3"></div>
            <FormText color="muted" className="d-flex p-0 col-9">
              Forgot password? Click&nbsp;
              <Link
                className="auth-link"
                onClick={() =>
                  this.props.forgotPassword(this.state.userData.email)
                }
              >
                here!
              </Link>
            </FormText>
          </FormGroup>
          <FormGroup className="d-flex mb-0 mt-3 p-0 align-items-center">
            <Label className="m-0 d-flex p-0 align-items-center col-3">
              New Password
            </Label>
            <Input
              style={{ width: "50%" }}
              type="password"
              onChange={(e) => {
                this.inputTextHandler(e, "password");
              }}
            />
          </FormGroup>
        </Form>
      </>
    );
  };

  renderAddressPage = () => {
    const { city, subdistrict, area, rt, rw, address } = this.state.userData;
    return (
      <>
        <h5 className="m-0" style={{ color: "#fc8454" }}>
          Edit Address
        </h5>
        {/* Address */}

        <Form className="mt-4">
          <FormGroup className="d-flex mb-0 p-0 align-items-center">
            <Label className="m-0 d-flex p-0 align-items-center col-3">
              City
            </Label>
            <Input
              type="select"
              name="select"
              style={{ width: "50%" }}
              value={city.id}
              onChange={(e) => {
                this.changeCity(e);
              }}
            >
              <option>Choose City..</option>
              {this.renderCities()}
            </Input>
          </FormGroup>

          <FormGroup className="d-flex mt-3 mb-0 p-0 align-items-center">
            <Label className="m-0 d-flex p-0 align-items-center col-3">
              Subdistrict
            </Label>
            <Input
              type="text"
              placeholder="Subdistrict"
              onChange={(e) => {
                this.inputTextHandler(e, "subdistrict");
              }}
              style={{ width: "50%" }}
              value={subdistrict}
            />
          </FormGroup>

          <FormGroup className="d-flex mt-3 mb-0 p-0 align-items-center">
            <Label className="m-0 d-flex p-0 align-items-center col-3">
              Area
            </Label>
            <Input
              type="text"
              onChange={(e) => {
                this.inputTextHandler(e, "area");
              }}
              style={{ width: "50%" }}
              value={area}
            />
          </FormGroup>

          <FormGroup className="d-flex mt-3 mb-0 p-0">
            <Label className="m-0 d-flex p-0 col-3">Street Name</Label>
            <Input
              type="textarea"
              placeholder="Subdistrict"
              onChange={(e) => {
                this.inputTextHandler(e, "address");
              }}
              style={{ width: "50%" }}
              value={address}
            />
          </FormGroup>

          <FormGroup className="d-flex mt-3 mb-0 p-0">
            <Label className="m-0 d-flex p-0 col-3">RT/RW</Label>
            <Row form>
              <Col md={2} className="">
                <Input
                  type="text"
                  placeholder="RT"
                  value={rt}
                  onChange={(e) => {
                    this.inputTextHandler(e, "rt");
                  }}
                />
              </Col>

              <Col
                md={1}
                className="justify-content-center d-flex align-items-center"
              >
                /
              </Col>

              <Col md={2}>
                <Input
                  type="text"
                  placeholder="RW"
                  value={rw}
                  onChange={(e) => {
                    this.inputTextHandler(e, "rw");
                  }}
                />
              </Col>
            </Row>
          </FormGroup>
        </Form>
      </>
    );
  };

  renderBookingPage = () => {
    return (
      <>
        <h5 className="m-0" style={{ color: "#fc8454" }}>
          My Bookings
        </h5>
        <Table
          className="mb-0 border rounded mt-4"
          style={{ backgroundColor: "white" }}
        >
          <thead>
            <tr>
              <th
                style={{
                  backgroundColor: "#fc8454",
                  color: "white",
                }}
              >
                No
              </th>
              <th>Total Price</th>
              <th>Booking Date</th>
              <th>Receipt</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{this.renderUserTransaction()}</tbody>
        </Table>
      </>
    );
  };

  changeCity = (event) => {
    const { value } = event.target;
    this.setState({
      userData: {
        ...this.state.userData,
        city: { ...this.state.userData.city, id: value },
      },
    });
  };

  renderCities = () => {
    return this.props.city.city.map((value) => {
      return (
        <>
          <option value={value.id}>{value.cityName}</option>
        </>
      );
    });
  };

  renderPage = () => {
    if (this.state.activePage == 0) {
      return this.renderInformationPage();
    } else if (this.state.activePage == 1) {
      return this.renderAddressPage();
    } else if (this.state.activePage == 2) {
      return this.renderBookingPage();
    }
    return null;
  };

  openReviewForm = (trxId) => {
    this.setState({
      reviewForm: !this.state.reviewForm,
      therapistId: this.renderTherapistTrx(trxId),
    });
  };

  // Cek lagi
  renderUserTransaction = () => {
    var date;
    if (this.state.userData.role == "user") {
      return this.state.userData.transactions.map((value, index) => {
        date = new Date(value.createdAt);
        return (
          <>
            <tr>
              <td>{index + 1}</td>
              <td>{priceFormatter(value.totalPrice)}</td>
              <td>
                {date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}
              </td>
              <td>Receipt</td>
              <td>{value.status}</td>
              <td>
                {value.status == "finish" ? (
                  <ButtonCstm
                    onClick={() => {
                      this.openReviewForm(value.id);
                    }}
                  >
                    Review
                  </ButtonCstm>
                ) : (
                  <ButtonCstm
                    onClick={() => {
                      this.detailTrx(index);
                    }}
                  >
                    Detail
                  </ButtonCstm>
                )}
              </td>
            </tr>
          </>
        );
      });
    } else if (this.state.userData.role == "therapist") {
      return this.state.therapistForm.transactions.map((value, index) => {
        date = new Date(value.createdAt);
        if (value.status == "booked" || value.status == "finish")
          return (
            <>
              <tr>
                <td>{index + 1}</td>
                <td>{priceFormatter(value.totalPrice)}</td>
                <td>
                  {date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}
                </td>
                <td>Receipt</td>
                <td>{value.status}</td>
                <td>
                  <ButtonCstm
                    onClick={() => {
                      this.detailTrx(index);
                    }}
                  >
                    Detail
                  </ButtonCstm>
                </td>
              </tr>
            </>
          );
      });
    }
  };

  componentDidMount() {
    this.getUserData();
    this.props.getCities();
    this.getTherapistData();
    this.getUserList();
    this.getTherapistList();
  }

  editUserHandler = () => {
    return Axios.put(`${API_URL1}/users/edituserprofile`, this.state.userData, {
      params: {
        currPass: this.state.currPass,
        cityId: this.state.userData.city.id,
      },
    })
      .then((res) => {
        console.log(res.data);
        swal("CONGRATS!", "Your profile has been updated", "success");
        this.getUserData();
        this.setState({
          currPass: "",
          confPass: "",
          userData: { ...this.state.userData, password: "" },
        });
      })
      .catch((err) => {
        console.log(err);
        swal("OH NO!", "Wrong old password!", "error");
      });
  };

  // Cek lagi
  detailTrx = (index) => {
    if (this.state.userData.role == "user") {
      this.setState({
        editTransaction: { ...this.state.userData.transactions[index] },
        editForm: !this.state.editForm,
      });
    } else if (this.state.userData.role == "therapist") {
      this.setState({
        editTransaction: { ...this.state.therapistForm.transactions[index] },
        editForm: !this.state.editForm,
      });
    }
  };

  uploadTransfer = () => {
    const { image } = this.state.editTransaction;
    let trxPicture = new FormData();
    trxPicture.append("trxPicture", image);

    Axios.put(`${API_URL1}/transactions/uploadtransfer`, trxPicture, {
      params: {
        transactionId: this.state.editTransaction.id,
      },
    })
      .then((res) => {
        console.log(res.data);
        swal("CONGRATS!", "Your image has been uploaded", "success");
      })
      .catch((err) => {
        console.log(err);
        swal("OH NO!", "The image can't be uploaded", "error");
      });
  };

  toggleModal = (type = "photo") => {
    if (type == "photo") {
      this.setState({ formOpen: !this.state.formOpen });
    } else if (type == "trf") {
      this.setState({ formTrf: !this.state.formTrf });
    } else if (type == "edit") {
      this.setState({ editForm: !this.state.editForm });
    } else if (type == "rvw") {
      this.setState({ reviewForm: !this.state.reviewForm });
    }
  };

  uploadPicture = () => {
    const { image } = this.state.userData;
    let profilePicture = new FormData();
    profilePicture.append("profilePicture", image);

    Axios.put(`${API_URL1}/users/editprofilepicture`, profilePicture, {
      params: {
        userId: this.props.match.params.userId,
      },
    })
      .then((res) => {
        console.log(res.data);
        swal("CONGRATS!", "Your image has been uploaded", "success");
        this.setState({ formOpen: !this.state.formOpen });
        this.getUserData();
      })
      .catch((err) => {
        console.log(err);
        swal("OH NO!", "The image can't be uploaded", "error");
      });
  };

  changeStatus = (event) => {
    const { value } = event.target;
    this.setState({
      editTransaction: { ...this.state.editTransaction, status: value },
    });
  };

  renderBookingRequest = () => {
    return this.state.editTransaction.bookingRequests.map((value, index) => {
      return (
        <>
          <tr>
            <td>{index + 1}</td>
            <td>{value.serviceDate.substr(0, 10)}</td>
          </tr>
        </>
      );
    });
  };

  inputTextHandler = (event, field) => {
    const { value } = event.target;
    this.setState({ review: { ...this.state.review, [field]: value } });
  };

  // Ini cara barbar dan harusnya ditaro di redux karena dipake di manage transaction jg
  getUserList = () => {
    Axios.get(`${API_URL1}/users/pure`)
      .then((res) => {
        // console.log(res.data);
        this.setState({ userList: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getTherapistList = () => {
    Axios.get(`${API_URL1}/therapistdetails/pure`)
      .then((res) => {
        console.log(res.data);
        this.setState({ therapistList: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  renderUserTrx = (trxId) => {
    return this.state.userList.map((value, index) => {
      if (
        value.transactions.find((val) => {
          return val.id == trxId;
        })
      )
        return (
          <tr>
            <td>User</td>
            <td>{value.name}</td>
            <td>{value.phoneNumber}</td>
            <td>
              {value.address}, RT {value.rt} RW {value.rw},{value.area}{" "}
              {value.city.cityName}
            </td>
          </tr>
        );
    });
  };

  // Yang ini return id
  renderTherapistTrx = (trxId) => {
    return this.state.therapistList.map((value) => {
      if (
        value.transactions.find((val) => {
          return val.id == trxId;
        })
      )
        return value.id;
    });
  };

  // Yang ini return tampilan
  renderTherapistTrxData = (trxId) => {
    return this.state.therapistList.map((value) => {
      if (
        value.transactions.find((val) => {
          return val.id == trxId;
        })
      )
        return (
          <tr>
            <td>Therapist</td>
            <td>{value.user.name}</td>
            <td>{value.user.phoneNumber}</td>
            <td></td>
          </tr>
        );
    });
  };
  // Batas cara barbar dan tak patut dicontoh

  sendComment = () => {
    const { comment, rating } = this.state.review;

    Axios.post(
      `${API_URL1}/reviews/addreview`,
      { comment, rating },
      {
        params: {
          userId: this.props.match.params.userId,
          therapistDetailId: this.state.therapistId[0],
        },
      }
    )
      .then((res) => {
        swal("CONGRATS", "Your review has been sent", "success");
        this.setState({ reviewForm: !this.state.reviewForm });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <>
        <TitleBar title="User Profile" />
        <div
          className="d-flex justify-content-center col-12 p-4"
          style={{ backgroundColor: "#f4f4fc" }}
        >
          <div className="col-3 mr-4 flex-column p-0 rounded">
            {this.renderMenu()}
          </div>

          <div
            className="d-flex p-4 rounded flex-column col-7"
            style={{ backgroundColor: "white" }}
          >
            {this.renderPage()}
            <div className="d-flex mt-4 justify-content-center">
              {this.state.activePage == 0 || this.state.activePage == 1 ? (
                <ButtonCstm onClick={this.editUserHandler}>
                  Save Changes
                </ButtonCstm>
              ) : null}
            </div>
          </div>
        </div>

        {/* Modal untuk upload picture */}
        <Modal
          toggle={() => this.toggleModal()}
          isOpen={this.state.formOpen}
          className="image-modal"
        >
          <ModalBody
            className="d-flex p-4 flex-column"
            style={{ backgroundImage: "" }}
          >
            <div className="d-flex p-4 border rounded col-12 align-items-center flex-column justify-content-center">
              <FontAwesomeIcon
                icon={faUpload}
                style={{ color: "#fc8454", fontSize: "100px" }}
              />

              <div className="d-flex mt-4 p-0 col-7">
                <Input
                  type="file"
                  name="file"
                  id="exampleFile"
                  onChange={(e) => this.fileChangeHandler(e, "userData")}
                />
              </div>
            </div>
            <div className="d-flex col-12 p-0 justify-content-end mt-4">
              <ButtonCstm className="mr-2" onClick={this.uploadPicture}>
                Save
              </ButtonCstm>
              <ButtonCstm
                type="coral-outline"
                onClick={() => this.toggleModal()}
              >
                Cancel
              </ButtonCstm>
            </div>
          </ModalBody>
        </Modal>

        {/* Modal untuk munculin detail transaksi */}
        <Modal
          toggle={() => this.toggleModal("edit")}
          isOpen={this.state.editForm}
          className="image-modal"
        >
          <ModalBody className="d-flex p-4 flex-column">
            <div className="d-flex p-4 border rounded col-12 flex-column ">
              <h4 className="mb-3">Transaction Details</h4>
              <div className="border"></div>

              <div className="row al pr-3 pl-3 mt-3">
                <Table
                  className="mb-0 mt-0 border rounded"
                  style={{ backgroundColor: "white" }}
                >
                  <thead>
                    <tr>
                      <th
                        style={{
                          backgroundColor: "#fc8454",
                          color: "white",
                        }}
                      >
                        Data
                      </th>
                      <th>Name</th>
                      <th>Phone Number</th>
                      <th>Address</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.renderUserTrx(this.state.editTransaction.id)}
                    {this.renderTherapistTrxData(this.state.editTransaction.id)}
                  </tbody>
                </Table>
                <Table
                  className="mb-0 mt-3 border rounded"
                  style={{ backgroundColor: "white" }}
                >
                  <thead>
                    <tr>
                      <th
                        style={{
                          backgroundColor: "#fc8454",
                          color: "white",
                        }}
                      >
                        No
                      </th>
                      <th>Service Date</th>
                    </tr>
                  </thead>
                  <tbody>{this.renderBookingRequest()}</tbody>
                </Table>
              </div>
              <div className="row pr-3 pl-3 mt-3">
                <div className="col-5 d-flex p-0 align-items-center">
                  Total Price
                </div>
                <div className="col-7 d-flex p-0">
                  <Input
                    className="m-0"
                    style={{ width: "100%" }}
                    value={priceFormatter(
                      this.state.editTransaction.totalPrice
                    )}
                    disabled
                  />
                </div>
              </div>
              <div className="row pr-3 pl-3 mt-3">
                <div className="col-5 d-flex p-0 align-items-center">
                  Created At
                </div>
                <div className="col-7 d-flex p-0">
                  <Input
                    type="text"
                    className="m-0"
                    style={{ width: "100%" }}
                    value={this.state.editTransaction.createdAt.substr(0, 10)}
                    disabled
                  />
                </div>
              </div>
              <div className="row pr-3 pl-3 mt-3">
                <div className="col-5 d-flex p-0 align-items-center">
                  Status
                </div>
                <div className="col-7 d-flex p-0">
                  {/* Nanti buat validasi aja utk bagian ini therapis doang yang bisa edit */}
                  <Input
                    type="select"
                    name="select"
                    style={{ width: "100%" }}
                    value={this.state.editTransaction.status}
                    onChange={(e) => {
                      this.changeStatus(e);
                    }}
                  >
                    <option>Status..</option>
                    <option value="waiting for payment">
                      Waiting for Payment
                    </option>
                    <option value="pending">Pending</option>
                    <option value="booked">Booked</option>
                    <option value="finish">Finish</option>
                    {/* <option value="reject">Reject</option> */}
                  </Input>
                </div>
              </div>
              {/* Untuk ngerender inputan reason */}
              {this.state.editTransaction.reason ? (
                <div className="row pr-3 pl-3 mt-3">
                  <div className="col-5 d-flex p-0">Reason</div>
                  <div className="col-7 d-flex p-0">
                    <Input
                      type="textarea"
                      className="m-0"
                      style={{ width: "100%" }}
                      value={this.state.editTransaction.reason}
                    />
                  </div>
                </div>
              ) : null}
              {this.state.userData.role == "user" &&
              (this.state.editTransaction.status == "reject" ||
                this.state.editTransaction.status == "waiting for payment") ? (
                <div className="row pr-3 pl-3 mt-3">
                  <div className="col-5 d-flex p-0 align-items-center">
                    Upload Receipt
                  </div>
                  <div className="col-7 d-flex p-0">
                    <Input
                      type="file"
                      name="file"
                      id="exampleFile"
                      onChange={(e) =>
                        this.fileChangeHandler(e, "editTransaction")
                      }
                    />
                  </div>
                </div>
              ) : null}
            </div>

            <div className="d-flex col-12 p-0 justify-content-end mt-4">
              {this.state.userData.role == "user" &&
              (this.state.editTransaction.status == "reject" ||
                this.state.editTransaction.status == "waiting for payment") ? (
                <ButtonCstm className="mr-2" onClick={this.uploadTransfer}>
                  Save
                </ButtonCstm>
              ) : null}
              {this.state.userData.role == "therapist" ? (
                <ButtonCstm
                  className="mr-2"
                  onClick={() =>
                    this.props.changeStatus(this.state.editTransaction)
                  }
                >
                  Save
                </ButtonCstm>
              ) : null}

              <ButtonCstm
                type="coral-outline"
                onClick={() => this.toggleModal("edit")}
              >
                Cancel
              </ButtonCstm>
            </div>
          </ModalBody>
        </Modal>

        {/* Modal untuk kasih rating atau review */}
        <Modal
          toggle={() => this.toggleModal("rvw")}
          isOpen={this.state.reviewForm}
          className="image-modal"
        >
          <ModalBody
            className="d-flex p-4 flex-column"
            style={{ backgroundImage: "" }}
          >
            <div className="d-flex p-4 border rounded col-12 flex-column ">
              <h4 className="mb-3">Review</h4>
              <div className="border"></div>

              <div className="row pr-3 pl-3 mt-3">
                <div className="col-5 d-flex p-0 align-items-center">
                  Comment
                </div>
                <div className="col-7 d-flex p-0">
                  <Input
                    className="m-0"
                    style={{ width: "100%" }}
                    type="textarea"
                    onChange={(e) => this.inputTextHandler(e, "comment")}
                  />
                </div>
              </div>
              <div className="row pr-3 pl-3 mt-3">
                <div className="col-5 d-flex p-0 align-items-center">
                  Rating
                </div>
                <div className="col-7 d-flex p-0">
                  <Input
                    className="m-0"
                    style={{ width: "100%" }}
                    onChange={(e) => this.inputTextHandler(e, "rating")}
                  />
                </div>
              </div>
            </div>
            <div className="d-flex col-12 p-0 justify-content-end mt-4">
              <ButtonCstm className="mr-2" onClick={this.sendComment}>
                Save
              </ButtonCstm>
              <ButtonCstm
                type="coral-outline"
                onClick={() => this.toggleModal("rvw")}
              >
                Cancel
              </ButtonCstm>
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
    city: state.city,
  };
};

const mapDispatchToProps = {
  getCities,
  forgotPassword,
  changeStatus,
  logoutHandler,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
