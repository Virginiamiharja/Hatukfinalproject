import Axios from "axios";
import { API_URL, API_URL1 } from "../../constants/API";
import swal from "sweetalert";

export const changeStatus = (editTransaction) => {
  return (dispatch) => {
    Axios.put(`${API_URL1}/transactions/changestatus`, editTransaction)
      .then((res) => {
        console.log(res.data);
        swal("CONGRATS", "The transaction has been edited", "success");
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
