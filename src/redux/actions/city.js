import Axios from "axios";
import { API_URL, API_URL1 } from "../../constants/API";

export const getCities = () => {
  return (dispatch) => {
    Axios.get(`${API_URL1}/cities`)
      .then((res) => {
        console.log(res.data);
        dispatch({
          type: "GET_CITY",
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
