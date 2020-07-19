import React from "react";
import "./ForgotPassword.css";
import {
  InputGroupText,
  InputGroup,
  InputGroupAddon,
  Input,
  Alert,
  FormGroup,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import ButtonCstm from "../../components/button/Button";
import Axios from "axios";
import { API_URL1 } from "../../../constants/API";
import TitleBar from "../../components/titlebar/TitleBar";
import swal from "sweetalert";

class ResetPassword extends React.Component {
  state = {
    showPassword: false,
    newPassword: "",
  };

  showPassword = () => {
    this.setState({
      showPassword: !this.state.showPassword,
    });
  };

  inputTextHandler = (event) => {
    const { value } = event.target;
    this.setState({ newPassword: value });
  };

  resetPassword = () => {
    Axios.put(
      `${API_URL1}/users/resetpassword`,
      {
        password: this.state.newPassword,
      },
      {
        params: {
          userId: this.props.match.params.userId,
        },
      }
    )
      .then((res) => {
        console.log(res);
        swal("Congrats!", "Your password has been changed", "success");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <>
        <TitleBar title="Reset Password" />

        {/* Section 2 */}
        <div className="d-flex flex-column border justify-content-center align-items-center p-4">
          <h3 className="mb-2">Reset Password</h3>
          <p className="text-center mb-3">
            Please enter your new password make sure it contains
            <br />
            uppercase, lowercase, and digits
          </p>

          <div className="col-4">
            <FormGroup className="mb-3">
              <InputGroup className="">
                <Input
                  placeholder="Password"
                  type={this.state.showPassword ? "text" : "password"}
                  onChange={(e) => {
                    this.inputTextHandler(e);
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
            <ButtonCstm
              type="coral"
              className="w-100"
              onClick={this.resetPassword}
            >
              Reset Password
            </ButtonCstm>
          </div>
        </div>
      </>
    );
  }
}

export default ResetPassword;
