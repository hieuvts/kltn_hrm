import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "./employeeSlice";
import authReducer from "./authSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    employee: employeeReducer,
  },
});

export default store;
