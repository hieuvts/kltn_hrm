import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = { name: "Init name", gender: 1 };

export const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    getEmployeeInfo: (state, action) => {
      console.log("[employeeSlice.js] action.payload=", action.payload);
      state.name = action.payload.name;
      console.log("[employeeSlice.js] action.payload=", action.payload);
    },
  },
});
export const { getEmployeeInfo } = employeeSlice.actions;

export default employeeSlice.reducer;
