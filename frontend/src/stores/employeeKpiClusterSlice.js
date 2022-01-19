import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import employeeKpiClusterService from "../services/employeeKpiCluster.service";
import { logout } from "./authSlice";

const initialState = {
    employeeID: "",
    kpi: "",
    lables: "",
    centoroid: "",
    data: "",
    employeeKpiClusterList: []
};

export const importDataFromCSV = createAsyncThunk(
  "employeeKpiCluster/importDataFromCSV",
  async (payload, thunkAPI) => {
    try {
      const res = await employeeKpiClusterService.importCSVData( );
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

export const getDataFromCSV = createAsyncThunk(
  "employeeKpiCluster/getDataFromCSV",
  async (payload, thunkAPI) => {
    try {
      const res = await employeeKpiClusterService.getDataFromCSV(payload);
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
)

export const getEmployeeKpiCluster = createAsyncThunk(
  "employeeKpiCluster/getAllEmployKPICluster",
  async (payload, thunkAPI) => {
    let searchQuery = "";
    if (typeof payload === "undefined") {
      console.log("search is undefined");
    } else {
      console.log("typeof payload.Searchquery", typeof payload.searchQuery);
      searchQuery = payload.searchQuery;
    }
    try {
      const res = await employeeKpiClusterService.getAllEmployeeKpiCluster(searchQuery);
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

export const employeeKpiClusterSlice = createSlice({
  name: "employeeKpiCluster",
  initialState,
  reducers: {},
  extraReducers: {
    [getEmployeeKpiCluster.rejected]: (state, actions) => {
      console.log("[Rejected] getEmployeeKpiCluster errorMsg= ", actions);
    },
    [getEmployeeKpiCluster.fulfilled]: (state, actions) => {
      console.log("[Fulfilled] getEmployeeKpiCluster ");
      return { ...state, employeeKpiClusterList: actions.payload };
    },
    [importDataFromCSV.rejected]: (state, actions) => {
      console.log(
        "[Rejected] importDataFromCSV errorMsg= ",
        actions.payload
      );
    },
    [importDataFromCSV.fulfilled]: (state, actions) => {
      console.log("[Fulfilled] importDataFromCSV ", actions.payload);
    },
  },
});

export default employeeKpiClusterSlice.reducer;
