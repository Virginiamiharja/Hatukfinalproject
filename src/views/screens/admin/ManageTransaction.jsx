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
  Button,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faFilter,
  faSort,
  faStar,
  faStethoscope,
  faHospital,
  faUpload,
  faArrowAltCircleLeft,
  faArrowAltCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import { Table } from "reactstrap";
import { priceFormatter } from "../../../supports/helpers/formatter";
import Axios from "axios";
import { API_URL, API_URL1 } from "../../../constants/API";
import swal from "sweetalert";
import SideBar from "../../components/sidebar/SideBar";
import ButtonCstm from "../../components/button/Button";
import { Modal, ModalBody } from "reactstrap";
import { connect } from "react-redux";
import { changeStatus } from "../../../redux/actions";

class ManageTransaction extends React.Component {
  state = {
    transactions: [],
    searchInput: "",
    formOpen: false,
    editForm: false,
    image: "",
    offset: 0,
    editTransaction: {
      id: 0,
      totalPrice: 0,
      image: "",
      status: "",
      reason: "",
      createdAt: "",
    },
  };

  getTransaction = (offset = 0, type = "latest") => {
    Axios.get(`${API_URL1}/transactions`, {
      params: {
        offset: offset,
        type: type,
      },
    })
      .then((res) => {
        console.log(res.data);
        this.setState({ transactions: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  toggleModal = (type) => {
    if (type == "photo") {
      this.setState({ formOpen: !this.state.formOpen });
    } else if (type == "edit") {
      this.setState({ editForm: !this.state.editForm });
    }
  };

  renderTransaction = () => {
    var date;

    return this.state.transactions.map((value, index) => {
      date = new Date(value.createdAt);
      return (
        <>
          <tr>
            {/* Ditambahin offset biar kalo ke next dia nomornya tetep lanjut */}
            <td>{this.state.offset + index + 1}</td>
            <td>Nama Terapis</td>
            <td>{priceFormatter(value.totalPrice)}</td>
            <td>
              {date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}
            </td>
            <td>
              <ButtonCstm
                type=""
                onClick={() => {
                  this.openHandler(index, "photo");
                }}
              >
                Open
              </ButtonCstm>
            </td>
            <td>{value.status}</td>
            <td>
              <ButtonCstm
                onClick={() => {
                  this.openHandler(index, "edit");
                }}
              >
                Detail
              </ButtonCstm>
            </td>
          </tr>
        </>
      );
    });
  };

  openHandler = (index, type) => {
    if (type == "photo") {
      this.setState({
        formOpen: !this.state.formOpen,
        image: this.state.transactions[index].image,
      });
    } else if (type == "edit") {
      this.setState({
        editTransaction: { ...this.state.transactions[index] },
        editForm: !this.state.editForm,
      });
    }
  };

  renderPagination = () => {
    return (
      <div className="d-flex p-0 mt-4 flex-wrap justify-content-between">
        <div className="d-flex p-0" onClick={() => this.pagination("prev")}>
          {/* {this.state.offset == 0 ? null : ( */}
          <FontAwesomeIcon
            icon={faArrowAltCircleLeft}
            style={{ color: "#fc8454", fontSize: "35px" }}
          />
          {/* )} */}
        </div>
        <div className="d-flex p-0" onClick={() => this.pagination("next")}>
          {/* Masih bingung nih validasinya */}
          {/* Karena kita limitnya 2 makanya dikali 2 */}
          {/* {this.state.offset * 2 < this.state.therapistDetail.reviews.length ? ( */}
          <FontAwesomeIcon
            icon={faArrowAltCircleRight}
            style={{ color: "#fc8454", fontSize: "35px" }}
          />
          {/* ) : null} */}
        </div>
      </div>
    );
  };

  pagination = (type) => {
    let offset = this.state.offset;
    if (type == "next") {
      offset += 5;
      this.setState({ offset: offset });
    } else if (type == "prev") {
      offset -= 5;
      this.setState({ offset: offset });
    }
    this.getTransaction(offset);
  };

  // Sorting dari back end masih error kalo pake pagination
  changeSort = (event) => {
    const { value } = event.target;
    this.getTransaction(0, value);
  };

  // Kayaknya bakal harus taro di redux supaya nanti bisa dipake di halaman terapis
  save = () => {
    // Axios.put(
    //   `${API_URL1}/transactions/changestatus`,
    //   this.state.editTransaction
    // )
    //   .then((res) => {
    //     console.log(res.data);
    //     swal("CONGRATS", "The transaction has been edited", "success");
    //     this.getTransaction();
    //     this.setState({ editForm: !this.state.editForm });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    this.props.changeStatus(this.state.editTransaction);
    // Temporary
    this.getTransaction();
    this.setState({ editForm: !this.state.editForm });
  };

  changeStatus = (event) => {
    const { value } = event.target;
    this.setState({
      editTransaction: { ...this.state.editTransaction, status: value },
    });
  };

  componentDidMount() {
    this.getTransaction();
  }

  render() {
    // Buat tanggal
    let date;

    return (
      <>
        <TitleBar title="Manage Transaction" />
        <div
          className="d-flex p-4 col-12 justify-content-center align-items-start"
          style={{ backgroundColor: "#f4f4fc" }}
        >
          <div className="d-flex p-0 col-3 flex-column">
            <SideBar />
          </div>
          <div className="d-flex flex-column pl-4 pr-0 col-9">
            <FormGroup className="align-items-center d-flex p-0 mb-4">
              {/* Sort - Masih error kalo pake pagination*/}
              <InputGroup className="mr-4" style={{ width: "180px" }}>
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
                  <option value="oldest">Oldest</option>
                  <option value="latest">Latest</option>
                  <option value="pricedesc">Highest Price</option>
                  <option value="priceasc">Lowest Price</option>
                </Input>
              </InputGroup>
              {/* Day */}
              <InputGroup style={{ width: "180px" }}>
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
                  style={{ background: "white", border: "white" }}
                  // onChange={(e) => {
                  //   this.changeDay(e);
                  // }}
                >
                  <option value="">Filter day..</option>
                </Input>
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
                  <th>Therapist</th>
                  <th>Total Price</th>
                  <th>Booking Date</th>
                  <th>Receipt</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>{this.renderTransaction()}</tbody>
            </Table>
            {this.renderPagination()}

            {/* Modal untuk munculin bukti pembayaran */}
            <Modal
              toggle={() => this.toggleModal("photo")}
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
                      // onChange={this.fileChangeHandler}
                    />
                  </div>
                </div>
                <div className="d-flex col-12 p-0 justify-content-end mt-4">
                  <ButtonCstm className="mr-2" onClick="">
                    Download
                  </ButtonCstm>
                  <ButtonCstm
                    type="coral-outline"
                    onClick={() => this.toggleModal("photo")}
                  >
                    Cancel
                  </ButtonCstm>
                </div>
              </ModalBody>
            </Modal>

            {/* Modal untuk munculin detail */}
            <Modal
              toggle={() => this.toggleModal("edit")}
              isOpen={this.state.editForm}
              className="image-modal"
            >
              <ModalBody className="d-flex p-4 flex-column">
                <div className="d-flex p-4 border rounded col-12 flex-column ">
                  <h4 className="mb-3">Transaction Details</h4>
                  <div className="border"></div>

                  <div className="row pr-3 pl-3 mt-3">
                    <div className="col-5 d-flex p-0 align-items-center">
                      Name
                    </div>
                    <div className="col-7 d-flex p-0">
                      <Input
                        className="m-0"
                        style={{ width: "100%" }}
                        value="Nama terapis"
                        disabled
                      />
                    </div>
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
                        value={this.state.editTransaction.createdAt.substr(
                          0,
                          10
                        )}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="row pr-3 pl-3 mt-3">
                    <div className="col-5 d-flex p-0 align-items-center">
                      Status
                    </div>
                    <div className="col-7 d-flex p-0">
                      <Input
                        type="select"
                        name="select"
                        style={{ width: "100%" }}
                        value={this.state.editTransaction.status}
                        onChange={(e) => {
                          this.changeStatus(e);
                        }}
                        // {this.state.editTransaction.status == "booked" ? disabled : null }
                      >
                        <option>Status..</option>
                        <option value="waiting for payment">
                          Waiting for Payment
                        </option>
                        <option value="pending">Pending</option>
                        <option value="booked">Booked</option>
                        <option value="reject">Reject</option>
                        <option value="reject">Finish</option>
                      </Input>
                    </div>
                  </div>

                  {/* Untuk ngerender inputan reason */}
                  {this.state.editTransaction.reason ||
                  this.state.editTransaction.status == "reject" ? (
                    <div className="row pr-3 pl-3 mt-3">
                      <div className="col-5 d-flex p-0">Reason</div>
                      <div className="col-7 d-flex p-0">
                        <Input
                          type="textarea"
                          className="m-0"
                          style={{ width: "100%" }}
                          value={this.state.editTransaction.reason}
                          onChange={(e) => {
                            this.setState({
                              editTransaction: {
                                ...this.state.editTransaction,
                                reason: e.target.value,
                              },
                            });
                          }}
                        />
                      </div>
                    </div>
                  ) : null}
                </div>
                <div className="d-flex col-12 p-0 justify-content-end mt-4">
                  <ButtonCstm className="mr-2" onClick={this.save}>
                    Save
                  </ButtonCstm>

                  <ButtonCstm
                    type="coral-outline"
                    onClick={() => this.toggleModal("edit")}
                  >
                    Cancel
                  </ButtonCstm>
                </div>
              </ModalBody>
            </Modal>
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
  changeStatus,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageTransaction);
