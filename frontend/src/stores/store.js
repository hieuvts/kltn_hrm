import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "./employeeSlice";

const store = configureStore({
  reducer: {
    employee: employeeReducer,
  },
});

export default store;
