import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import { apiBaseUrl } from "../config/apiBaseUrl";
import axios from "axios";
import authService from "../services/auth.service";

const initialState = {
  identification: [],
};

export const login = createAsyncThunk(
  "auth/login",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await fetch(`${apiBaseUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        return { data };
      } else return rejectWithValue("Login not successful 1");
    } catch (error) {
      return rejectWithValue("Login not successful");
    }
  }
);

export const signup = createAsyncThunk(
  "auth/signup",
  async (payload, { rejectWithValue }) => {}
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    // Get Employee from server
    [login.pending]: (state, actions) => {
      console.log("[Pending] login state= ", state);
    },
    [login.rejected]: (state, actions) => {
      console.log("[Rejected] login errorMsg= ", actions);
    },
    [login.fulfilled]: (state, actions) => {
      console.log("[Fulfilled] token ", actions.payload.data);
      return { ...state, identification: actions.payload.data };
    },

    [signup.pending]: (state, actions) => {
      console.log("[Rejected] signup errorMsg= ", actions);
    },
    [signup.pending]: (state, actions) => {
      console.log("[Pending] signup state= ", state);
    },
    [signup.fulfilled]: (state, actions) => {
      console.log("[Fulfilled] signup errorMsg= ", actions);
    },
  },
});

export default authSlice.reducer;
