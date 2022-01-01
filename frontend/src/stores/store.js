import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "./employeeSlice";
import departmentReducer from "./departmentSlice";
const store = configureStore({
  reducer: {
    employee: employeeReducer,
    department: departmentReducer
  },
});

export default store;
