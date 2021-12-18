import {
  configureStore,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

const initialState = { name: "Init name", gender: 1 };

export const getEmployeeAsync = createAsyncThunk(
  "employee/getAll",
  async () => {
    const res = await fetch("http://localhost:8000/api/employee/getAll");
    if (res.ok) {
      const resFromServer = await res.json();
      const employees = resFromServer.employees;
      return { employees };
    } else {
      console.log("[FAILED] getEmployeeAsync: ", res.status);
    }
  }
);
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
  extraReducers: {
    [getEmployeeAsync.pending]: (state, actions) => {
      console.log("[Pending] getEmployeeAsync state= ", state);
    },
    [getEmployeeAsync.rejected]: (state, actions) => {
      console.log("[Rejected] getEmployeeAsync actions= ", actions);
    },
    [getEmployeeAsync.fulfilled]: (state, actions) => {
      console.log(
        "[Fulfilled] getEmployeeAsync actions.payload.employees= ",
        actions.payload.employees
      );
      return actions.payload;
    },
  },
});
export const { getEmployeeInfo } = employeeSlice.actions;

export default employeeSlice.reducer;
