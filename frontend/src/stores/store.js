import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "./employeeSlice";
import authReducer from "./authSlice";
import messageReducer from "./messageSlice";

const reducers = {
  auth: authReducer,
  employee: employeeReducer,
  message: messageReducer,
};
const store = configureStore({
  reducer: reducers,
  devTools: true,
});

export default store;
