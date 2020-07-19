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

class ManageTherapist extends React.Component {
  state = {
    therapistDetails: [],
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
    // Ini sebenernya city bisa disatuin didalem form register cuma error di backend dia bilang unrecognized field
    cityId: 0,

    // therapist data
    therapistForm: {
      id: 0,
      about: "",
      experience: "",
      jobdesc: "",
      serviceFee: 0,
      // Jadi request param
      clinic: {
        id: 0,
        clinicName: "",
      },
      userId: 0,
    },

    // schedule data
    scheduleData: {
      therapistId: 0,
      hourId: 0,
      dayId: 0,
    },

    // specialty data
    specialtyData: {
      therapistDetailId: 0,
      id: 0,
    },

    // woking hour data
    workingHour: {
      therapistId: 0,
      hourId: 0,
      dayId: 0,
    },

    offset: 0,
    addForm: false,
    editForm: false,
    formOpen: false,
    specialties: [],
    clinics: [],
    hours: [],
    days: [],
    arrSpecForm: [],
    arrWorkingHour: [],
    arrSpecialtyData: [],
    showPassword: false,
    searchInput: "",
    arrTemp: [],
  };

  renderTherapist = () => {
    return this.state.therapistDetails.map((value, index) => {
      if (
        value.user.name
          .toLowerCase()
          .includes(this.state.searchInput.toLowerCase())
      )
        return (
          <>
            <tr>
              <td scope="row">{index + 1}</td>
              <td>{value.user.name}</td>
              <td>{value.clinic.clinicName}</td>
              <td>{value.jobdesc}</td>
              <td>{priceFormatter(value.serviceFee)}</td>
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
      registrationForm: { ...this.state.therapistDetails[index].user },
      therapistForm: { ...this.state.therapistDetails[index] },
      arrSpecialtyData: [...this.state.therapistDetails[index].specialties],
      arrTemp: [
        ...this.state.therapistDetails[index].therapistServiceSchedules,
      ],
      editForm: !this.state.editForm,
    });
    console.log(
      this.state.therapistDetails[index].therapistServiceSchedules.length
    );
    console.log(this.state.arrWorkingHour);
  };

  toggleModal = (type) => {
    this.setState({ [type]: !this.state[type] });
  };

  inputTextHandler = (event, form, field) => {
    const { value } = event.target;
    this.setState({ [form]: { ...this.state[form], [field]: value } });
  };

  showPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  addForm = (type, form) => {
    let arrSpecialtyData = this.state.arrSpecialtyData;
    let arrWokingHour = this.state.arrWorkingHour;
    if (form == "specialty") {
      if (type == "next") {
        this.setState({
          arrSpecialtyData: [
            ...this.state.arrSpecialtyData,
            { ...this.state.specialtyData },
          ],
        });
      } else if (type == "prev") {
        arrSpecialtyData.pop();
        this.setState({
          arrSpecialtyData: arrSpecialtyData,
        });
      }
    } else if (form == "hour") {
      if (type == "next") {
        this.setState({
          arrWorkingHour: [
            ...this.state.arrWorkingHour,
            { ...this.state.workingHour },
          ],
        });
      } else if (type == "prev") {
        arrWokingHour.pop();
        this.setState({
          arrWorkingHour: arrWokingHour,
        });
      }
    }
  };

  renderSpecialtyForm = () => {
    return this.state.arrSpecialtyData.map((value, index) => {
      return (
        <>
          <Input
            type="select"
            name="select"
            id="exampleSelect"
            placeholder="Clinic"
            className="mb-3"
            style={{ width: "95%" }}
            value={this.state.arrSpecialtyData[index].id}
            // Ini cuma berlaku di add doang
            onChange={(e) => this.changeArrform(e, index, "specialty")}
          >
            <option>Choose Specialty..</option>
            {this.renderSpecialties()}
          </Input>
        </>
      );
    });
  };

  renderScheduleForm = () => {
    return this.state.arrWorkingHour.map((value, index) => {
      return (
        <div className="d-flex p-0 justify-content-between">
          <Input
            type="select"
            name="select"
            id="exampleSelect"
            className="mr-2"
            onChange={(e) => this.changeArrform(e, index, "day")}
          >
            <option>Day</option>
            {this.renderDays()}
          </Input>

          <Input
            type="select"
            name="select"
            id="exampleSelect"
            placeholder="Clinic"
            className="mb-3"
            onChange={(e) => this.changeArrform(e, index, "hour")}
          >
            <option>Time</option>
            {this.renderHours()}
          </Input>
        </div>
      );
    });
  };

  fileChangeHandler = (e) => {
    this.setState({
      registrationForm: {
        ...this.state.registrationForm,
        image: e.target.files[0],
      },
    });
  };

  changeHandler = (event, field, form) => {
    const { value } = event.target;
    this.setState({
      [form]: {
        ...this.state[form],
        [field]: { ...this.state[form][field], id: value },
      },
    });
  };

  getTherapistDetails = () => {
    Axios.get(`${API_URL1}/therapistdetails/pure`)
      .then((res) => {
        console.log(res.data);
        this.setState({ therapistDetails: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  SearchTherapist = (event) => {
    const { value } = event.target;
    this.setState({ searchInput: value });
  };

  changeArrform = (event, index, type) => {
    const { value } = event.target;
    let arrNew;

    if (type == "specialty") {
      arrNew = this.state.arrSpecialtyData;
      arrNew[index].id = value;
      this.setState({ arrSpecialtyData: arrNew });
    } else if (type == "hour") {
      arrNew = this.state.arrWorkingHour;
      arrNew[index].hourId = value;
      this.setState({ arrWokingHour: arrNew });
    } else if (type == "day") {
      arrNew = this.state.arrWorkingHour;
      arrNew[index].dayId = value;
      this.setState({ arrWokingHour: arrNew });
    }
  };

  renderSchedule = () => {
    return this.state.arrTemp.map((value, index) => {
      return (
        <>
          <tr>
            <td scope="row">{index + 1}</td>
            <td>{value.day.dayName}</td>
            <td>{value.hour.hour}</td>
          </tr>
        </>
      );
    });
  };

  showAdd = () => {
    this.setState({
      registrationForm: {
        ...this.state.registrationForm,
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
    });

    this.setState({ addForm: !this.state.addForm });
  };
  //

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

  getSpecialties = () => {
    Axios.get(`${API_URL1}/specialties`)
      .then((res) => {
        console.log(res.data);
        this.setState({ specialties: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getClinics = () => {
    Axios.get(`${API_URL1}/clinics`)
      .then((res) => {
        console.log(res.data);
        this.setState({ clinics: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getHours = () => {
    Axios.get(`${API_URL1}/hours`)
      .then((res) => {
        console.log(res.data);
        this.setState({ hours: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getDays = () => {
    Axios.get(`${API_URL1}/days`)
      .then((res) => {
        console.log(res.data);
        this.setState({ days: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  renderSpecialties = () => {
    return this.state.specialties.map((value) => {
      return <option value={value.id}>{value.specialtyName}</option>;
    });
  };

  renderClinics = () => {
    return this.state.clinics.map((value) => {
      return <option value={value.id}>{value.clinicName}</option>;
    });
  };

  renderDays = () => {
    return this.state.days.map((value) => {
      return <option value={value.id}>{value.dayName}</option>;
    });
  };

  renderHours = () => {
    return this.state.hours.map((value) => {
      return <option value={value.id}>{value.hour}</option>;
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
  //

  // Button save
  // User account for therapist
  registrationHandler = () => {
    const {
      id,
      about,
      experience,
      jobdesc,
      serviceFee,
    } = this.state.therapistForm;
    const { image } = this.state.registrationForm;

    let therapistForm = { id, about, experience, jobdesc, serviceFee };
    let formRegister = new FormData();

    formRegister.append(
      "registerForm",
      JSON.stringify({ ...this.state.registrationForm, image: null })
    );
    formRegister.append("profilePicture", image);

    Axios.post(`${API_URL1}/users/register`, formRegister, {
      params: {
        cityId: this.state.registrationForm.city.id,
      },
    })
      .then((res) => {
        console.log(res.data);
        // Abis daftar user langsung otomatis daftar terapis juga
        Axios.post(
          `${API_URL1}/therapistdetails/addtherapistdetail`,
          therapistForm,
          {
            params: {
              userId: res.data.id,
              clinicId: this.state.therapistForm.clinic.id,
            },
          }
        )
          .then((res) => {
            console.log(res.data);
            // Abis daftar terapis langsung masukin workinghournya
            return this.state.arrWorkingHour.map((value, index) => {
              // ?therapistDetailId=1&specialtyId=${value.specialtyId}
              Axios.get(
                `${API_URL1}/schedules/add`,
                // Gangerti kenapa kalo pake params ini harus pake method get kl put sama post gabisa
                {
                  params: {
                    therapistId: res.data.id,
                    hourId: value.hourId,
                    dayId: value.dayId,
                  },
                }
              )
                .then((res) => {
                  console.log(res.data);
                })
                .catch((err) => {
                  console.log(err);
                });
            });

            // Abis daftar terapis langsung masukin spesialisasinya
            return this.state.arrSpecialtyData.map((value, index) => {
              // ?therapistDetailId=1&specialtyId=${value.specialtyId}
              Axios.get(
                `${API_URL1}/therapistdetails/addtherapistspecialty`,
                // Gangerti kenapa kalo pake params ini harus pake method get kl put sama post gabisa
                {
                  params: {
                    therapistDetailId: res.data.id,
                    specialtyId: value.specialtyId,
                  },
                }
              )
                .then((res) => {
                  console.log(res.data);
                })
                .catch((err) => {
                  console.log(err);
                });
            });
          })
          .catch((err) => {
            console.log(err);
          });
        // Buat ngerefresh
        this.getTherapistDetails();
        this.setState({ addForm: !this.state.addForm });
        swal("Congrats!", "Therapist has been registered", "success");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Belum bisa edit schedule
  saveEdit = () => {
    Axios.put(
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
        // Save data therapist
        Axios.put(
          `${API_URL1}/therapistdetails/edittherapist`,
          this.state.therapistForm,
          {
            params: {
              clinicId: this.state.therapistForm.clinic.id,
            },
          }
        )
          .then((res) => {
            console.log(res.data);
            // Dia delete dulu si data specialty
            Axios.delete(
              `${API_URL1}/therapistdetails/deletetherapistspecialty`,
              {
                params: {
                  therapistId: res.data.id,
                },
              }
            )
              .then((res) => {
                console.log(res.data);
                // Abis update terapis langsung masukin spesialisasinya yang baru
                return this.state.arrSpecialtyData.map((value, index) => {
                  Axios.get(
                    `${API_URL1}/therapistdetails/addtherapistspecialty`,
                    {
                      params: {
                        therapistDetailId: res.data.id,
                        specialtyId: value.id,
                      },
                    }
                  )
                    .then((res) => {
                      console.log(res.data);
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                });
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log(err);
          });
        // Buat ngerefresh
        this.getTherapistDetails();
        this.setState({ editForm: !this.state.editForm });
        swal("CONGRATS", "The data has been updated", "success");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Masih ada salah di back endnya
  deleteTherapist = () => {
    Axios.delete(`${API_URL1}/therapistdetails/deletetherapist`, {
      params: {
        therapistId: this.state.therapistForm.id,
      },
    })
      .then((res) => {
        console.log(res.data);
        swal("Congrats!", "Therapist has been deleted", "success");
        this.getTherapistDetails();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.getTherapistDetails();
    this.props.getCities();
    this.getSpecialties();
    this.getClinics();
    this.getHours();
    this.getDays();
  }

  render() {
    return (
      <>
        {/*  */}
        <TitleBar title="Manage Therapist" />
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
                  placeholder="Find therapist!"
                  style={{ background: "#white", border: "white" }}
                  onChange={(e) => {
                    this.SearchTherapist(e);
                  }}
                />
              </InputGroup>
              {/* Sort - Masih error kalo pake pagination*/}
              {/* <InputGroup className="mr-4" style={{ width: "180px" }}>
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
                  style={{ background: "white", border: "white" }}
                  onChange={(e) => {
                    this.changeSort(e);
                  }}
                >
                  <option>Sort by..</option>
                  <option value="pricedesc">Highest Price</option>
                  <option value="priceasc">Lowest Price</option>
                </Input>
              </InputGroup> */}
              {/* Day */}
              {/* <InputGroup style={{ width: "180px" }}>
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
                  className="mr-4"
                  style={{ background: "white", border: "white" }}
                >
                  <option value="">Status...</option>
                </Input>
              </InputGroup> */}
              <ButtonCstm onClick={this.showAdd} className="">
                Add Therapist
              </ButtonCstm>
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
                  <th>Clinic</th>
                  <th>Job</th>
                  <th>Service Fee</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>{this.renderTherapist()}</tbody>
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

          {/* Modal detail therapist */}
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
                <h4 className="mb-3">Therapist Details</h4>
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
                            this.inputTextHandler(
                              e,
                              "registrationForm",
                              "name"
                            );
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
                            this.inputTextHandler(
                              e,
                              "registrationForm",
                              "username"
                            );
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
                            this.inputTextHandler(
                              e,
                              "registrationForm",
                              "email"
                            );
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
                              this.inputTextHandler(
                                e,
                                "registrationForm",
                                "password"
                              );
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
                            this.inputTextHandler(
                              e,
                              "registrationForm",
                              "phoneNumber"
                            );
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
                            this.changeHandler(e, "city", "registrationForm");
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
                            this.inputTextHandler(
                              e,
                              "registrationForm",
                              "subdistrict"
                            );
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
                            this.inputTextHandler(
                              e,
                              "registrationForm",
                              "area"
                            );
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
                            this.inputTextHandler(
                              e,
                              "registrationForm",
                              "address"
                            );
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
                                this.inputTextHandler(
                                  e,
                                  "registrationForm",
                                  "rt"
                                );
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
                                this.inputTextHandler(
                                  e,
                                  "registrationForm",
                                  "rw"
                                );
                              }}
                            />
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex p-0 col-4 flex-column">
                    <div className="row pr-3 pl-3">
                      <div className="col-5 d-flex p-0 align-items-center">
                        Clinic
                      </div>
                      <div className="col-7 d-flex p-0">
                        <Input
                          type="select"
                          name="select"
                          value={this.state.therapistForm.clinic.id}
                          id="exampleSelect"
                          placeholder="Clinic"
                          // onChange={(e) => {
                          //   this.changeClinic(e);
                          // }}
                          onChange={(e) => {
                            this.changeHandler(e, "clinic", "therapistForm");
                          }}
                        >
                          <option>Choose Clinic..</option>
                          {this.renderClinics()}
                        </Input>
                      </div>
                    </div>
                    <div className="row pr-3 pl-3 mt-3">
                      <div className="col-5 d-flex p-0 align-items-center">
                        Service Fee
                      </div>
                      <div className="col-7 d-flex p-0">
                        <Input
                          type="text"
                          placeholder="Service Fee"
                          value={this.state.therapistForm.serviceFee}
                          onChange={(e) => {
                            this.inputTextHandler(
                              e,
                              "therapistForm",
                              "serviceFee"
                            );
                          }}
                        />
                      </div>
                    </div>
                    <div className="row pr-3 pl-3 mt-3">
                      <div className="col-5 d-flex p-0 align-items-center">
                        Job Description
                      </div>
                      <div className="col-7 d-flex p-0">
                        <Input
                          type="text"
                          placeholder="Job Description"
                          value={this.state.therapistForm.jobdesc}
                          onChange={(e) => {
                            this.inputTextHandler(
                              e,
                              "therapistForm",
                              "jobdesc"
                            );
                          }}
                        />
                      </div>
                    </div>
                    <div className="row pr-3 pl-3 mt-3">
                      <div className="col-5 d-flex p-0 align-items-center">
                        Experience
                      </div>
                      <div className="col-2 d-flex p-0">
                        <Input
                          type="text"
                          placeholder="Experience"
                          value={this.state.therapistForm.experience}
                          style={{ width: "100%" }}
                          onChange={(e) => {
                            this.inputTextHandler(
                              e,
                              "therapistForm",
                              "experience"
                            );
                          }}
                        />
                        <div className="col-5 d-flex pl-2 align-items-center">
                          years
                        </div>
                      </div>
                    </div>
                    <div className="row pr-3 pl-3 mt-3">
                      <div className="col-5 d-flex p-0 align-items-center">
                        About
                      </div>
                      <div className="col-7 d-flex p-0">
                        <Input
                          type="textarea"
                          name="text"
                          id="exampleText"
                          placeholder="About"
                          value={this.state.therapistForm.about}
                          onChange={(e) => {
                            this.inputTextHandler(e, "therapistForm", "about");
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="d-flex p-0 pl-4 col-4 flex-column">
                    <div className="row pr-3 pl-3">
                      <div className="col-5 d-flex p-0 align-items-start">
                        Specialty
                      </div>
                      <div className="col-7 flex-wrap flex-column d-flex p-0">
                        {this.renderSpecialtyForm()}
                        <div className="d-flex justify-content-start">
                          <ButtonCstm
                            onClick={() => this.addForm("next", "specialty")}
                            type="coral"
                            className="mr-2"
                          >
                            +
                          </ButtonCstm>

                          <ButtonCstm
                            onClick={() => this.addForm("prev", "specialty")}
                            type="coral"
                            className=" "
                          >
                            --
                          </ButtonCstm>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex pl-3 col-4 flex-column">
                    <div className="row pl-3">
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
                            <th>Day</th>
                            <th>Time</th>
                          </tr>
                        </thead>
                        <tbody>{this.renderSchedule()}</tbody>
                      </Table>
                    </div>
                  </div>
                </div>
              </div>

              <div className="d-flex col-12 p-0 justify-content-end mt-4">
                <ButtonCstm className="mr-2" onClick={this.saveEdit}>
                  Save
                </ButtonCstm>
                <ButtonCstm className="mr-2" onClick={this.deleteTherapist}>
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

          {/* Modal untuk add form */}
          <Modal
            toggle={() => this.toggleModal("addForm")}
            isOpen={this.state.addForm}
            className="image-modal modal-xl"
          >
            <ModalBody
              className="d-flex p-4 flex-column"
              style={{ backgroundImage: "" }}
            >
              <div className="d-flex p-4 border rounded col-12 flex-column ">
                <h4 className="mb-3">Add Therapist Data</h4>
                <div className="border"></div>
                <div className="d-flex flex-wrap p-0 mt-4">
                  <div className="d-flex p-0 col-4 flex-column">
                    <div className="row pr-3 pl-3">
                      <div className="col-5 d-flex p-0 align-items-center">
                        Name
                      </div>
                      <div className="col-7 d-flex p-0">
                        <Input
                          type="text"
                          placeholder="Name"
                          value={this.state.registrationForm.name}
                          className="m-0"
                          style={{ width: "100%" }}
                          onChange={(e) => {
                            this.inputTextHandler(
                              e,
                              "registrationForm",
                              "name"
                            );
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
                            this.inputTextHandler(
                              e,
                              "registrationForm",
                              "username"
                            );
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
                            this.inputTextHandler(
                              e,
                              "registrationForm",
                              "email"
                            );
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
                              this.inputTextHandler(
                                e,
                                "registrationForm",
                                "password"
                              );
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
                            this.inputTextHandler(
                              e,
                              "registrationForm",
                              "phoneNumber"
                            );
                          }}
                        />
                      </div>
                    </div>
                    <FormGroup className="w-100">
                      <Input
                        type="file"
                        name="file"
                        id="exampleFile"
                        onChange={this.fileChangeHandler}
                      />
                      <FormText color="muted">Upload profile picture</FormText>
                    </FormGroup>
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
                            this.changeHandler(e, "city", "registrationForm");
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
                            this.inputTextHandler(
                              e,
                              "registrationForm",
                              "subdistrict"
                            );
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
                            this.inputTextHandler(
                              e,
                              "registrationForm",
                              "area"
                            );
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
                            this.inputTextHandler(
                              e,
                              "registrationForm",
                              "address"
                            );
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
                                this.inputTextHandler(
                                  e,
                                  "registrationForm",
                                  "rt"
                                );
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
                                this.inputTextHandler(
                                  e,
                                  "registrationForm",
                                  "rw"
                                );
                              }}
                            />
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex pl-4 col-4 flex-column">
                    <div className="row pr-3 pl-3">
                      <div className="col-5 d-flex p-0 align-items-center">
                        Clinic
                      </div>
                      <div className="col-7 d-flex p-0">
                        <Input
                          type="select"
                          name="select"
                          value={this.state.therapistForm.clinic.id}
                          id="exampleSelect"
                          placeholder="Clinic"
                          // onChange={(e) => {
                          //   this.changeClinic(e);
                          // }}
                          onChange={(e) => {
                            this.changeHandler(e, "clinic", "therapistForm");
                          }}
                        >
                          <option>Choose Clinic..</option>
                          {this.renderClinics()}
                        </Input>
                      </div>
                    </div>
                    <div className="row pr-3 pl-3 mt-3">
                      <div className="col-5 d-flex p-0 align-items-center">
                        Service Fee
                      </div>
                      <div className="col-7 d-flex p-0">
                        <Input
                          type="text"
                          placeholder="Service Fee"
                          value={this.state.therapistForm.serviceFee}
                          onChange={(e) => {
                            this.inputTextHandler(
                              e,
                              "therapistForm",
                              "serviceFee"
                            );
                          }}
                        />
                      </div>
                    </div>
                    <div className="row pr-3 pl-3 mt-3">
                      <div className="col-5 d-flex p-0 align-items-center">
                        Job Description
                      </div>
                      <div className="col-7 d-flex p-0">
                        <Input
                          type="text"
                          placeholder="Job Description"
                          value={this.state.therapistForm.jobdesc}
                          onChange={(e) => {
                            this.inputTextHandler(
                              e,
                              "therapistForm",
                              "jobdesc"
                            );
                          }}
                        />
                      </div>
                    </div>
                    <div className="row pr-3 pl-3 mt-3">
                      <div className="col-5 d-flex p-0 align-items-center">
                        Experience
                      </div>
                      <div className="col-2 d-flex p-0">
                        <Input
                          type="text"
                          placeholder="Experience"
                          value={this.state.therapistForm.experience}
                          style={{ width: "100%" }}
                          onChange={(e) => {
                            this.inputTextHandler(
                              e,
                              "therapistForm",
                              "experience"
                            );
                          }}
                        />
                        <div className="col-5 d-flex pl-2 align-items-center">
                          years
                        </div>
                      </div>
                    </div>
                    <div className="row pr-3 pl-3 mt-3">
                      <div className="col-5 d-flex p-0 align-items-center">
                        About
                      </div>
                      <div className="col-7 d-flex p-0">
                        <Input
                          type="textarea"
                          name="text"
                          id="exampleText"
                          placeholder="About"
                          value={this.state.therapistForm.about}
                          onChange={(e) => {
                            this.inputTextHandler(e, "therapistForm", "about");
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="d-flex p-0 col-4 flex-column">
                    <div className="row pr-3 pl-3">
                      <div className="col-5 d-flex p-0 align-items-start">
                        Specialty
                      </div>
                      <div className="col-7 flex-wrap flex-column d-flex p-0">
                        {this.renderSpecialtyForm()}
                        <div className="d-flex justify-content-start">
                          <ButtonCstm
                            onClick={() => this.addForm("next", "specialty")}
                            type="coral"
                            className="mr-2"
                          >
                            +
                          </ButtonCstm>

                          <ButtonCstm
                            onClick={() => this.addForm("prev", "specialty")}
                            type="coral"
                            className=" "
                          >
                            --
                          </ButtonCstm>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex pl-4 col-4 flex-column">
                    <div className="row pr-3 pl-3">
                      <div className="col-5 d-flex p-0 align-items-start">
                        Service Schedule
                      </div>
                      <div className="col-7  flex-wrap flex-column d-flex pl-1">
                        {this.renderScheduleForm()}
                        <div className="d-flex justify-content-start">
                          <ButtonCstm
                            onClick={() => this.addForm("next", "hour")}
                            type="coral"
                            className="mr-2"
                          >
                            +
                          </ButtonCstm>

                          <ButtonCstm
                            onClick={() => this.addForm("prev", "hour")}
                            type="coral"
                            className=" "
                          >
                            --
                          </ButtonCstm>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="d-flex col-12 p-0 justify-content-end mt-4">
                <ButtonCstm className="mr-2" onClick={this.registrationHandler}>
                  Save
                </ButtonCstm>
                <ButtonCstm
                  type="coral-outline"
                  onClick={() => this.toggleModal("addForm")}
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageTherapist);

{
  /* 
{this.renderScheduleForm()}
                        <div className="d-flex justify-content-between">
                          <ButtonCstm
                            onClick={() => this.addForm("next", "hour")}
                            type="coral"
                            className=""
                          >
                            +
                          </ButtonCstm>

                          <ButtonCstm
                            onClick={() => this.addForm("prev", "hour")}
                            type="coral"
                            className=" "
                          >
                            --
                          </ButtonCstm>
                        </div>

}

// {this.renderSpecialtyData()}
// {/* {this.fungsiCoba()} */
}
// {/* {console.log(this.state.arrSpecialtyData[1])} */}
// {this.state.specForm}
//   </Col>
// </Row>

// <ButtonCstm
//   onClick={this.registrationHandler}
//   // onClick={this.saveEdit}
//   // onClick={this.saveEditTherapist}
//   className="mb-2"
//   type="coral"
//   style={{ width: "100%" }}
// >
//   Register
// </ButtonCstm>
// </Form> */}
