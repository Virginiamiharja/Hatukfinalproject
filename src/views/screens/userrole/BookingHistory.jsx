import React from "react";
import Axios from "axios";
import { API_URL1 } from "../../../constants/API";
import { faSearch, faFilter, faSort } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
  Table,
} from "reactstrap";
import { connect } from "react-redux";

class BookingRequest extends React.Component {
  state = {
    bookingHistory: {
      id: 0,
      requests: [
        {
          id: 0,
          serviceDate: "",
          status: "",
        },
      ],
    },
  };

  getBookingHistory = () => {
    Axios.get(`${API_URL1}/users/userprofile`, {
      params: {
        userId: this.props.user.id,
      },
    })
      .then((res) => {
        console.log(res.data);
        this.setState({ bookingHistory: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  renderBookingHistory = () => {
    const { requests } = this.state.bookingHistory;
    return requests.map((val) => {
      return (
        <div>
          {val.serviceDate} {val.status}
        </div>
      );
    });
  };

  componentDidMount() {
    this.getBookingHistory();
  }

  render() {
    return (
      <>
        {/* Section 1 */}
        <div
          className="d-flex justify-content-start col-12 p-4 therapist-body"
          style={{ background: "#fc8454" }}
        >
          <h6 className="mb-0">Booking History</h6>
        </div>

        {/* Section 2 */}
        <div className="d-flex justify-content-center col-12 p-4">
          {/* Filter 1 */}
          {/* By City */}
          <div className="col-3 mr-2">
            <div className="d-flex flex-column p-4 border rounded ">
              <h5 className="mb-3">Choose Status</h5>
              <div className="mb-3 border"></div>
              <FormGroup check className="">
                <Label check>
                  <Input
                    type="radio"
                    name="radio1"
                    onChange={(e) => {
                      this.cityFilter(e);
                    }}
                    value=""
                  />
                  All Status
                </Label>
              </FormGroup>
              {/* {this.renderCity()} */}
            </div>
          </div>

          {/* Filter and Content */}
          <div className="d-flex flex-column col-7">
            {/* Filter */}
            {/* Filter 2 */}
            <FormGroup className="align-items-center row mb-0">
              <InputGroup className="mr-4" style={{ width: "450px" }}>
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
                  style={{ background: "#f2f2f2", border: "white" }}
                  onChange={(e) => {
                    this.SearchTherapist(e);
                  }}
                />
              </InputGroup>
              <InputGroup style={{ width: "280px" }}>
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
                  style={{ background: "#f2f2f2", border: "white" }}
                  onChange={(e) => {
                    this.changeSort(e);
                  }}
                >
                  <option>Choose..</option>
                  <option value="ratingdesc">Highest to Lowest Rating</option>
                  <option value="ratingasc">Lowest to Highest Rating</option>
                  <option value="pricedesc">Highest to Lowest Price</option>
                  <option value="priceasc">Lowest to Highest Price</option>
                </Input>
              </InputGroup>
            </FormGroup>

            {/* Content */}
            <div className="row mt-4">
              <Table className="rounded border mb-0" responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Table heading</th>
                    <th>Table heading</th>
                    <th>Table heading</th>
                    <th>Table heading</th>
                    <th>Table heading</th>
                    <th>Table heading</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                  </tr>
                </tbody>
              </Table>
            </div>
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

export default connect(mapStateToProps)(BookingRequest);
