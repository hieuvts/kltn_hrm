import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setMessage } from "./messageSlice";
import { apiBaseUrl } from "../config/apiBaseUrl";
import axios from "axios";
import authService from "../services/auth.service";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

export const signup = createAsyncThunk(
  "auth/signup",
  async (payload, thunkAPI) => {
    try {
      const res = await authService.signup(payload.email, payload.password);
      thunkAPI.dispatch(setMessage(res.data.message));
      return res.data;
    } catch (error) {
      thunkAPI.dispatch(setMessage(error));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (payload, thunkAPI) => {
    try {
      const data = await authService.login(payload.email, payload.password);
      return { user: data };
    } catch (error) {
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [signup.pending]: (state, actions) => {
      console.log("[Rejected] signup actions= ", actions);
    },
    [signup.rejected]: (state, actions) => {
      state.isLoggedIn = false;
      console.log("[Pending] signup actions= ", actions);
    },
    [signup.fulfilled]: (state, actions) => {
      state.isLoggedIn = false;
      console.log("[Fulfilled] signup actions= ", actions);
    },

    [login.pending]: (state, actions) => {
      console.log("[Pending] login state= ", state);
    },
    [login.rejected]: (state, actions) => {
      state.isLoggedIn = false;
      state.user = null;
      console.log("[Rejected] login errorMsg= ", actions);
    },
    [login.fulfilled]: (state, actions) => {
      state.isLoggedIn = true;
      state.user = actions.payload.user;
      console.log("[Fulfilled] Login with  ", actions.payload.user);
    },

    [logout.fulfilled]: (state, actions) => {
      state.isLoggedIn = false;
      state.user = null;
      console.log("[Fulfilled] logout success");
    },
  },
});

export default authSlice.reducer;
