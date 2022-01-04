import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "./employeeSlice";
import departmentReducer from "./departmentSlice";
import authReducer from "./authSlice";
import messageReducer from "./messageSlice";
import projectReducer from "./projectSlice";
const reducers = {
  auth: authReducer,
  employee: employeeReducer,
  message: messageReducer,
  department: departmentReducer,
  project: projectReducer
};
const store = configureStore({
  reducer: reducers,
  devTools: true,
});

export default store;
