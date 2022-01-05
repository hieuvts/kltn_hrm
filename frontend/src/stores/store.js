import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "./employeeSlice";
import authReducer from "./authSlice";
import messageReducer from "./messageSlice";
import departmentReducer from "./departmentSlice";
import chatRoomReducer from "./chatRoomSlice";
import userReducer from "./userSlice";

const reducers = {
  auth: authReducer,
  employee: employeeReducer,
  message: messageReducer,
  department: departmentReducer,
  chatRoom: chatRoomReducer,
  user: userReducer,
};
const store = configureStore({
  reducer: reducers,
  devTools: true,
});

export default store;
