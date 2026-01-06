import { combineReducers } from "redux";
import auth from "./auth"
import apiLoading from "./constant"
import search from "./search";

const rootReducer = combineReducers({
  auth:auth,
  constant:apiLoading,
  search:search
});

export default rootReducer;
