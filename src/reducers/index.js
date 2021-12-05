import { combineReducers } from "redux";
import auth from "./Auth";
import message from "./Message";

export default combineReducers({
  auth,
  message,
});
