import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import { apiBaseUrl } from "../config/apiBaseUrl";

// employeeList: [
//   {
//     _id: null,
//     name: "Initial Data",
//     gender: "Initial Data",
//     dateOfBirth: "2020-01-31T17:00:00.000Z",
//     phoneNumber: "0359545405",
//     address: "Initial Data",
//     roleID: "1",
//     departmentID: "4243",
//     projectID: "1",
//     isDeleted: false,
//   },
// ],
const initialState = {
  employeeList: [],
  currentSelectedEmployee: {},
  selectedEmployeeList: [],
};

export const getEmployeeAsync = createAsyncThunk(
  "employee/getAllEmployee",
  async (payload, { rejectWithValue }) => {
    let searchQuery = "";
    if (typeof payload === "undefined") {
      console.log("search is undefined");
    } else {
      console.log("typeof payload.Searchquery", typeof payload.searchQuery);
      searchQuery = payload.searchQuery;
    }
    try {
      const res = await fetch(
        `${apiBaseUrl}/employee/getAll?search=${searchQuery}`
      );
      if (res.ok) {
        const resFromServer = await res.json();
        const employee = resFromServer.employees;
        console.log("Get all employee successful");
        return { employeeList: employee };
      } else {
        console.log("[FAILED] getEmployeeAsync: ", res.status);
        return rejectWithValue("Get employee not successful");
      }
    } catch (error) {
      return rejectWithValue("Get employee not successful");
    }
  }
);

export const addEmployeeAsync = createAsyncThunk(
  "employee/addEmployee",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await fetch(`${apiBaseUrl}/employee/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fname: payload.fname,
          lname: payload.lname,
          gender: payload.gender,
          dateOfBirth: moment(payload.dateOfBirth).format("YYYY-MM-DD"),
          phoneNumber: payload.phoneNumber,
          email: payload.email,
          address: payload.address,
          department: [],
          role: [],
          isDeleted: false,
        }),
      });
      if (res.ok) {
        const employee = await res.json();
        return { employee };
      } else return rejectWithValue("Add employee not successful");
    } catch (error) {
      return rejectWithValue("Add employee not successful");
    }
  }
);

export const updateEmployeeAsync = createAsyncThunk(
  "employee/updateEmployee",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await fetch(`${apiBaseUrl}/employee/${payload._id}/put`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: payload.name,
          gender: payload.gender,
          dateOfBirth: moment(payload.dateOfBirth).format("YYYY-MM-DD"),
          phoneNumber: payload.phoneNumber,
          email: payload.email,
          address: payload.address,
          department: [],
          role: [],
          isDeleted: false,
        }),
      });
      if (res.ok) {
        const employee = await res.json();
        return { employee };
      } else return rejectWithValue("Update employee not successful");
    } catch {
      return rejectWithValue("Update employee not successful");
    }
  }
);

export const deleteEmployeeAsync = createAsyncThunk(
  "employee/delete",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `${apiBaseUrl}/employee/${payload.selectedEmployeeId}/delete`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ _id: payload._id }),
        }
      );
      if (!res.ok) {
        rejectWithValue("Delete employee not successful");
      } else {
        console.log("[deleteEmployeeAsync] success");
      }
    } catch {
      return rejectWithValue("Delete employee not successful");
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
    setCurrentSelectedEmployee: (state, action) => {
      return {
        ...state,
        currentSelectedEmployee: action.payload.currentSelectedEmployee,
      };
    },
    addToSelectedEmployeeList: (state, action) => {
      state.selectedEmployeeList.push(action.payload.selectedEmployee);
    },
    removeFromSelectedEmployeeList: (state, action) => {
      state.selectedEmployeeList = state.selectedEmployeeList.filter(
        (employee) => employee._id !== action.payload.selectedEmployee._id
      );
    },
    setMultiSelectedEmployeeList: (state, action) => {
      const selectedEmployeeList = action.payload;
      selectedEmployeeList.forEach((employee) =>
        state.selectedEmployeeList.push(employee)
      );
    },
  },
  extraReducers: {
    // Get Employee from server
    // [getEmployeeAsync.pending]: (state, actions) => {
    //   console.log("[Pending] getEmployeeAsync state= ", state);
    // },
    [getEmployeeAsync.rejected]: (state, actions) => {
      console.log("[Rejected] getEmployeeAsync errorMsg= ", actions);
    },
    [getEmployeeAsync.fulfilled]: (state, actions) => {
      console.log(
        "[Fulfilled] getEmployeeAsync actions.payload.employees= ",
        actions.payload
      );
      return { ...state, employeeList: actions.payload.employeeList };
    },

    // Add Employee to server
    // [addEmployeeAsync.pending]: (state, actions) => {
    //   console.log("[Pending] addEmployeeAsync state= ", state);
    // },
    [addEmployeeAsync.rejected]: (state, actions) => {
      console.log("[Rejected] addEmployeeAsync errorMsg= ", actions.payload);
    },
    [addEmployeeAsync.fulfilled]: (state, actions) => {
      console.log(
        "[Fulfilled] addEmployeeAsync actions.payload.employees= ",
        actions.payload
      );
      // state.push(actions.payload.employee);
    },

    // Add Employee to server
    // [updateEmployeeAsync.pending]: (state, actions) => {
    //   console.log("[Pending] updateEmployeeAsync state= ", state);
    // },
    [updateEmployeeAsync.rejected]: (state, actions) => {
      console.log("[Rejected] updateEmployeeAsync errorMsg= ", actions.payload);
    },
    [updateEmployeeAsync.fulfilled]: (state, actions) => {
      console.log(
        "[Fulfilled] updateEmployeeAsync actions.payload.employees= ",
        actions.payload
      );
      // state.push(actions.payload.employee);
      return;
    },

    // Delete Employee from server
    [deleteEmployeeAsync.rejected]: (state, actions) => {
      console.log("[Rejected] deleteEmployeeAsync errorMsg ", actions.payload);
    },
    [deleteEmployeeAsync.fulfilled]: (state, actions) => {
      console.log(
        "[Fulfilled] deleteEmployeeAsync actions.payload.employees= ",
        actions.payload
      );
      return;
    },
  },
});
export const {
  getEmployeeInfo,
  setCurrentSelectedEmployee,
  addToSelectedEmployeeList,
  removeFromSelectedEmployeeList,
  setMultiSelectedEmployeeList,
} = employeeSlice.actions;

export default employeeSlice.reducer;
