import Axios from "axios";
import { API_URL, API_URL1 } from "../../constants/API";
import swal from "sweetalert";

export const loginHandler = (userLogin) => {
  const { username, password } = userLogin;
  return (dispatch) => {
    Axios.get(`${API_URL1}/users/login`, {
      params: {
        username: username,
        password: password,
      },
    })
      .then((res) => {
        console.log(res.data);
        dispatch({
          type: "ON_LOGIN_SUCCESS",
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: "ON_LOGIN_FAILED",
          payload: "Wrong username or password",
        });
      });
  };
};

// export const loginHandler = (userLogin) => {
//   const { username, password } = userLogin;
//   return (dispatch) => {
//     Axios.get(`${API_URL}/users`, {
//       params: {
//         username,
//         password,
//       },
//     })
//       .then((res) => {
//         if (res.data.length > 0) {
//           dispatch({
//             type: "ON_LOGIN_SUCCESS",
//             payload: res.data[0],
//           });
//         } else {
//           dispatch({
//             type: "ON_LOGIN_FAILED",
//             payload: "Wrong username or password",
//           });
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };
// };

export const keepLoginHandler = (cookieResult) => {
  return (dispatch) => {
    Axios.get(`${API_URL1}/users/keeplogin`, {
      params: {
        userId: cookieResult.id,
      },
    })
      .then((res) => {
        console.log(res.data);
        dispatch({
          type: "ON_LOGIN_SUCCESS",
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: "ON_LOGIN_FAILED",
          payload: "Wrong username or password",
        });
      });
  };
};

// export const keepLoginHandler = (cookieResult) => {
//   return (dispatch) => {
//     Axios.get(`${API_URL}/users`, {
//       params: {
//         id: cookieResult.id,
//       },
//     })
//       .then((res) => {
//         if (res.data.length > 0) {
//           dispatch({
//             type: "ON_LOGIN_SUCCESS",
//             payload: res.data[0],
//           });
//         } else {
//           dispatch({
//             type: "ON_LOGIN_FAILED",
//             payload: "Wrong username or password",
//           });
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };
// };

export const registrationHandler = (userRegister, cityId) => {
  const { image } = userRegister;
  let formRegister = new FormData();

  formRegister.append(
    "registerForm",
    JSON.stringify({ ...userRegister, image: null })
  );
  formRegister.append("profilePicture", image);

  console.log(JSON.stringify({ ...userRegister, image: null }));

  return (dispatch) => {
    Axios.post(`${API_URL1}/users/register`, formRegister, {
      params: {
        cityId,
      },
    })
      .then((res) => {
        console.log(res.data);
        dispatch({
          type: "ON_LOGIN_SUCCESS",
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: "ON_REGISTER_FAILED",
          payload: "Username has been registered",
        });
      });
  };
};

// export const registrationHandler = (userRegister) => {
//   const {
//     name,
//     username,
//     email,
//     password,
//     phoneNumber,
//     role,
//     cityId,
//     subdistrict,
//     area,
//     address,
//     rt,
//     rw,
//   } = userRegister;
//   return (dispatch) => {
//     Axios.get(`${API_URL}/users`, {
//       params: {
//         username,
//       },
//     }).then((res) => {
//       console.log(res);
//       if (res.data.length > 0) {
//         dispatch({
//           type: "ON_REGISTER_FAILED",
//           payload: "Username has been registered",
//         });
//       } else {
//         Axios.post(`${API_URL}/users`, userRegister)
//           .then((res) => {
//             console.log(res);
//             dispatch({
//               type: "ON_LOGIN_SUCCESS",
//               payload: res.data,
//             });
//           })
//           .catch((err) => {
//             console.log(err);
//           });
//       }
//     });
//   };
// };

export const cookieChecker = () => {
  return {
    type: "COOKIE_CHECK",
  };
};

export const forgotPassword = (email) => {
  return (dispatch) => {
    Axios.get(`${API_URL1}/users/forgotpassword`, {
      params: {
        email: email,
      },
    })
      .then((res) => {
        console.log(res.data);
        swal(
          "CONGRATS",
          "Link to reset your password has been sent!",
          "success"
        );
      })
      .catch((err) => {
        console.log(err);
        swal("OH NO", "Your email has not registered yet!", "error");
      });
  };
};
