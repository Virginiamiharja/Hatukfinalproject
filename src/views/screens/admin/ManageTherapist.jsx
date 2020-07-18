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
} from "@fortawesome/free-solid-svg-icons";
import { Table } from "reactstrap";
import { priceFormatter } from "../../../supports/helpers/formatter";
import Axios from "axios";
import { API_URL, API_URL1 } from "../../../constants/API";
import { connect } from "react-redux";
import { getCities } from "../../../redux/actions";
import ButtonCstm from "../../components/button/Button";
import { Link } from "react-router-dom";

class ManageTherapist extends React.Component {
  state = {
    therapistDetails: [],
    // User account for therapist
    registrationForm: {
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
      specialtyId: 0,
    },

    // woking hour data
    workingHour: {
      therapistId: 0,
      hourId: 0,
      dayId: 0,
    },

    specialties: [],
    clinics: [],
    hours: [],
    days: [],
    arrSpecForm: [],
    arrWorkingHour: [],
    arrSpecialtyData: [],
    showPassword: false,
    searchInput: "",
  };

  // Untuk ganti2 state
  inputTextHandler = (event, form, field, index) => {
    const { value } = event.target;
    // if (index < 0) {
    this.setState({ [form]: { ...this.state[form], [field]: value } });
    // } else if (index >= 0) {
    // }
  };

  fileChangeHandler = (e) => {
    this.setState({
      registrationForm: {
        ...this.state.registrationForm,
        image: e.target.files[0],
      },
    });
  };

  changeCity = (event) => {
    // const { value } = event.target;
    // this.setState({ cityId: value });
    const { value } = event.target;
    this.setState({
      registrationForm: {
        ...this.state.registrationForm,
        city: { ...this.state.registrationForm.city, id: value },
      },
    });
  };

  changeClinic = (event) => {
    // const { value } = event.target;
    // this.setState({ cityId: value });
    const { value } = event.target;
    this.setState({
      therapistForm: {
        ...this.state.therapistForm,
        clinic: { ...this.state.therapistForm.clinic, id: value },
      },
    });
  };

  showPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  fungsiCoba = (event, index) => {
    const { value } = event.target;
    let arrNew = this.state.arrSpecialtyData;

    console.log(arrNew);
    arrNew[index].specialtyId = value;
    console.log(arrNew);

    this.setState({ arrSpecialtyData: arrNew });
  };

  fungsiCoba1 = (event, index) => {
    const { value } = event.target;
    let arrNew = this.state.arrWorkingHour;

    console.log(arrNew);
    arrNew[index].hourId = value;
    console.log(arrNew);

    this.setState({ arrWokingHour: arrNew });
  };

  fungsiCoba2 = (event, index) => {
    const { value } = event.target;
    let arrNew = this.state.arrWorkingHour;

    console.log(arrNew);
    arrNew[index].dayId = value;
    console.log(arrNew);

    this.setState({ arrWokingHour: arrNew });
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
            value={this.state.arrSpecialtyData[index].id}
            // onChange={(e) => {
            //   this.inputTextHandler(e, index);
            // }}
            onChange={(e) => this.fungsiCoba(e, index)}
          >
            <option>Choose Specialty..</option>
            {this.renderSpecialties()}
          </Input>

          <Input
            type="select"
            name="select"
            id="exampleSelect"
            placeholder="Clinic"
            className="mb-3"
            // value={this.state.arrWorkingHour[index].day.id}
            // onChange={(e) => {
            //   this.inputTextHandler(e, index);
            // }}
            onChange={(e) => this.fungsiCoba2(e, index)}
          >
            <option>Choose Hari..</option>
            {this.renderDays()}
          </Input>

          <Input
            type="select"
            name="select"
            id="exampleSelect"
            placeholder="Clinic"
            className="mb-3"
            // value={this.state.arrWorkingHour[index].day.id}
            // onChange={(e) => {
            //   this.inputTextHandler(e, index);
            // }}
            onChange={(e) => this.fungsiCoba1(e, index)}
          >
            <option>Choose Jam ..</option>
            {this.renderHours()}
          </Input>
        </>
      );
    });
  };

  renderSpecialtyData = () => {
    return this.state.arrWorkingHour.map((value) => {
      return (
        <>
          <p>ini jam :{value.hourId}</p>
          <p>ini hari :{value.dayId}</p>
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
    const {
      name,
      username,
      email,
      password,
      phoneNumber,
      image,
      role,
      subdistrict,
      area,
      address,
      rt,
      rw,
    } = this.state.registrationForm;
    let registrationForm = {
      name,
      username,
      email,
      image,
      password,
      phoneNumber,
      role,
      subdistrict,
      area,
      address,
      rt,
      rw,
    };
    let therapistForm = { id, about, experience, jobdesc, serviceFee };
    let formRegister = new FormData();

    formRegister.append(
      "registerForm",
      JSON.stringify({ ...registrationForm, image: null })
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
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  editHandler = (index) => {
    this.setState({
      registrationForm: { ...this.state.therapistDetails[index].user },
      therapistForm: { ...this.state.therapistDetails[index] },
      arrSpecialtyData: [...this.state.therapistDetails[index].specialties],
    });
    console.log(this.state.arrSpecialtyData);
  };

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
                // Kenapa ini beda fungsi, karena paramsnya beda, biar ga pusing nanti pisahin aja tapi bikin validasi
                // Abis update terapis langsung masukin spesialisasinya yang baru
                return this.state.arrSpecialtyData.map((value, index) => {
                  // ?therapistDetailId=1&specialtyId=${value.specialtyId}
                  Axios.get(
                    `${API_URL1}/therapistdetails/addtherapistspecialty`,
                    // Gangerti kenapa kalo pake params ini harus pake method get kl put sama post gabisa
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
      })
      .catch((err) => {
        console.log(err);
      });
  };

  saveEditTherapist = () => {
    Axios.put(
      `${API_URL1}/therapistdetails/edittherapist`,
      this.state.therapistForm,
      {
        params: {
          clinicId: this.state.therapistForm.clinic.id,
        },
      }
    )
      .then((res) => console.log(res.data))
      .catch((err) => {
        console.log(err);
      });
  };

  addForm = (type) => {
    let arrSpecialtyData = this.state.arrSpecialtyData;
    let arrWokingHour = this.state.arrWorkingHour;
    if (type == "next") {
      this.setState({
        arrSpecialtyData: [
          ...this.state.arrSpecialtyData,
          { ...this.state.specialtyData },
        ],
        arrWorkingHour: [
          ...this.state.arrWorkingHour,
          { ...this.state.workingHour },
        ],
      });
    } else if (type == "prev") {
      arrSpecialtyData.pop();
      arrWokingHour.pop();
      this.setState({
        arrSpecialtyData: arrSpecialtyData,
        arrWorkingHour: arrWokingHour,
      });
    }
  };
  //

  getTherapistDetails = (sortType = "") => {
    Axios.get(`${API_URL1}/therapistdetails`, {
      params: {
        sortType,
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

  SearchTherapist = (event) => {
    const { value } = event.target;
    this.setState({ searchInput: value });
  };

  renderTherapistSpecialties = (index) => {
    return this.state.therapistDetails[index].specialties.map((value) => {
      return <>{value.specialtyName}&nbsp;</>;
    });
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
              <td style={{ color: "#84c4d4" }}>{value.user.name}</td>
              <td>{value.clinic.clinicName}</td>
              <td style={{ color: "#84c4d4" }}>{value.jobdesc}</td>
              <td>{priceFormatter(value.serviceFee)}</td>
              <td>
                <ButtonCstm onClick={() => this.editHandler(index)}>
                  Edit
                </ButtonCstm>
              </td>
              <td>
                <ButtonCstm onClick={() => this.deleteHandler(value.id)}>
                  Delete
                </ButtonCstm>
              </td>
            </tr>
            <tr>
              <td colSpan={5} className="">
                <div className="d-flex p-2 col-12">
                  <div className="d-flex flex-column justify-content-center align-items-center col-3">
                    <img
                      src={value.user.image}
                      className="rounded-circle"
                      style={{ width: "70%" }}
                    />
                  </div>

                  <div className="flex-column col-12 col-lg-5">
                    <h4 className="mb-0" style={{ color: "#fc8454" }}>
                      {value.user.name}
                    </h4>
                    <p className="mb-3" style={{ fontSize: "17px" }}>
                      {value.jobdesc}
                    </p>

                    <div className="d-flex mb-1 flex-column flex-xl-row align-items-center">
                      <FontAwesomeIcon
                        icon={faHospital}
                        style={{ fontSize: "15px", color: "#84c4d4" }}
                      />
                      <p className="ml-2" style={{ fontSize: "13px" }}>
                        {value.clinic.clinicName}
                      </p>
                    </div>

                    <div className="d-flex flex-column flex-xl-row align-items-center">
                      <FontAwesomeIcon
                        icon={faStethoscope}
                        style={{ fontSize: "15px", color: "#84c4d4" }}
                      />
                      <p className="ml-2" style={{ fontSize: "13px" }}>
                        {this.renderTherapistSpecialties(index)}
                      </p>
                    </div>

                    <div className="d-flex flex-column flex-xl-row align-items-center">
                      <FontAwesomeIcon
                        icon={faStar}
                        style={{ fontSize: "15px", color: "#84c4d4" }}
                      />
                      <p className="ml-2" style={{ fontSize: "13px" }}>
                        {this.renderTherapistSpecialties(index)}
                      </p>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </>
        );
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
        {/* Form gajelas */}
        <Form className="d-flex flex-column justify-content-center align-items-center mt-2">
          <Input
            type="text"
            placeholder="Full Name"
            value={this.state.registrationForm.name}
            className="mb-3"
            onChange={(e) => {
              this.inputTextHandler(e, "registrationForm", "name");
            }}
          />
          <Input
            type="text"
            placeholder="Username"
            value={this.state.registrationForm.username}
            className="mb-3"
            onChange={(e) => {
              this.inputTextHandler(e, "registrationForm", "username");
            }}
          />
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Input
                  type="email"
                  placeholder="Email"
                  value={this.state.registrationForm.email}
                  className="mb-3"
                  onChange={(e) => {
                    this.inputTextHandler(e, "registrationForm", "email");
                  }}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <InputGroup className="mb-3">
                  <Input
                    placeholder="Password"
                    type={this.state.showPassword ? "text" : "password"}
                    onChange={(e) => {
                      this.inputTextHandler(e, "registrationForm", "password");
                    }}
                  />
                  <InputGroupAddon addonType="append">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText
                        style={{ background: "#84c4d4", border: "white" }}
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
              </FormGroup>
            </Col>
          </Row>
          <Input
            type="text"
            placeholder="Phone Number"
            value={this.state.registrationForm.phoneNumber}
            className="mb-3"
            onChange={(e) => {
              this.inputTextHandler(e, "registrationForm", "phoneNumber");
            }}
          />
          <FormGroup className="w-100">
            <Input
              type="file"
              name="file"
              id="exampleFile"
              onChange={this.fileChangeHandler}
            />
            <FormText color="muted">Upload profile picture</FormText>
          </FormGroup>
        </Form>

        {/* Section 2 */}
        <Form
          className="d-flex flex-column justify-content-center align-items-center"
          // style={{ marginTop: "21px" }}
        >
          <Input
            type="select"
            name="select"
            id="exampleSelect"
            placeholder="City"
            value={this.state.registrationForm.city.id}
            className="mb-3"
            onChange={(e) => {
              this.changeCity(e);
            }}
          >
            <option>Choose City..</option>
            {this.renderCities()}
          </Input>
          <Input
            type="text"
            placeholder="Subdistrict"
            value={this.state.registrationForm.subdistrict}
            className="mb-3"
            onChange={(e) => {
              this.inputTextHandler(e, "registrationForm", "subdistrict");
            }}
          />
          <Input
            type="text"
            placeholder="Area"
            value={this.state.registrationForm.area}
            className="mb-3"
            onChange={(e) => {
              this.inputTextHandler(e, "registrationForm", "area");
            }}
          />
          <Input
            type="textarea"
            name="text"
            id="exampleText"
            placeholder="Address"
            value={this.state.registrationForm.address}
            className="mb-3"
            onChange={(e) => {
              this.inputTextHandler(e, "registrationForm", "address");
            }}
          />
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Input
                  type="text"
                  value={this.state.registrationForm.rt}
                  placeholder="RT"
                  className="mb-3"
                  onChange={(e) => {
                    this.inputTextHandler(e, "registrationForm", "rt");
                  }}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Input
                  type="text"
                  placeholder="RW"
                  value={this.state.registrationForm.rw}
                  className="mb-3"
                  onChange={(e) => {
                    this.inputTextHandler(e, "registrationForm", "rw");
                  }}
                />
              </FormGroup>
              {/* Section 3 */}
              <Input
                type="text"
                placeholder="About"
                value={this.state.therapistForm.about}
                className="mb-3"
                onChange={(e) => {
                  this.inputTextHandler(e, "therapistForm", "about");
                }}
              />
              <Input
                type="text"
                placeholder="Experience"
                value={this.state.therapistForm.experience}
                className="mb-3"
                onChange={(e) => {
                  this.inputTextHandler(e, "therapistForm", "experience");
                }}
              />
              <Input
                type="text"
                placeholder="Job Description"
                className="mb-3"
                value={this.state.therapistForm.jobdesc}
                onChange={(e) => {
                  this.inputTextHandler(e, "therapistForm", "jobdesc");
                }}
              />
              <Input
                type="text"
                placeholder="Service Fee"
                value={this.state.therapistForm.serviceFee}
                className="mb-3"
                onChange={(e) => {
                  this.inputTextHandler(e, "therapistForm", "serviceFee");
                }}
              />
              <Input
                type="select"
                name="select"
                value={this.state.therapistForm.clinic.id}
                id="exampleSelect"
                placeholder="Clinic"
                className="mb-3"
                onChange={(e) => {
                  this.changeClinic(e);
                }}
              >
                <option>Choose Clinic..</option>
                {this.renderClinics()}
              </Input>

              {/* Section 4 */}
              {this.renderSpecialtyForm()}
              {this.renderSpecialtyData()}
              {/* {this.fungsiCoba()} */}
              {/* {console.log(this.state.arrSpecialtyData[1])} */}
              {this.state.specForm}
            </Col>
          </Row>
          <ButtonCstm
            onClick={() => this.addForm("next")}
            className="mb-2"
            type="coral"
            style={{ width: "100%" }}
          >
            Add Specialty
          </ButtonCstm>
          <ButtonCstm
            onClick={() => this.addForm("prev")}
            className="mb-2"
            type="coral"
            style={{ width: "100%" }}
          >
            Remove Specialty
          </ButtonCstm>
          <ButtonCstm
            onClick={this.registrationHandler}
            // onClick={this.saveEdit}
            // onClick={this.saveEditTherapist}
            className="mb-2"
            type="coral"
            style={{ width: "100%" }}
          >
            Register
          </ButtonCstm>
        </Form>
        {/*  */}
        <TitleBar title="Manage Therapist" />
        <div className="d-flex p-4 col-12 justify-content-center flex-column align-items-center">
          <div className="d-flex flex-column col-11">
            <h2 className="m-0">List of Therapist</h2>
            <p className="mt-2">
              Sed orci nibh, ullamcorper vitae scelerisque non, fermentum eu
              diam. Mauris vitae libero efficitur, lacinia nibh scelerisque,
              pellentesque leo. Vivamus quis nisi elit. Cras egestas rhoncus
              pulvinar. Curabitur vitae augue sollicitudin, tincidunt ex sed,
              dignissim quam.
            </p>
          </div>

          <div className="d-flex mt-4 col-11">
            <Table className="mb-0 col-9" bordered>
              <thead>
                <tr>
                  <th
                    style={{
                      backgroundColor: "#84c4d4",
                      color: "white",
                    }}
                  >
                    No
                  </th>
                  <th>Name</th>
                  <th>Clinic</th>
                  <th>Specialization</th>
                  <th>Fee</th>
                </tr>
              </thead>
              <tbody>{this.renderTherapist()}</tbody>
            </Table>

            <div className="d-flex col-3 justify-content-end">
              <div
                className="row col-12 rounded p-4 flex-column"
                style={{
                  backgroundColor: "#f4cc3c",
                  color: "white",
                  height: "150px",
                }}
              >
                <h5 className="mb-2">Search</h5>
                <InputGroup className="">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText
                      style={{ background: "#ffffff", border: "white" }}
                    >
                      <FontAwesomeIcon
                        icon={faSearch}
                        style={{ color: "black" }}
                      />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Find therapist!"
                    style={{ background: "#ffffff", border: "white" }}
                    onChange={(e) => {
                      this.SearchTherapist(e);
                    }}
                  />
                </InputGroup>
              </div>
            </div>
          </div>
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
