import React from "react";
import {
  Form,
  Button,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

class Authentication extends React.Component {
  render() {
    return (
      <div className="d-flex border flex-column justify-content-center align-items-center pt-5 pb-3">
        <h3>Login</h3>
        <p>Welcome back, please login to your account</p>
        <Form className="mt-2 col-9 border ">
          <Input type="text" placeholder="Username" className="mb-3" />
          <InputGroup className="mb-3">
            <Input placeholder="Password" type="password" />
            <InputGroupAddon addonType="append">
              <InputGroupAddon addonType="prepend">
                <Button style={{ background: "#f77f00", border: "white" }}>
                  <FontAwesomeIcon icon={faEye} style={{ color: "white" }} />
                </Button>
              </InputGroupAddon>
            </InputGroupAddon>
          </InputGroup>
        </Form>
      </div>
    );
  }
}

export default Authentication;
