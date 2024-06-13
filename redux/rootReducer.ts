import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./users/userReducer";

const rootReducer = combineReducers({
  users: userReducer,
});

export default rootReducer;
