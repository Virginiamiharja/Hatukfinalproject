import React from "react";
import "./UserProfile.css";
import { Input, Form, Row, Col, FormText, FormGroup, Label } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfoCircle,
  faMap,
  faCalendarAlt,
  faCommentDots,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import ButtonCstm from "../../components/button/Button";
import { API_URL1 } from "../../../constants/API";
import Axios from "axios";
import TitleBar from "../../components/titlebar/TitleBar";
import { connect } from "react-redux";
import { getCities, forgotPassword } from "../../../redux/actions";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import { Modal, ModalBody } from "reactstrap";

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

    arrIcon: [faInfoCircle, faMap, faCalendarAlt, faCommentDots],
    arrMenu: ["Information", "Address", "My Bookings", "My Reviews"],
    indexColor: ["#fc8454", "#f4cc3c", "#84c4d4", "#8ccc7c", "#6d68b8"],
    activePage: 0,
    currPass: "",
    formOpen: false,
  };

  inputTextHandler = (event, field) => {
    const { value } = event.target;
    if (field == "currPass") {
      this.setState({ [field]: value });
    } else {
      this.setState({ userData: { ...this.state.userData, [field]: value } });
    }
  };

  fileChangeHandler = (e) => {
    this.setState({
      userData: {
        ...this.state.userData,
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
        console.log(res.data);
        this.setState({ userData: res.data });
      })
      .catch((err) => {
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
          onClick={() => this.changePage(index)}
        >
          <FontAwesomeIcon
            icon={this.state.arrIcon[index]}
            style={{ fontSize: "25px", color: this.state.indexColor[index] }}
          />
          <h5 className="ml-4 mb-0">{value}</h5>
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
              <ButtonCstm onClick={this.toggleModal}>Upload</ButtonCstm>

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
              onChange={(e) => {
                this.inputTextHandler(e, "name");
              }}
            />
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
    }
    return null;
  };

  componentDidMount() {
    this.getUserData();
    this.props.getCities();
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

  toggleModal = () => {
    this.setState({ formOpen: !this.state.formOpen, meetingQty: 0 });
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

  render() {
    return (
      <>
        <TitleBar title="User Profile" />
        <div
          className="d-flex justify-content-center col-12 p-4"
          style={{ backgroundColor: "#f4f4fc" }}
        >
          <div
            className="col-3 mr-4 flex-column p-0 rounded"
            style={{ height: "297px" }}
          >
            {this.renderMenu()}
          </div>

          <div
            className="d-flex p-4 rounded flex-column col-7"
            style={{ backgroundColor: "white" }}
          >
            {this.renderPage()}
            <div className="d-flex mt-4 justify-content-center">
              <ButtonCstm onClick={this.editUserHandler}>
                Save Changes
              </ButtonCstm>
            </div>
          </div>
        </div>

        <Modal
          toggle={this.toggleModal}
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
                  onChange={this.fileChangeHandler}
                />
              </div>
            </div>
            <div className="d-flex col-12 p-0 justify-content-end mt-4">
              <ButtonCstm className="mr-2" onClick={this.uploadPicture}>
                Save
              </ButtonCstm>
              <ButtonCstm type="coral-outline" onClick={this.toggleModal}>
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
    city: state.city,
  };
};

const mapDispatchToProps = {
  getCities,
  forgotPassword,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
