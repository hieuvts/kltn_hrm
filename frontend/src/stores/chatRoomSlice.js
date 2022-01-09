import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "../services/auth.service";
import chatService from "../services/chat.service";
import { logout } from "./authSlice";

const initialState = [];

export const createChatRoom = createAsyncThunk(
  "chat/createChatRoom",
  async (payload, thunkAPI) => {
    try {
      const data = await chatService.createChatRoom(payload.chatRoomInfo);
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
export const getAllChatRoom = createAsyncThunk(
  "chat/getAllChatRoom",
  async (payload, thunkAPI) => {
    try {
      const res = await chatService.getAllChatRoom();
      console.log("getall chatroom ", res.data);
      return res.data.chatrooms;
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

export const getChatRoomInfo = createAsyncThunk(
  "chat/getChatRoomInfo",
  async (payload, thunkAPI) => {
    try {
      const data = await chatService.getChatRoomInfo(payload.chatRoomId);
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
export const getChatMessage = createAsyncThunk(
  "chat/getChatMessage",
  async (payload, thunkAPI) => {
    console.log("check get", payload);
    try {
      const res = await chatService.getChatMessage(payload.chatRoomId);
      console.log("getall data ", res.data);
      return { chatRoomId: payload.chatRoomId, messages: res.data.messages };
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
export const addMessageToRoom = createAsyncThunk(
  "chat/addMessageToRoom",
  async (payload, thunkAPI) => {
    try {
      const res = await chatService.addMessageToRoom(
        payload,
        chatRoomId,
        payload.message
      );
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

export const chatRoomSlice = createSlice({
  name: "chatRoom",
  initialState,
  extraReducers: {
    [getChatRoomInfo.pending]: (state, actions) => {
      console.log("[Pending] getChatRoomInfo", actions);
    },
    [getChatRoomInfo.rejected]: (state, actions) => {
      console.log("[Rejected] getChatRoomInfo", actions.payload);
    },
    [getChatRoomInfo.fulfilled]: (state, actions) => {
      state.push(actions.payload);
      console.log("[Fulfilled] getChatRoomInfo", actions);
    },

    //
    [getAllChatRoom.pending]: (state, actions) => {
      console.log("[Pending] getChatRoomInfo", actions);
    },
    [getAllChatRoom.rejected]: (state, actions) => {
      console.log("[Rejected] getAllChatRoom", actions.payload);
    },
    [getAllChatRoom.fulfilled]: (state, actions) => {
      console.log("[Fulfilled] getAllChatRoom", actions);
      return actions.payload;
    },

    //
    [getChatMessage.pending]: (state, actions) => {
      console.log("[Pending] getChatMessage ", state);
    },
    [getChatMessage.rejected]: (state, actions) => {
      console.log("[Rejected] getChatMessage ", actions.payload);
    },
    [getChatMessage.fulfilled]: (state, actions) => {
      const newMsg = actions.payload;
      console.log("getChatMessage payload ", newMsg);

      console.log("[Fulfilled] getChatMessage ");
      state.push(actions.payload);
    },

    //
    [addMessageToRoom.pending]: (state, actions) => {
      console.log("[Pending] addMessageToRoom", state);
    },
    [addMessageToRoom.rejected]: (state, actions) => {
      console.log("[Rejected] addMessageToRoom ", actions.payload);
    },
    [addMessageToRoom.fulfilled]: (state, actions) => {
      console.log("[Fulfilled] addMessageToRoom  ");
    },

    //
    [createChatRoom.pending]: (state, actions) => {
      console.log("[Pending] createChatRoom", state);
    },
    [createChatRoom.rejected]: (state, actions) => {
      console.log("[Rejected] createChatRoom", actions.payload);
    },
    [createChatRoom.fulfilled]: (state, actions) => {
      state.push(actions.payload);
      console.log("[Fulfilled] createChatRoom  ");
    },
  },
});

export default chatRoomSlice.reducer;
