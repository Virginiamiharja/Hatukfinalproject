import React from "react";
import {
  Form,
  InputGroupText,
  InputGroup,
  InputGroupAddon,
  Input,
  Alert,
  Row,
  Col,
  FormGroup,
  FormText,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteRight, faEye } from "@fortawesome/free-solid-svg-icons";
import ButtonCstm from "../../components/button/Button";
import { Link } from "react-router-dom";
import "./Authentication.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { connect } from "react-redux";
import { loginHandler, registrationHandler } from "../../../redux/actions";
import Cookie from "universal-cookie";
import { API_URL1 } from "../../../constants/API";
import Axios from "axios";
import { Redirect } from "react-router-dom";

const cookieObject = new Cookie();

class Authentication extends React.Component {
  state = {
    visible: true,
    activePage: false,
    loginForm: {
      username: "",
      password: "",
      showPassword: false,
    },
    registrationForm: {
      name: "",
      username: "",
      email: "",
      password: "",
      phoneNumber: "",
      image: null,
      role: "user",
      subdistrict: "",
      area: "",
      address: "",
      rt: "",
      rw: "",
      showPassword: false,
    },
    // Ini sebenernya city bisa disatuin didalem form register cuma error di backend dia bilang unrecognized field
    cityId: 0,
    cities: [],
  };

  inputTextHandler = (event, form, field) => {
    const { value } = event.target;
    this.setState({ [form]: { ...this.state[form], [field]: value } });
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
    const { value } = event.target;
    this.setState({ cityId: value });
  };

  showPassword = (form) => {
    this.setState({
      [form]: {
        ...this.state[form],
        showPassword: !this.state[form].showPassword,
      },
    });
  };

  // showErrorMsg = () => {
  //   if (this.props.user.errMsg) {
  //     if (this.state.activePage) {
  //       return (
  //         <Alert
  //           color="danger"
  //           isOpen={this.state.visible}
  //           toggle={this.onDismiss}
  //           className="mt-2"
  //         >
  //           <strong>Error!</strong> Wrong username or password
  //         </Alert>
  //       );
  //     } else {
  //       return (
  //         <Alert
  //           color="danger"
  //           isOpen={this.state.visible}
  //           toggle={this.onDismiss}
  //           className="mt-2"
  //         >
  //           <strong>Error!</strong> Username has been registered
  //         </Alert>
  //       );
  //     }
  //   }
  // };

  onDismiss = () => {
    this.setState({ visible: !this.state.visible });
  };

  getCities = () => {
    Axios.get(`${API_URL1}/cities`)
      .then((res) => {
        this.setState({ cities: res.data });
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  renderCities = () => {
    return this.state.cities.map((value) => {
      return (
        <>
          <option value={value.id}>{value.cityName}</option>
        </>
      );
    });
  };

  loginHandler = () => {
    const { username, password } = this.state.loginForm;
    let userLogin = {
      username,
      password,
    };

    this.props.loginHandler(userLogin);
  };

  registrationHandler = () => {
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
    let userRegister = {
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
    };
    this.props.registrationHandler(userRegister, this.state.cityId);
  };

  changePage = () => {
    this.setState({ activePage: !this.state.activePage });
  };

  componentDidUpdate() {
    if (this.props.user.id) {
      cookieObject.set("authData", JSON.stringify(this.props.user), {
        path: "/",
      });
    }
  }

  componentDidMount() {
    this.getCities();
  }

  render() {
    // Props dari slider
    const settings = {
      dots: true,
      arrows: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };

    const { showPassword } = this.state.loginForm;

    if (this.props.user.id > 0) return <Redirect to="/" />;
    if (this.state.activePage) {
      return (
        // Login Page
        <div className="d-flex flex-column flex-lg-row justify-content-center align-items-center p-4">
          {/* Section 1 */}
          <div className="d-flex flex-column col-4">
            <h3>Login</h3>
            {/* Quotes */}
            <div className="d-flex">
              <FontAwesomeIcon
                icon={faQuoteRight}
                className="mb-2"
                style={{ color: "#f4cc3c", fontSize: "35px" }}
              />
              <p className="p-2">
                A child is a beam of sunlight from the Infinite and Eternal,
                with possibilities of virtue and vice, but as yet unstained.
              </p>
            </div>
            {/* Error message */}
            {/* {this.showErrorMsg()} */}
            {/* Form login */}
            <Form className="d-flex flex-column justify-content-center align-items-center mt-2">
              <Input
                type="text"
                placeholder="Username or Email"
                className="mb-3"
                onChange={(e) => {
                  this.inputTextHandler(e, "loginForm", "username");
                }}
              />
              <InputGroup className="mb-3">
                <Input
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => {
                    this.inputTextHandler(e, "loginForm", "password");
                  }}
                />
                <InputGroupAddon addonType="append">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText
                      style={{ background: "#84c4d4", border: "white" }}
                      onClick={() => {
                        this.showPassword("loginForm");
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
              <ButtonCstm
                onClick={this.loginHandler}
                className="mb-2"
                type="coral"
                style={{ width: "100%" }}
              >
                Login
              </ButtonCstm>
              <p>
                Forgot password? Click{" "}
                <Link className="auth-link" to="/forgotpassword">
                  here!
                </Link>
              </p>
            </Form>
          </div>

          {/* Section 2 */}
          <div className="col-4">
            <Slider {...settings}>
              <div>
                <img
                  src="https://www.lifeskills4kids.com.au/wp-content/uploads/2017/10/kid-with-tidy-desk.jpeg"
                  alt=""
                  style={{ width: "100%" }}
                  className="rounded"
                />
              </div>
              <div>
                <img
                  src="https://oupeltglobalblog.com/wp-content/uploads/2013/12/kids-in-classroom.jpg?w=400"
                  alt=""
                  style={{ width: "100%" }}
                  className="rounded"
                />
              </div>
              <div>
                <img
                  src="https://www.wrightslaw.com/images/bs/class.young.kids.jpg"
                  alt=""
                  style={{ width: "100%" }}
                  className="rounded"
                />
              </div>
            </Slider>
          </div>
        </div>
      );
    } else {
      return (
        // Registration Page
        <div className="d-flex flex-column flex-lg-row justify-content-center align-items-end p-4">
          {/* Section 1 */}
          <div className="d-flex flex-column col-4">
            <h3>Register</h3>
            {/* Quotes */}
            <div className="d-flex">
              <FontAwesomeIcon
                icon={faQuoteRight}
                className="mb-2"
                style={{ color: "#f4cc3c", fontSize: "35px" }}
              />
              <p className="p-2">
                The potential possibilities of any child are the most intriguing
                and stimulating in all creation.
              </p>
            </div>
            {/* Error message */}
            {/* {this.showErrorMsg()} */}
            {/* Registration Page */}
            <Form className="d-flex flex-column justify-content-center align-items-center mt-2">
              <Input
                type="text"
                placeholder="Full Name"
                className="mb-3"
                onChange={(e) => {
                  this.inputTextHandler(e, "registrationForm", "name");
                }}
              />
              <Input
                type="text"
                placeholder="Username"
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
                        type={showPassword ? "text" : "password"}
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
                            style={{ background: "#84c4d4", border: "white" }}
                            onClick={() => {
                              this.showPassword("loginForm");
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
          </div>

          {/* Section 2 */}
          <div className="col-4">
            <Form
              className="d-flex flex-column justify-content-center align-items-center"
              // style={{ marginTop: "21px" }}
            >
              <Input
                type="select"
                name="select"
                id="exampleSelect"
                placeholder="City"
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
                className="mb-3"
                onChange={(e) => {
                  this.inputTextHandler(e, "registrationForm", "subdistrict");
                }}
              />
              <Input
                type="text"
                placeholder="Area"
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
                      className="mb-3"
                      onChange={(e) => {
                        this.inputTextHandler(e, "registrationForm", "rw");
                      }}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <ButtonCstm
                onClick={this.registrationHandler}
                className="mb-2"
                type="coral"
                style={{ width: "100%" }}
              >
                Register
              </ButtonCstm>
              <p>
                Have an account?{" "}
                <Link className="auth-link" onClick={this.changePage}>
                  Login!
                </Link>
              </p>
            </Form>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = {
  loginHandler,
  registrationHandler,
};

export default connect(mapStateToProps, mapDispatchToProps)(Authentication);
