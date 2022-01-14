import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "../services/auth.service";
import chatService from "../services/chat.service";
import chatRoomDetailsService from "../services/chatRoomDetails.service";
import { logout } from "./authSlice";

const initialState = [];

export const createChatRoom = createAsyncThunk(
  "chatRoom/createChatRoom",
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

export const getChatRoomInfo = createAsyncThunk(
  "chatRoom/getChatRoomInfo",
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
export const getQtyMemberInRoomID = createAsyncThunk(
  "chatRoom/getQtyMemberInRoomID",
  async (payload, thunkAPI) => {
    try {
      const res = await chatRoomDetailsService.getQtyMemberInRoomID(
        payload.chatRoomId
      );
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

export const getChatMessage = createAsyncThunk(
  "chatRoom/getChatMessage",
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
  "chatRoom/addMessageToRoom",
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

    [getQtyMemberInRoomID.rejected]: (state, actions) => {
      console.log("[Rejected] getQtyMemberInRoomID", actions.payload);
    },
    [getQtyMemberInRoomID.fulfilled]: (state, actions) => {
      console.log("[Fulfilled] getQtyMemberInRoomID", actions.payload);
      return { ...state, QtyMemberInRoomID: actions.payload };
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
