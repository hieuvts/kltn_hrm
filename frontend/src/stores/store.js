import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
// import employeeReducer from "./employeeSlice";
import { employeeApi } from "./employeeSlice_RTK";

// const store = configureStore({
//   reducer: {
//     employee: employeeReducer,
//   },
// });
const store = configureStore({
  reducer: {
    [employeeApi.reducerPath]: employeeApi.reducer,
  },
  // The concat() method is used to merge two or more arrays.
  // This method does not change the existing arrays,
  // but instead returns a new array.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(employeeApi.middleware),
});

setupListeners(store.dispatch);

export default store;
