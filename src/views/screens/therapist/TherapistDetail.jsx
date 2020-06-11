import React from "react";
import Axios from "axios";
import { API_URL } from "../../../constants/API";

class TherapistDetail extends React.Component {
  state = {
    therapistdetail: [],
  };

  getTherapistDetail = () => {
    Axios.get(`${API_URL}/therapistdetails?_expand=user&_expand=clinic`, {
      params: {
        id: this.props.match.params.id,
        _embed: "therapistcategories",
      },
    })
      .then((res) => {
        console.log(res.data);
        this.setState({ therapistdetail: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.getTherapistDetail();
  }

  render() {
    return (
      <div className="d-flex flex-column flex-lg-row justify-content-center align-items-center p-4 border">
        Hallo{" "}
      </div>
    );
  }
}

export default TherapistDetail;
