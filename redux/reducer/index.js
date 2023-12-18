import { combineReducers } from "redux";
import auth from "./auth"
import apiLoading from "./constant"

const rootReducer = combineReducers({
  auth:auth,
  constant:apiLoading
});

export default rootReducer;
