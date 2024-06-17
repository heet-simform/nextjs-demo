import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./users/userReducer";
import blogReducer from "./blogs/blogReducer";

const rootReducer = combineReducers({
  users: userReducer,
  blogs: blogReducer,
});

export default rootReducer;
