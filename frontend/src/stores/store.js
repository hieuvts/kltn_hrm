import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import employeeReducer from "./employeeSlice";
import departmentReducer from "./departmentSlice";
import authReducer from "./authSlice";
import messageReducer from "./messageSlice";
import chatRoomReducer from "./chatRoomSlice";
import taskReducer from "./taskSlice";
import projectReducer from "./projectSlice";
import employeeKpiClusterReducer from "./employeeKpiClusterSlice";
import companyReducer from "./companySlice";
import notifReducer from "./notifSlice";

const reducers = {
  company: companyReducer,
  auth: authReducer,
  employee: employeeReducer,
  message: messageReducer,
  department: departmentReducer,
  chatRoom: chatRoomReducer,
  project: projectReducer,
  task: taskReducer,
  employeeKpiCluster: employeeKpiClusterReducer,
  notif: notifReducer,
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
