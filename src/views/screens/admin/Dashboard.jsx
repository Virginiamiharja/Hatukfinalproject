import React from "react";
import TitleBar from "../../components/titlebar/TitleBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faFilter,
  faSort,
  faStar,
  faStethoscope,
  faHospital,
  faTrophy,
} from "@fortawesome/free-solid-svg-icons";
import { Table } from "reactstrap";
import { priceFormatter } from "../../../supports/helpers/formatter";
import Axios from "axios";
import { API_URL, API_URL1 } from "../../../constants/API";
import MenuBox from "../../components/menubox/MenuBox";
import { PieChart } from "react-minimal-pie-chart";
import SideBar from "../../components/sidebar/SideBar";

class Dashboard extends React.Component {
  state = {
    users: [],
    topSpending: [],
    transactions: [],
    therapist: [],
    clinics: [],
    transactionCustom: [],
    therapistCustom: [],
    indexColor: ["#fc8454", "#f4cc3c", "#84c4d4", "#8ccc7c", "#6d68b8"],
  };

  getUsers = () => {
    Axios.get(`${API_URL1}/users`)
      .then((res) => {
        // console.log(res.data);
        this.setState({ users: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getTherapist = (offset = 0, sortType = "dashboard") => {
    Axios.get(`${API_URL1}/therapistdetails`, {
      params: {
        sortType,
        offset,
      },
    })
      .then((res) => {
        // console.log(res.data);
        this.setState({ therapist: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getClinics = () => {
    Axios.get(`${API_URL1}/clinics`)
      .then((res) => {
        // console.log(res.data);
        this.setState({ clinics: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getTopSpending = () => {
    Axios.get(`${API_URL1}/users/topspending`)
      .then((res) => {
        let obj = {
          spending: 0,
          name: "",
          image: "",
        };

        let arrResData = [];

        for (let i = 0; i < res.data.length; i++) {
          for (let j = 0; j < res.data[i].length; j++) {
            obj = {
              spending: res.data[i][0],
              name: res.data[i][1],
              image: res.data[i][2],
            };
          }
          arrResData.push(obj);
        }
        this.setState({
          topSpending: arrResData,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Cuma dapetin transaction yang statusnya booked dan finish doang
  getTransactions = () => {
    Axios.get(`${API_URL1}/transactions`, {
      params: {
        offset: 0,
        type: "dashboard",
      },
    })
      .then((res) => {
        // console.log(res.data);
        this.setState({ transactions: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getCustomizeTransaction = () => {
    Axios.get(`${API_URL1}/transactions/custom`)
      .then((res) => {
        // console.log(res.data);
        // Tadinya kan datanya itu array mentah gaada namanya, jadinya mau dimapping in lewat sini
        let obj = {
          value: 0,
          title: "",
          color: "",
        };

        let arrResData = [];

        for (let i = 0; i < res.data.length; i++) {
          for (let j = 0; j < res.data[i].length; j++) {
            obj = {
              value: res.data[i][0],
              title: res.data[i][1],
              color: this.state.indexColor[i],
            };
          }
          arrResData.push(obj);
          // console.log(obj);
          // console.log(arrResData);
        }
        this.setState({ transactionCustom: arrResData });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // getCustomizeTherapist = () => {
  //   Axios.get(`${API_URL1}/therapistdetails/custom`)
  //     .then((res) => {
  //       // console.log(res.data);
  //       // Tadinya kan datanya itu array mentah gaada namanya, jadinya mau dimapping in lewat sini
  //       let obj = {
  //         name: "",
  //         clinic: "",
  //         serviceFee: 0,
  //         booking: 0,
  //         earnings: 0,
  //         id: 0,
  //         openForm: false,
  //       };

  //       let arrResData = [];

  //       for (let i = 0; i < res.data.length; i++) {
  //         for (let j = 0; j < res.data[i].length; j++) {
  //           obj = {
  //             ...obj,
  //             name: res.data[i][0],
  //             clinic: res.data[i][1],
  //             serviceFee: res.data[i][2],
  //             booking: res.data[i][3],
  //             earnings: res.data[i][4],
  //             id: res.data[i][5],
  //           };
  //         }
  //         arrResData.push(obj);
  //         // console.log(obj);
  //         // console.log(arrResData);
  //       }
  //       this.setState({ therapistCustom: arrResData });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  renderCustomizeTherapist = () => {
    // let arrSort1 = this.state.therapist.sort((a, b) => {
    //   return (
    //     a.transactions.filter((value) => {
    //       return value.status == "booked";
    //     }).length -
    //     b.transactions.filter((value) => {
    //       return value.status == "booked";
    //     }).length
    //   );
    // });

    // let arrSort2 = this.state.therapist.sort((a, b) => {
    //   return (
    //     b.transactions
    //       .filter((value) => {
    //         return value.status == "booked";
    //       })
    //       .map((val) => {
    //         return (val.totalPrice += val.totalPrice);
    //       }) -
    //     a.transactions
    //       .filter((value) => {
    //         return value.status == "booked";
    //       })
    //       .map((val) => {
    //         return (val.totalPrice += val.totalPrice);
    //       })
    //   );
    // });

    // let arrSort = this.state.therapist.sort((a, b) => {
    //   return b.serviceFee - a.serviceFee;
    // });

    // return this.state.therapistCustom.map((value, index) => {
    return this.state.therapist.map((value, index) => {
      return (
        <>
          <tr>
            <th scope="row">{index + 1}</th>
            <td>{value.user.name}</td>
            <td>{value.clinic.clinicName}</td>
            <td>{priceFormatter(value.serviceFee)}</td>
            <td>
              {
                value.transactions.filter((value) => {
                  return value.status == "booked";
                }).length
              }
            </td>
            <td>{priceFormatter(this.getEarnings(index))}</td>
          </tr>
          <tr>
            <td colSpan={6} className="">
              {" "}
              {this.renderTransaction(index)}
            </td>
          </tr>
        </>
      );
    });
  };

  getEarnings = (index) => {
    let totEarn = 0;
    this.state.therapist[index].transactions
      .filter((value) => {
        return value.status == "booked";
      })
      .map((val) => {
        console.log("itung ni:" + index + " " + val.totalPrice);
        return (totEarn += val.totalPrice);
      });
    return totEarn;
  };

  renderChartLabel = () => {
    return this.state.transactionCustom.map((value) => {
      return (
        <div className="d-flex rounded p-0 mb-3">
          <div
            className="d-flex col-2"
            style={{ backgroundColor: value.color }}
          ></div>
          <div className="d-flex p-0 col-8 ml-2">{value.title}</div>
        </div>
      );
    });
  };

  renderTopSpending = () => {
    return this.state.topSpending.map((value, index) => {
      return (
        <div
          className="d-flex col-12 rounded-pill p-2"
          style={{ backgroundColor: this.state.indexColor[index] }}
        >
          <div className="d-flex p-0 col-1">
            <img
              src={value.image}
              alt=""
              className="rounded-circle"
              style={{ width: "100%" }}
            />
          </div>
          <div
            className="d-flex p-0 flex-column align-items-start justify-content-center col-10 pl-4"
            style={{ color: "white" }}
          >
            <h6 className="d-flex m-0">{value.name}</h6>
            <p style={{ fontSize: "12px" }}>
              Spending : {priceFormatter(value.spending)}
            </p>
          </div>
          <div
            className="d-flex p-0 col-1 rounded-circle justify-content-center align-items-center"
            style={{ backgroundColor: "white" }}
          >
            <h3 className="m-0">{index + 1}</h3>
          </div>
        </div>
      );
    });
  };

  renderTransaction = (index) => {
    return this.state.therapist[index].transactions
      .filter((value) => {
        return value.status == "booked" || value.status == "finish";
      })
      .map((val) => {
        return (
          <div className="mt-1 d-flex p-0">
            <p className="col-3">
              Transaction Created: {val.createdAt.substr(0, 10)}
            </p>
            <p className="col-3">
              Total Price: {priceFormatter(val.totalPrice)}
            </p>
          </div>
        );
      });
  };

  componentDidMount() {
    this.getTherapist();
    this.getClinics();
    this.getTransactions();
    this.getUsers();
    this.getCustomizeTransaction();
    // this.getCustomizeTherapist();
    this.getTopSpending();
  }

  render() {
    return (
      <>
        <TitleBar title="Dashboard" />
        <div
          className="d-flex p-4 border col-12 align-items-start"
          style={{ backgroundColor: "#f4f4fc" }}
        >
          <div className="d-flex p-0 col-3 border flex-column">
            <SideBar />
          </div>
          <div className="flex-column pl-4 d-flex col-9">
            {/* Row 1 */}
            <div className="d-flex p-0 d-flex">
              <MenuBox
                data={{
                  title: "User",
                  color: "#f4cc3c",
                  total: this.state.users.length,
                }}
              />
              <MenuBox
                data={{
                  title: "Therapist",
                  color: "#84c4d4",
                  total: this.state.therapist.length,
                }}
              />
              <MenuBox
                data={{
                  title: "Clinic",
                  color: "#8ccc7c",
                  total: this.state.clinics.length,
                }}
              />
              <MenuBox
                data={{
                  title: "Transaction",
                  color: "#fc8454",
                  total: this.state.transactions.length,
                }}
              />
            </div>
            {/* Row 2 */}
            <div className="d-flex p-0 mt-4 d-flex ">
              {/* Users */}
              <div
                className="d-flex flex-wrap flex-column rounded p-4 col-7"
                style={{ backgroundColor: "white" }}
              >
                <h5 className="d-flex mb-4 p-0">
                  Top Spending Users{" "}
                  <FontAwesomeIcon
                    icon={faTrophy}
                    style={{ color: "#f4cc3c", fontSize: "30px" }}
                    className="ml-3"
                  />
                </h5>
                <div className="d-flex flex-wrap p-0">
                  {this.renderTopSpending()}
                </div>
              </div>
              {/* Day */}
              <div className="d-flex pr-0 pl-4 justify-content-end col-5">
                <div
                  className="d-flex flex-wrap p-4 col-12 rounded"
                  style={{
                    backgroundColor: "white",
                    border: "1px solid white",
                  }}
                >
                  <h5 className="m-0 d-flex p-0 mb-4 col-12">
                    Booking Day Statistics
                  </h5>
                  {/* Chart */}
                  <div className="d-flex col-7">
                    <PieChart
                      // lengthAngle={360}
                      // lineWidth={20}
                      // paddingAngle={18}
                      // rounded
                      // labelPosition={60}
                      data={this.state.transactionCustom}
                      label={({ dataEntry }) =>
                        // dataEntry.title +
                        // " " +
                        Math.round(dataEntry.percentage) + "%"
                      }
                      labelStyle={(index) => ({
                        // fill: this.state.transactionCustom[index].color,
                        fill: "white",
                        fontSize: "7px",
                        fontFamily: "Jost",
                      })}
                    />
                  </div>

                  <div className="col-5 pl-3 d-flex flex-column">
                    {this.renderChartLabel()}
                  </div>
                </div>
              </div>
            </div>
            {/* Row 3 */}
            <div
              className="d-flex flex-column p-4 mt-4 d-flex rounded"
              style={{ backgroundColor: "white" }}
            >
              <h5 className="d-flex mb-4 p-0">Therapist Report</h5>
              <Table className="m-0">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>Clinic</th>
                    <th>Service Fee</th>
                    <th>Transaction</th>
                    <th>Earnings</th>
                  </tr>
                </thead>
                <tbody>{this.renderCustomizeTherapist()}</tbody>
              </Table>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Dashboard;
