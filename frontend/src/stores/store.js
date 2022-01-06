import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "./employeeSlice";
import departmentReducer from "./departmentSlice";
import authReducer from "./authSlice";
import messageReducer from "./messageSlice";
import chatRoomReducer from "./chatRoomSlice";
import userReducer from "./userSlice";

import projectReducer from "./projectSlice";
const reducers = {
  auth: authReducer,
  employee: employeeReducer,
  message: messageReducer,
  department: departmentReducer,
  project: projectReducer,
  chatRoom: chatRoomReducer,
  user: userReducer,
};
const store = configureStore({
  reducer: reducers,
  devTools: true,
});

export default store;
