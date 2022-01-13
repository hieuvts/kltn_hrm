import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import employeeReducer from "./employeeSlice";
import departmentReducer from "./departmentSlice";
import authReducer from "./authSlice";
import messageReducer from "./messageSlice";
import chatRoomReducer from "./chatRoomSlice";
import userReducer from "./userSlice";
import taskReducer from "./taskSlice";
import projectReducer from "./projectSlice";
const reducers = {
  auth: authReducer,
  employee: employeeReducer,
  message: messageReducer,
  department: departmentReducer,
  chatRoom: chatRoomReducer,
  user: userReducer,
  project: projectReducer,
  task: taskReducer,
};
const store = configureStore({
  reducer: reducers,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
