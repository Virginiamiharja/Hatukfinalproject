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

export const keepLoginHandler = (cookieResult) => {
  return (dispatch) => {
    Axios.get(`${API_URL}/users`, {
      params: {
        id: cookieResult.id,
      },
    })
      .then((res) => {
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

export const registrationHandler = (userRegister) => {
  const { name, username, email, password, phoneNumber, role } = userRegister;
  return (dispatch) => {
    Axios.get(`${API_URL}/users`, {
      params: {
        username,
      },
    }).then((res) => {
      console.log(res);
      if (res.data.length > 0) {
        dispatch({
          type: "ON_REGISTER_FAILED",
          payload: "Username has been registered",
        });
      } else {
        Axios.post(`${API_URL}/users`, userRegister)
          .then((res) => {
            console.log(res);
            dispatch({
              type: "ON_LOGIN_SUCCESS",
              payload: res.data,
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };
};

export const cookieChecker = () => {
  return {
    type: "COOKIE_CHECK",
  };
};
