import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import employeeAchievementService from "../services/employeeAchievement.service";
import { logout } from "./authSlice";
const initialState = {
  employeeID: "",
  date: "",
  achievement: "",
};

// export const getEmployeeAchievementAsync = createAsyncThunk(
//   "employeeAchievement/getAllEmployeeAchievement",
//   async (payload, thunkAPI) => {
//     let searchQuery = "";
//     if (typeof payload === "undefined") {
//       console.log("search is undefined");
//     } else {
//       console.log("typeof payload.Searchquery", typeof payload.searchQuery);
//       searchQuery = payload.searchQuery;
//     }
//     try {
//       const res = await employeeAchievementService.getAllEmployee(searchQuery);

//       return res.data;
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();
//       if (error.response.status === 401) {
//         thunkAPI.dispatch(logout());
//       }
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );

export const addEmployeeAchievementAsync = createAsyncThunk(
  "employeeAchievement/addEmployeeAchievement",
  async (payload, thunkAPI) => {
    try {
      const res = await employeeAchievementService.addEmployeeAchievement(
        payload
      );

      return res.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      if (error.response.status === 401) {
        thunkAPI.dispatch(logout());
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateEmployeeAchievementAsync = createAsyncThunk(
  "employeeAchievement/updateEmployeeAchievement",
  async (payload, thunkAPI) => {
    try {
      const res = await employeeAchievementService.updateEmployeeAchievement(
        payload.id,
        payload
      );

      return res.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      if (error.response.status === 401) {
        thunkAPI.dispatch(logout());
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteEmployeeAchievementAsync = createAsyncThunk(
  "employeeAchievement/deleteAchievement",
  async (payload, thunkAPI) => {
    try {
      const res = await employeeAchievementService.deleteEmployeeAchievement(
        payload.selectedEmployeeId
      );

      return res.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      if (error.response.status === 401) {
        thunkAPI.dispatch(logout());
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const employeeAchievementSlice = createSlice({
  name: "employeeAchievement",
  initialState,
  reducers: {},
  extraReducers: {
    // Get Employee from server
    // [getEmployeeAchievementAsync.rejected]: (state, actions) => {
    //   console.log("[Rejected] getEmployeeAsync errorMsg= ", actions);
    // },
    // [getEmployeeAchievementAsync.fulfilled]: (state, actions) => {
    //   console.log("[Fulfilled] getEmployeeAsync ");
    //   return { ...state, employeeList: actions.payload };
    // },

    [addEmployeeAchievementAsync.rejected]: (state, actions) => {
      console.log(
        "[Rejected] addEmployeeAchievementAsync errorMsg= ",
        actions.payload
      );
    },
    [addEmployeeAchievementAsync.fulfilled]: (state, actions) => {
      console.log("[Fulfilled] addEmployeeAchievementAsync ", actions.payload);
      // state.push(actions.payload.employee);
    },

    // Add Employee to server
    // [updateEmployeeAsync.pending]: (state, actions) => {
    //   console.log("[Pending] updateEmployeeAsync state= ", state);
    // },
    [updateEmployeeAchievementAsync.rejected]: (state, actions) => {
      console.log(
        "[Rejected] updateEmployeeAchievementAsync errorMsg= ",
        actions
      );
    },
    [updateEmployeeAchievementAsync.fulfilled]: (state, actions) => {
      console.log(
        "[Fulfilled] updateEmployeeAchievementAsync actions.payload ",
        actions.payload
      );
      // state.push(actions.payload.employee);
      return;
    },

    // Delete Employee from server
    [deleteEmployeeAchievementAsync.rejected]: (state, actions) => {
      console.log(
        "[Rejected] deleteEmployeeAchievementAsync errorMsg ",
        actions.payload
      );
    },
    [deleteEmployeeAchievementAsync.fulfilled]: (state, actions) => {
      console.log(
        "[Fulfilled] deleteEmployeeAchievementAsync actions.payload",
        actions.payload
      );
      return;
    },
  },
});

export default employeeAchievementSlice.reducer;
