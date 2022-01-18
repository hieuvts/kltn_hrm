import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setMessage } from "./messageSlice";
import authService from "../services/auth.service";

const userFromLocalStorage = JSON.parse(localStorage.getItem("user"));

const isLoggedIn = userFromLocalStorage ? true : false;
const user = userFromLocalStorage ? userFromLocalStorage : null;

const initialState = {
  isLoggedIn: isLoggedIn,
  user: user,
  chatRooms: [],
  authAccountList: [],
  currentSelectedAuthAccount: {},
  selectedAuthAccountList: [],
};
export const signUp = createAsyncThunk(
  "auth/signup",
  async (payload, thunkAPI) => {
    try {
      const res = await authService.signUp(
        payload.email,
        payload.password,
        payload.privilege,
        payload.companyID
      );
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
      return { user: data };
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

export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (payload, thunkAPI) => {
    try {
      const res = await authService.changePassword(payload);
      return res.data.message;
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

export const deleteAccount = createAsyncThunk(
  "auth/deleteAccount",
  async (payload, thunkAPI) => {
    try {
      const res = await authService.deleteAccount(payload);
      return res.data.message;
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

export const getChatRoomByAuthAccount = createAsyncThunk(
  "auth/getChatRoomByAuthAccount",
  async (payload, thunkAPI) => {
    try {
      const res = await authService.getChatRoomByAuthAccount(
        payload.id,
        payload.searchQuery
      );
      return res.data.ChatRooms;
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

export const getAccountInfoByID = createAsyncThunk(
  "auth/getAccountInfoByID",
  async (payload, thunkAPI) => {
    try {
      const res = await authService.getAccountInfoByID(payload.id);
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

export const getAllAccount = createAsyncThunk(
  "auth/getAllAccount",
  async (payload, thunkAPI) => {
    try {
      const res = await authService.getAllAccount(payload.searchQuery);
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

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCurrentSelectedAuthAccount: (state, action) => {
      return {
        ...state,
        currentSelectedAuthAccount: action.payload.currentSelectedAuthAccount,
      };
    },
    addToSelectedAuthAccountList: (state, action) => {
      state.selectedAuthAccountList.push(action.payload.selectedAuthAccount);
    },
    removeFromSelectedAuthAccountList: (state, action) => {
      state.selectedAuthAccountList = state.selectedAuthAccountList.filter(
        (AuthAccount) =>
          AuthAccount._id !== action.payload.selectedAuthAccount._id
      );
    },
    setMultiSelectedAuthAccountList: (state, action) => {
      const selectedAuthAccountList = action.payload;
      selectedAuthAccountList.forEach((AuthAccount) =>
        state.selectedAuthAccountList.push(AuthAccount)
      );
    },
  },
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

    [changePassword.fulfilled]: (state, actions) => {
      // state.isLoggedIn = false;
      // state.user = null;
      console.log("[Fulfilled] changePassword success");
    },

    [getChatRoomByAuthAccount.rejected]: (state, actions) => {
      console.log("[Rejected] getChatRoomByAuthAccount ", actions.payload);
    },
    [getChatRoomByAuthAccount.fulfilled]: (state, actions) => {
      console.log("[Fulfilled] getChatRoomByAuthAccount");
      return { ...state, chatRooms: actions.payload };
    },

    [getAccountInfoByID.rejected]: (state, actions) => {
      console.log("[Rejected] getAccountInfoByID");
    },
    [getAccountInfoByID.fulfilled]: (state, actions) => {
      console.log("[Fulfilled] getAccountInfoByID");
      return { ...state, user: actions.payload };
    },

    [getAllAccount.rejected]: (state, actions) => {
      console.log("[Rejected] getAllAccount");
    },
    [getAllAccount.fulfilled]: (state, actions) => {
      console.log("[Fulfilled] getAllAccount");
      return { ...state, authAccountList: actions.payload };
    },

    [deleteAccount.rejected]: (state, actions) => {
      console.log("[Rejected] deleteAccount");
    },
    [deleteAccount.fulfilled]: (state, actions) => {
      console.log("[Fulfilled] deleteAccount");
      return;
    },
  },
});

export const {
  setCurrentSelectedAuthAccount,
  addToSelectedAuthAccountList,
  removeFromSelectedAuthAccountList,
  setMultiSelectedAuthAccountList,
} = authSlice.actions;

export default authSlice.reducer;
