import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import blogReducer from "./blogs/blogReducer";
import userReducer from "./users/userReducer";

export const store = configureStore({
  reducer: {
    users: userReducer,
    blogs: blogReducer,
  },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
