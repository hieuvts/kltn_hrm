import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import notifService from "../services/notif.service";

const initialState = [];

export const getNotif = createAsyncThunk(
  "notif/getNotif",
  async (payload, thunkAPI) => {
    let authAccountID = "";
    if (typeof payload === "undefined") {
      console.log("search is undefined");
    } else {
      console.log("typeof payload.Searchquery", typeof payload.authAccountID);
      authAccountID = payload.authAccountID;
    }
    try {
      const res = await notifService.getNotif(authAccountID);

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

export const markNotifAsRead = createAsyncThunk(
  "notif/markNotifAsRead",
  async (payload, thunkAPI) => {
    try {
      const res = await notifService.markNotifAsRead(payload.id);

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

export const deleteNotif = createAsyncThunk(
  "notif/deleteNotif",
  async (payload, thunkAPI) => {
    try {
      const res = await notifService.deleteNotif(payload.id);
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

export const deleteAllNotif = createAsyncThunk(
  "notif/deleteAllNotif",
  async (payload, thunkAPI) => {
    try {
      const res = await notifService.deleteAllNotif(payload.authAccountID);
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

export const notifSlice = createSlice({
  name: "notif",
  initialState,
  extraReducers: {
    // Get Task from server
    [getNotif.pending]: (state, actions) => {
      console.log("[Pending] getNotif state= ", state);
    },
    [getNotif.rejected]: (state, actions) => {
      console.log("[Rejected] getNotif errorMsg= ", actions);
    },
    [getNotif.fulfilled]: (state, actions) => {
      console.log("[Fulfilled] getNotif ");
      return actions.payload;
    },

    [markNotifAsRead.rejected]: (state, actions) => {
      console.log("[Rejected] markNotifAsRead errorMsg= ", actions.payload);
    },
    [markNotifAsRead.fulfilled]: (state, actions) => {
      console.log(
        "[Fulfilled] markNotifAsRead actions.payload.tasks= ",
        actions.payload
      );
      // state.push(actions.payload.Task);
      return;
    },

    // Delete Task from server
    [deleteNotif.rejected]: (state, actions) => {
      console.log("[Rejected] deleteNotif errorMsg ", actions.payload);
    },
    [deleteNotif.fulfilled]: (state, actions) => {
      console.log(
        "[Fulfilled] deleteNotif actions.payload.tasks= ",
        actions.payload
      );
      return;
    },

    [deleteAllNotif.rejected]: (state, actions) => {
      console.log("[Rejected] deleteAllNotif errorMsg ", actions.payload);
    },
    [deleteAllNotif.fulfilled]: (state, actions) => {
      console.log(
        "[Fulfilled] deleteAllNotif actions.payload.tasks= ",
        actions.payload
      );
      return;
    },
  },
});
// export const {
//   getTaskInfo,
//   setCurrentSelectedTask,
//   addToSelectedTaskList,
//   removeFromSelectedTaskList,
//   setMultiSelectedTaskList,
// } = notifSlice.actions;

export default notifSlice.reducer;
