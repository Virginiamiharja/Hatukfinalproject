const init_state = {
  city: [],
};

export default (state = init_state, action) => {
  switch (action.type) {
    case "GET_CITY":
      return { ...state, city: action.payload };
    default:
      return { ...state };
  }
};
