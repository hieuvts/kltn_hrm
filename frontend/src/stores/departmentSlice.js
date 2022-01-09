import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import departmentService from "../services/department.service";
import { logout } from "./authSlice";

const initialState = {
  departmentList: [],
  currentSelectedDepartment: {},
  selectedDepartmentList: [],
};

export const getDepartmentAsync = createAsyncThunk(
  "department/getAllDepartment",
  async (payload, thunkAPI) => {
    let searchQuery = "";
    if (typeof payload === "undefined") {
      console.log("search is undefined");
    } else {
      console.log("typeof payload.Searchquery", typeof payload.searchQuery);
      searchQuery = payload.searchQuery;
    }
    try {
      const res = await departmentService.getAllDepartment(searchQuery);

      return res.data.departments;
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

export const addDepartmentAsync = createAsyncThunk(
  "department/addDepartment",
  async (payload, thunkAPI) => {
    try {
      const res = await departmentService.addDepartment(payload);
      return res.data.departments;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      if (error.response.status === "401") {
        thunkAPI.dispatch(logout());
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateDepartmentAsync = createAsyncThunk(
  "department/updateDepartment",
  async (payload, thunkAPI) => {
    try {
      const res = await departmentService.updateDepartment(
        payload._id,
        payload
      );

      return res.data.departments;
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

export const deleteDepartmentAsync = createAsyncThunk(
  "department/delete",
  async (payload, thunkAPI) => {
    try {
      const res = await departmentService.deleteDepartment(
        payload.selectedDepartmentID
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

export const departmentSlice = createSlice({
  name: "department",
  initialState,
  reducers: {
    getDepartmentInfo: (state, action) => {
      console.log("[departmentSlice.js] action.payload=", action.payload);
      state.name = action.payload.name;
    },
    setCurrentSelectedDepartment: (state, action) => {
      return {
        ...state,
        currentSelectedDepartment: action.payload.currentSelectedDepartment,
      };
    },
    addToSelectedDepartmentList: (state, action) => {
      state.selectedDepartmentList.push(action.payload.selectedDepartment);
    },
    removeFromSelectedDepartmentList: (state, action) => {
      state.selectedDepartmentList = state.selectedDepartmentList.filter(
        (department) => department._id !== action.payload.selectedDepartment._id
      );
    },
    setMultiSelectedDepartmentList: (state, action) => {
      const selectedDepartmentList = action.payload;
      selectedDepartmentList.forEach((department) =>
        state.selectedDepartmentList.push(department)
      );
    },
  },
  extraReducers: {
    // Get Department from server
    [getDepartmentAsync.pending]: (state, actions) => {
      console.log("[Pending] getDepartmentAsync state= ", state);
    },
    [getDepartmentAsync.rejected]: (state, actions) => {
      console.log("[Rejected] getDepartmentAsync errorMsg= ", actions);
    },
    [getDepartmentAsync.fulfilled]: (state, actions) => {
      console.log("[Fulfilled] getDepartmentAsync ");
      return { ...state, departmentList: actions.payload };
    },

    [addDepartmentAsync.rejected]: (state, actions) => {
      console.log("[Rejected] addDepartmentAsync errorMsg= ", actions.payload);
    },
    [addDepartmentAsync.fulfilled]: (state, actions) => {
      console.log(
        "[Fulfilled] addDepartmentAsync actions.payload.departments= ",
        actions.payload
      );
      // state.push(actions.payload.Department);
    },
    [updateDepartmentAsync.rejected]: (state, actions) => {
      console.log(
        "[Rejected] updateDepartmentAsync errorMsg= ",
        actions.payload
      );
    },
    [updateDepartmentAsync.fulfilled]: (state, actions) => {
      console.log(
        "[Fulfilled] updateDepartmentAsync actions.payload.departments= ",
        actions.payload
      );
      // state.push(actions.payload.Department);
      return;
    },

    // Delete Department from server
    [deleteDepartmentAsync.rejected]: (state, actions) => {
      console.log(
        "[Rejected] deleteDepartmentAsync errorMsg ",
        actions.payload
      );
    },
    [deleteDepartmentAsync.fulfilled]: (state, actions) => {
      console.log(
        "[Fulfilled] deleteDepartmentAsync actions.payload.departments= ",
        actions.payload
      );
      return;
    },
  },
});
export const {
  getDepartmentInfo,
  setCurrentSelectedDepartment,
  addToSelectedDepartmentList,
  removeFromSelectedDepartmentList,
  setMultiSelectedDepartmentList,
} = departmentSlice.actions;

export default departmentSlice.reducer;
