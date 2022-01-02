import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "./employeeSlice";
import departmentReducer from "./departmentSlice";
import authReducer from "./authSlice";
import messageReducer from "./messageSlice";
import departmentReducer from "./departmentSlice";

const reducers = {
  auth: authReducer,
  employee: employeeReducer,
  message: messageReducer,
  department: departmentReducer,
};
const store = configureStore({
    department: departmentReducer
  reducer: reducers,
  devTools: true,
});

export default store;
