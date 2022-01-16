import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import employeeKpiClusterService from "../services/employeeKpiCluster.service";
import { logout } from "./authSlice";

const initialState = {
    employeeID: "",
    kpi: "",
    lables: "",
    centoroid: "",
    data: ""
};

export const importDataFromCSV = createAsyncThunk(
  "employeeKpiCluster/importDataFromCSV",
  async (payload, thunkAPI) => {
    try {
      const res = await employeeKpiClusterService.importDataFromCSV( );
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
