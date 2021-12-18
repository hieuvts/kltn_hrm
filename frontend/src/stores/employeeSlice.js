import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    name: "Initial Data",
    gender: "Initial Data",
    dateOfBirth: "2020-01-31T17:00:00.000Z",
    phoneNumber: "0359545405",
    address: "Initial Data",
    roleID: "1",
    departmentID: "4243",
    projectID: "1",
    isDeleted: false,
  },
];

export const getEmployeeAsync = createAsyncThunk(
  "employee/getAll",
  async () => {
    const res = await fetch("http://localhost:8000/api/employee/getAll");
    if (res.ok) {
      const resFromServer = await res.json();
      const employee = resFromServer.employees;
      return { employee };
    } else {
      console.log("[FAILED] getEmployeeAsync: ", res.status);
    }
  }
);

export const addEmployeeAsync = createAsyncThunk(
  "employee/addEmployee",
  async () => {
    const res = await fetch("http://localhost:8000/api/employee/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id: payload._id }),
    });

    if (res.ok) {
      const employee = await res.json();
      return { employee };
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
        actions.payload.employee
      );
      return actions.payload.employee;
    },
  },
});
export const { getEmployeeInfo } = employeeSlice.actions;

export default employeeSlice.reducer;
