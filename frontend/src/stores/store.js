import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "./employeeSlice";
import authReducer from "./authSlice";
import messageReducer from "./messageSlice";
import departmentReducer from "./departmentSlice";
import chatReducer from "./chatSlice";

const reducers = {
  auth: authReducer,
  employee: employeeReducer,
  message: messageReducer,
  department: departmentReducer,
  chat: chatReducer,
};
const store = configureStore({
  reducer: reducers,
  devTools: true,
});

export default store;
