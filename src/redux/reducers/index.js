import { combineReducers } from "redux";
import userReducer from "./user";
import cityReducer from "./city";

export default combineReducers({
  user: userReducer,
  city: cityReducer,
});
