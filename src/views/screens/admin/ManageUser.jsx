import React from "react";
import TitleBar from "../../components/titlebar/TitleBar";
import {
  Form,
  Col,
  FormGroup,
  Label,
  Input,
  CustomInput,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Alert,
  Row,
  FormText,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faFilter,
  faSort,
  faStar,
  faStethoscope,
  faHospital,
  faEye,
  faUpload,
  faArrowAltCircleLeft,
  faArrowAltCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import { Table } from "reactstrap";
import { priceFormatter } from "../../../supports/helpers/formatter";
import Axios from "axios";
import { API_URL, API_URL1 } from "../../../constants/API";
import { connect } from "react-redux";
import { getCities } from "../../../redux/actions";
import ButtonCstm from "../../components/button/Button";
import { Link } from "react-router-dom";
import SideBar from "../../components/sidebar/SideBar";
import { Modal, ModalBody } from "reactstrap";
import swal from "sweetalert";

class ManageUser extends React.Component {
  state = {
    users: [],
    // User account for therapist
    registrationForm: {
      id: 0,
      name: "",
      username: "",
      email: "",
      password: "",
      phoneNumber: "",
      city: {
        id: 0,
        cityName: "",
      },
      image: null,
      role: "therapist",
      subdistrict: "",
      area: "",
      address: "",
      rt: "",
      rw: "",
    },

    offset: 0,
    editForm: false,
    formOpen: false,
    showPassword: false,
    searchInput: "",
  };

  renderUsers = () => {
    return this.state.users.map((value, index) => {
      if (
        value.name.toLowerCase().includes(this.state.searchInput.toLowerCase())
      )
        return (
          <>
            <tr>
              <td scope="row">{index + 1}</td>
              <td>{value.name}</td>
              <td>{value.email}</td>
              <td>{value.phoneNumber}</td>
              <td>
                <ButtonCstm onClick={() => this.editHandler(index)}>
                  Detail
                </ButtonCstm>
              </td>
            </tr>
          </>
        );
    });
  };

  editHandler = (index) => {
    this.setState({
      registrationForm: { ...this.state.users[index] },
      editForm: !this.state.editForm,
    });
  };

  //   Belom diapa2in
  toggleModal = (type) => {
    this.setState({ [type]: !this.state[type] });
  };

  inputTextHandler = (event, field) => {
    const { value } = event.target;
    this.setState({
      registrationForm: { ...this.state.registrationForm, [field]: value },
    });
  };

  showPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  fileChangeHandler = (e) => {
    this.setState({
      registrationForm: {
        ...this.state.registrationForm,
        image: e.target.files[0],
      },
    });
  };

  changeHandler = (event) => {
    const { value } = event.target;
    this.setState({
      registrationForm: {
        ...this.state.registrationForm,
        city: { ...this.state.registrationForm.city, id: value },
      },
    });
  };

  deleteUser = () => {
    Axios.delete(`${API_URL1}/users/deleteuser`, {
      params: {
        userId: this.state.registrationForm.id,
      },
    })
      .then((res) => {
        console.log(res.data);
        swal("Congrats!", "User has been deleted", "success");
        this.getUsers();
      })
      .catch((err) => {
        console.log(err);
        swal("Oops!", "The user cannot be deleted");
      });
  };

  // Keperluan form
  renderCities = () => {
    return this.props.city.city.map((value) => {
      return (
        <>
          <option value={value.id}>{value.cityName}</option>
        </>
      );
    });
  };

  // Ini harusnya dibikin di redux karena dipake di user profile dan disini
  uploadPicture = () => {
    const { image } = this.state.registrationForm;
    let profilePicture = new FormData();
    profilePicture.append("profilePicture", image);

    Axios.put(`${API_URL1}/users/editprofilepicture`, profilePicture, {
      params: {
        userId: this.state.registrationForm.id,
      },
    })
      .then((res) => {
        console.log(res.data);
        swal("Congrats!", "The image has been uploaded", "success");
        this.setState({ formOpen: !this.state.formOpen });
      })
      .catch((err) => {
        console.log(err);
        swal("Oops!", "The image can't be uploaded", "error");
      });
  };

  editUserHandler = () => {
    return Axios.put(
      `${API_URL1}/users/edituserprofile`,
      this.state.registrationForm,
      {
        params: {
          currPass: "",
          cityId: this.state.registrationForm.city.id,
        },
      }
    )
      .then((res) => {
        console.log(res.data);
        swal("Congrats!", "User has been updated", "success");
        this.getUsers();
        this.setState({
          userData: { ...this.state.userData, password: "" },
        });
      })
      .catch((err) => {
        console.log(err);
        swal("Oops!", "Wrong old password!", "error");
      });
  };

  SearchUser = (event) => {
    const { value } = event.target;
    this.setState({ searchInput: value });
  };

  getUsers = () => {
    Axios.get(`${API_URL1}/users`)
      .then((res) => {
        console.log(res.data);
        this.setState({ users: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.getUsers();
    this.props.getCities();
  }

  render() {
    return (
      <>
        {/*  */}
        <TitleBar title="Manage User" />
        <div
          className="d-flex p-4 col-12 justify-content-center align-items-start"
          style={{ backgroundColor: "#f4f4fc" }}
        >
          <div className="d-flex p-0 col-3 flex-column">
            <SideBar />
          </div>
          <div className="d-flex flex-column pl-4 col-9">
            <FormGroup className="align-items-center d-flex p-0 mb-4">
              {/* Search*/}
              <InputGroup className="mr-4" style={{ width: "350px" }}>
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
                  placeholder="Find user!"
                  style={{ background: "#white", border: "white" }}
                  onChange={(e) => {
                    this.SearchUser(e);
                  }}
                />
              </InputGroup>
            </FormGroup>
            {/* Table */}
            <Table
              className="mb-0 border rounded"
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
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>{this.renderUsers()}</tbody>
            </Table>
          </div>

          {/* Modal untuk munculin foto */}
          <Modal
            toggle={() => this.toggleModal("formOpen")}
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
                <ButtonCstm
                  type="coral-outline"
                  onClick={() => this.toggleModal("formOpen")}
                >
                  Cancel
                </ButtonCstm>
              </div>
            </ModalBody>
          </Modal>

          {/* Modal detail data */}
          <Modal
            toggle={() => this.toggleModal("editForm")}
            isOpen={this.state.editForm}
            className="image-modal modal-xl"
          >
            <ModalBody
              className="d-flex p-4 flex-column"
              style={{ backgroundImage: "" }}
            >
              <div className="d-flex p-4 border rounded col-12 flex-column ">
                <h4 className="mb-3">User Details</h4>
                <div className="border"></div>
                <div className="d-flex flex-wrap p-0 mt-4">
                  <div className="d-flex p-0 col-4 flex-column justify-content-center align-items-center">
                    <img
                      src={this.state.registrationForm.image}
                      alt=""
                      className="border rounded-circle "
                      style={{ width: "70%" }}
                    />
                    <FormGroup className="w-100 mt-3">
                      <ButtonCstm onClick={() => this.toggleModal("formOpen")}>
                        Upload
                      </ButtonCstm>

                      <FormText color="muted">
                        Acceptable formats .jpg .png only
                        <br />
                        Max file size is 15mb and min file size is 10mb
                      </FormText>
                    </FormGroup>
                  </div>
                  <div className="d-flex pl-4 col-4 flex-column">
                    <div className="row pr-3 pl-3">
                      <div className="col-5 d-flex p-0 align-items-center">
                        Name
                      </div>
                      <div className="col-7 d-flex p-0">
                        <Input
                          type="text"
                          value={this.state.registrationForm.name}
                          className="m-0"
                          style={{ width: "100%" }}
                          onChange={(e) => {
                            this.inputTextHandler(e, "name");
                          }}
                        />
                      </div>
                    </div>
                    <div className="row pr-3 pl-3 mt-3">
                      <div className="col-5 d-flex p-0 align-items-center">
                        Username
                      </div>
                      <div className="col-7 d-flex p-0">
                        <Input
                          type="text"
                          placeholder="Username"
                          value={this.state.registrationForm.username}
                          className="m-0"
                          style={{ width: "100%" }}
                          onChange={(e) => {
                            this.inputTextHandler(e, "username");
                          }}
                        />
                      </div>
                    </div>
                    <div className="row pr-3 pl-3 mt-3">
                      <div className="col-5 d-flex p-0 align-items-center">
                        Email
                      </div>
                      <div className="col-7 d-flex p-0">
                        <Input
                          type="email"
                          placeholder="Email"
                          value={this.state.registrationForm.email}
                          className="m-0"
                          style={{ width: "100%" }}
                          onChange={(e) => {
                            this.inputTextHandler(e, "email");
                          }}
                        />
                      </div>
                    </div>
                    <div className="row pr-3 pl-3 mt-3">
                      <div className="col-5 d-flex p-0 align-items-center">
                        Password
                      </div>
                      <div className="col-7 d-flex p-0">
                        <InputGroup className="m-0">
                          <Input
                            // className="m-0"
                            // style={{ width: "100%" }}
                            placeholder="Password"
                            type={this.state.showPassword ? "text" : "password"}
                            onChange={(e) => {
                              this.inputTextHandler(e, "password");
                            }}
                          />
                          <InputGroupAddon addonType="append">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText
                                style={{
                                  background: "#84c4d4",
                                  border: "white",
                                }}
                                onClick={() => {
                                  this.showPassword();
                                }}
                              >
                                <FontAwesomeIcon
                                  icon={faEye}
                                  style={{ color: "white" }}
                                />
                              </InputGroupText>
                            </InputGroupAddon>
                          </InputGroupAddon>
                        </InputGroup>
                      </div>
                    </div>
                    <div className="row pr-3 pl-3 mt-3">
                      <div className="col-5 d-flex p-0 align-items-center">
                        Phone Number
                      </div>
                      <div className="col-7 d-flex p-0">
                        <Input
                          type="text"
                          placeholder="Phone Number"
                          className="m-0"
                          style={{ width: "100%" }}
                          value={this.state.registrationForm.phoneNumber}
                          className="mb-3"
                          onChange={(e) => {
                            this.inputTextHandler(e, "phoneNumber");
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="d-flex p-0 pl-4 col-4 flex-column">
                    <div className="row pr-3 pl-3">
                      <div className="col-5 d-flex p-0 align-items-center">
                        City
                      </div>
                      <div className="col-7 d-flex p-0">
                        <Input
                          type="select"
                          name="select"
                          id="exampleSelect"
                          placeholder="City"
                          value={this.state.registrationForm.city.id}
                          className="m-0"
                          style={{ width: "100%" }}
                          // onChange={(e) => {
                          //   this.changeCity(e);
                          // }}
                          onChange={(e) => {
                            this.changeHandler(e);
                          }}
                        >
                          <option>Choose City..</option>
                          {this.renderCities()}
                        </Input>
                      </div>
                    </div>
                    <div className="row pr-3 pl-3 mt-3">
                      <div className="col-5 d-flex p-0 align-items-center">
                        Subdistrict
                      </div>
                      <div className="col-7 d-flex p-0">
                        <Input
                          type="text"
                          placeholder="Subdistrict"
                          className="m-0"
                          style={{ width: "100%" }}
                          value={this.state.registrationForm.subdistrict}
                          onChange={(e) => {
                            this.inputTextHandler(e, "subdistrict");
                          }}
                        />
                      </div>
                    </div>
                    <div className="row pr-3 pl-3 mt-3">
                      <div className="col-5 d-flex p-0 align-items-center">
                        Area
                      </div>
                      <div className="col-7 d-flex p-0">
                        <Input
                          type="text"
                          placeholder="Area"
                          value={this.state.registrationForm.area}
                          className="m-0"
                          style={{ width: "100%" }}
                          onChange={(e) => {
                            this.inputTextHandler(e, "area");
                          }}
                        />
                      </div>
                    </div>
                    <div className="row pr-3 pl-3 mt-3">
                      <div className="col-5 d-flex p-0 align-items-center">
                        Address
                      </div>
                      <div className="col-7 d-flex p-0">
                        <Input
                          type="textarea"
                          name="text"
                          id="exampleText"
                          placeholder="Address"
                          value={this.state.registrationForm.address}
                          className="m-0"
                          style={{ width: "100%" }}
                          onChange={(e) => {
                            this.inputTextHandler(e, "address");
                          }}
                        />
                      </div>
                    </div>
                    <div className="row pr-3 pl-3 mt-3">
                      <div className="col-5 d-flex p-0 align-items-center">
                        RT / RW
                      </div>
                      <div className="col-7 d-flex p-0">
                        <Row form>
                          <Col md={4} className="">
                            <Input
                              type="text"
                              value={this.state.registrationForm.rt}
                              placeholder="RT"
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
                          <Col md={4}>
                            <Input
                              type="text"
                              placeholder="RW"
                              value={this.state.registrationForm.rw}
                              className="mb-3"
                              onChange={(e) => {
                                this.inputTextHandler(e, "rw");
                              }}
                            />
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="d-flex col-12 p-0 justify-content-end mt-4">
                <ButtonCstm className="mr-2" onClick={this.editUserHandler}>
                  Save
                </ButtonCstm>
                <ButtonCstm className="mr-2" onClick={this.deleteUser}>
                  Delete
                </ButtonCstm>
                <ButtonCstm
                  type="coral-outline"
                  onClick={() => this.toggleModal("editForm")}
                >
                  Cancel
                </ButtonCstm>
              </div>
            </ModalBody>
          </Modal>
        </div>
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
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageUser);
