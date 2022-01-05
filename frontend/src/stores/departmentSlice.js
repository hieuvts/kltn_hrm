import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import departmentService from "../services/department.service";

const initialState = {
  departmentList: [],
  currentSelectedDepartment: {},
  selectedDepartmentList: [],
};

export const getDepartmentAsync = createAsyncThunk(
  "department/getAllDepartment",
  async (payload, { rejectWithValue }) => {
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
    } catch {
      return rejectWithValue("Get department not successful");
    }
  }
);

export const addDepartmentAsync = createAsyncThunk(
  "department/addDepartment",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await departmentService.addDepartment(payload);
      return res.data.departments;
    } catch(error) {
      return rejectWithValue("Add department not successful");
    }
  }
);

export const updateDepartmentAsync = createAsyncThunk(
  "department/updateDepartment",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await departmentService.updateDepartment(payload._id, payload);

      return res.data.departments;
    } catch {
      return rejectWithValue("Update department not successful");
    }
  }
);

export const deleteDepartmentAsync = createAsyncThunk(
  "department/delete",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await departmentService.deleteDepartment(
        payload.selectedDepartmentID
      );
      return res.data;
    } 
    catch {
      return rejectWithValue("Delete department not successful");
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
      console.log("[Rejected] updateDepartmentAsync errorMsg= ", actions.payload);
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
      console.log("[Rejected] deleteDepartmentAsync errorMsg ", actions.payload);
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
