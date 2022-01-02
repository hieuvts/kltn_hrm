import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import employeeService from "../services/employee.service";

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
      const res = await employeeService.getAllEmployee(searchQuery);

      return res.data.employees;
    } catch {
      return rejectWithValue("Get employee not successful");
    }
  }
);

export const addEmployeeAsync = createAsyncThunk(
  "employee/addEmployee",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await employeeService.addEmployee(payload);

      return res.data.employees;
    } catch {
      return rejectWithValue("Add employee not successful");
    }
  }
);

export const updateEmployeeAsync = createAsyncThunk(
  "employee/updateEmployee",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await employeeService.updateEmployee(payload._id, payload);

      return res.data.employees;
    } catch {
      return rejectWithValue("Update employee not successful");
    }
  }
);

export const deleteEmployeeAsync = createAsyncThunk(
  "employee/delete",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await employeeService.deleteEmployee(
        payload.selectedEmployeeId
      );

      return res.data;
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
    [getEmployeeAsync.pending]: (state, actions) => {
      console.log("[Pending] getEmployeeAsync state= ", state);
    },
    [getEmployeeAsync.rejected]: (state, actions) => {
      console.log("[Rejected] getEmployeeAsync errorMsg= ", actions);
    },
    [getEmployeeAsync.fulfilled]: (state, actions) => {
      console.log("[Fulfilled] getEmployeeAsync ");
      return { ...state, employeeList: actions.payload };
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
