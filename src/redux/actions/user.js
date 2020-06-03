import Axios from "axios";
import { API_URL } from "../../constants/API";

export const loginHandler = (userLogin) => {
  const { username, password } = userLogin;
  return (dispatch) => {
    Axios.get(`${API_URL}/users`, {
      params: {
        username,
        password,
      },
    })
      .then((res) => {
        console.log(res.data[0]);
        if (res.data.length > 0) {
          dispatch({
            type: "ON_LOGIN_SUCCESS",
            payload: res.data[0],
          });
        } else {
          dispatch({
            type: "ON_LOGIN_FAILED",
            payload: "Wrong username or password",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
