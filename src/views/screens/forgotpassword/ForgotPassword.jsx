import React from "react";
import "./ForgotPassword.css";
import {
  InputGroupText,
  InputGroup,
  InputGroupAddon,
  Input,
  FormGroup,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import ButtonCstm from "../../components/button/Button";
import { connect } from "react-redux";
import { forgotPassword } from "../../../redux/actions";

class ForgotPassword extends React.Component {
  state = {
    email: "",
  };

  inputTextHandler = (event) => {
    const { value } = event.target;
    this.setState({ email: value });
  };

  render() {
    return (
      <>
        {/* Section 1 */}
        <div
          className="d-flex justify-content-start col-12 p-4 therapist-body"
          style={{ background: "#fc8454" }}
        >
          <h6 className="mb-0">Forgot Password</h6>
        </div>

        {/* Section 2 */}
        <div className="d-flex flex-column justify-content-center align-items-center p-4">
          <h3 className="mb-2">Forgot Your Password?</h3>
          <p className="text-center mb-3">
            Please enter your email address and we will
            <br />
            send you a link to reset your password
          </p>

          <div className="col-4">
            <FormGroup className="mb-3">
              <InputGroup className="">
                <Input
                  placeholder="Email"
                  type="email"
                  onChange={(e) => {
                    this.inputTextHandler(e);
                  }}
                />
                <InputGroupAddon addonType="append">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText
                      style={{ background: "#84c4d4", border: "white" }}
                    >
                      <FontAwesomeIcon
                        icon={faEnvelope}
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
              onClick={() => this.props.forgotPassword(this.state.email)}
            >
              Send Verification Link
            </ButtonCstm>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = {
  forgotPassword,
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
