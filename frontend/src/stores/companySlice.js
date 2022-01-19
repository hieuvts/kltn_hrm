import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import companyService from "../services/company.service";
import { logout } from "./authSlice";

const initialState = {};

export const getCompanyAsync = createAsyncThunk(
  "company/getOneCompany",
  async (payload, thunkAPI) => {
    try {
      const res = await companyService.getAllCompany(payload.id);

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

export const addCompanyAsync = createAsyncThunk(
  "company/addCompany",
  async (payload, thunkAPI) => {
    try {
      const res = await companyService.addCompany(payload);
      return res.data.company;
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

export const updateCompanyAsync = createAsyncThunk(
  "company/updateCompany",
  async (payload, thunkAPI) => {
    try {
      const res = await companyService.updateCompany(payload.id, payload);

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

export const deleteCompanyAsync = createAsyncThunk(
  "company/delete",
  async (payload, thunkAPI) => {
    try {
      const res = await companyService.deleteCompany(payload.selectedCompanyID);
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

export const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    setCurrentSelectedCompany: (state, action) => {
      return {
        ...state,
        currentSelectedCompany: action.payload.currentSelectedCompany,
      };
    },
  },
  extraReducers: {
    // Get Company from server
    [getCompanyAsync.pending]: (state, actions) => {
      console.log("[Pending] getCompanyAsync state= ", state);
    },
    [getCompanyAsync.rejected]: (state, actions) => {
      console.log("[Rejected] getCompanyAsync errorMsg= ", actions);
    },
    [getCompanyAsync.fulfilled]: (state, actions) => {
      console.log("[Fulfilled] getCompanyAsync ");
      return (state = actions.payload);
    },

    [addCompanyAsync.rejected]: (state, actions) => {
      console.log("[Rejected] addCompanyAsync errorMsg= ", actions.payload);
    },
    [addCompanyAsync.fulfilled]: (state, actions) => {
      console.log(
        "[Fulfilled] addCompanyAsync actions.payload.Companys= ",
        actions.payload
      );
      return (state = actions.payload);
    },
    [updateCompanyAsync.rejected]: (state, actions) => {
      console.log("[Rejected] updateCompanyAsync errorMsg= ", actions.payload);
    },
    [updateCompanyAsync.fulfilled]: (state, actions) => {
      console.log(
        "[Fulfilled] updateCompanyAsync actions.payload.Companys= ",
        actions.payload
      );
    },

    // Delete Company from server
    [deleteCompanyAsync.rejected]: (state, actions) => {
      console.log("[Rejected] deleteCompanyAsync errorMsg ", actions.payload);
    },
    [deleteCompanyAsync.fulfilled]: (state, actions) => {
      console.log(
        "[Fulfilled] deleteCompanyAsync actions.payload.Companys= ",
        actions.payload
      );
      return;
    },
  },
});
export const { setCurrentSelectedCompany } = companySlice.actions;

export default companySlice.reducer;
