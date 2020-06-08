const init_state = {
  id: 0,
  name: "",
  username: "",
  email: "",
  password: "",
  phoneNumber: "",
  role: "",
  errMsg: "",
  cookieChecker: "",
};

export default (state = init_state, action) => {
  switch (action.type) {
    case "ON_LOGIN_SUCCESS":
      const { id, username, password } = action.payload;
      return { ...state, id, username, password };
    case "ON_LOGIN_FAILED":
      return { ...state, errMsg: action.payload };
    default:
      return { ...state };
  }
};
