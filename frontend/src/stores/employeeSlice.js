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
  "employee/getAllEmployee",
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
  async (payload) => {
    const res = await fetch("http://localhost:8000/api/employee/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: payload.name,
        gender: payload.gender,
        dateOfBirth: "2010-01-29",
        phoneNumber: payload.phoneNumber,
        email: payload.email,
        address: payload.address,
        role: "Admin",
        isDeleted: false,
      }),
    });

    if (res.ok) {
      const employee = await res.json();
      console.log("added: ", res);
      return { employee };
    } else {
      console.log("[addEmployeeAsync] not successful", res);
    }
  }
);
export const updateEmployeeAsync = createAsyncThunk(
  "employee/updateEmployee",
  async (payload) => {
    const res = await fetch(
      `http://localhost:8000/api/employee/${payload.employeeid}/put`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "put method",
        }),
      }
    );
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
    // Get Employee from server
    // [getEmployeeAsync.pending]: (state, actions) => {
    //   console.log("[Pending] getEmployeeAsync state= ", state);
    // },
    // [getEmployeeAsync.rejected]: (state, actions) => {
    //   console.log("[Rejected] getEmployeeAsync actions= ", actions);
    // },
    [getEmployeeAsync.fulfilled]: (state, actions) => {
      console.log(
        "[Fulfilled] getEmployeeAsync actions.payload.employees= ",
        actions.payload
      );
      return actions.payload.employee;
    },
    // Add Employee to server
    // [addEmployeeAsync.pending]: (state, actions) => {
    //   console.log("[Pending] addEmployeeAsync state= ", state);
    // },
    // [addEmployeeAsync.rejected]: (state, actions) => {
    //   console.log("[Rejected] addEmployeeAsync actions= ", actions);
    // },
    [addEmployeeAsync.fulfilled]: (state, actions) => {
      console.log(
        "[Fulfilled] addEmployeeAsync actions.payload.employees= ",
        actions.payload
      );
      state.push(actions.payload.employee);
    },
    // Add Employee to server
    // [updateEmployeeAsync.pending]: (state, actions) => {
    //   console.log("[Pending] updateEmployeeAsync state= ", state);
    // },
    // [updateEmployeeAsync.rejected]: (state, actions) => {
    //   console.log("[Rejected] updateEmployeeAsync actions= ", actions);
    // },
    [updateEmployeeAsync.fulfilled]: (state, actions) => {
      console.log(
        "[Fulfilled] updateEmployeeAsync actions.payload.employees= ",
        actions.payload
      );
      state.push(actions.payload.employee);
    },
  },
});
export const { getEmployeeInfo } = employeeSlice.actions;

export default employeeSlice.reducer;
