import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setMessage } from "./messageSlice";
import authService from "../services/auth.service";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

export const signUp = createAsyncThunk(
  "auth/signup",
  async (payload, thunkAPI) => {
    try {
      const res = await authService.signUp(payload.email, payload.password);
      thunkAPI.dispatch(setMessage(res.data.message));
      return res.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (payload, thunkAPI) => {
    try {
      const data = await authService.login(payload.email, payload.password);
      return { user: data};
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
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
    [signUp.pending]: (state, actions) => {
      console.log("[Rejected] signup actions= ", actions);
    },
    [signUp.rejected]: (state, actions) => {
      state.isLoggedIn = false;
      console.log("[Pending] signup actions= ", actions);
    },
    [signUp.fulfilled]: (state, actions) => {
      state.isLoggedIn = false;
      console.log("[Fulfilled] signup actions= ", actions);
    },

    [login.pending]: (state, actions) => {
      console.log("[Pending] login state= ", state);
    },
    [login.rejected]: (state, actions) => {
      state.isLoggedIn = false;
      state.user = null;
      console.log("[Rejected] login error: ", actions.payload);
    },
    [login.fulfilled]: (state, actions) => {
      state.isLoggedIn = true;
      state.user = actions.payload.user;
      console.log("[Fulfilled] Login with  ");
    },

    [logout.fulfilled]: (state, actions) => {
      state.isLoggedIn = false;
      state.user = null;
      console.log("[Fulfilled] logout success");
    },
  },
});

export default authSlice.reducer;
