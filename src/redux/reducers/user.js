const init_state = {
  id: 0,
  name: "",
  username: "",
  email: "",
  phoneNumber: "",
  image: "",
  role: "",
  city: {
    cityName: "",
  },
  subdistrict: "",
  area: "",
  address: "",
  rt: "",
  rw: "",
  verified: 0,
  verifyToken: "",
  errMsg: "",
  cookieChecked: "",
};

export default (state = init_state, action) => {
  switch (action.type) {
    case "ON_LOGIN_SUCCESS":
      const {
        id,
        name,
        username,
        email,
        phoneNumber,
        role,
        city: { cityName },
        subdistrict,
        area,
        address,
        rt,
        rw,
        verified,
        verifyToken,
      } = action.payload;
      return {
        ...state,
        id,
        name,
        username,
        email,
        phoneNumber,
        role,
        city: { cityName },
        subdistrict,
        area,
        address,
        rt,
        rw,
        verified,
        verifyToken,
        cookieChecked: true,
      };
    case "ON_LOGIN_FAILED":
      return { ...state, errMsg: action.payload, cookieChecked: true };
    case "ON_REGISTER_FAILED":
      return { ...state, errMsg: action.payload, cookieChecked: true };
    case "COOKIE_CHECK":
      return { ...state, cookieChecked: true };
    default:
      return { ...state };
  }
};
