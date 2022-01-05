import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "../services/auth.service";
import chatService from "../services/chat.service";

const initialState = {
  members: [],
  name: "",
  messages: [],
};

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
      thunkAPI.dispatch(setMessage(message));
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
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const getChatMessage = createAsyncThunk(
  "chat/getChatMessage",
  async (payload, { rejectWithValue }) => {
    console.log("check get", payload);
    try {
      const res = await chatService.getChatMessage(payload.chatRoomId);
      console.log("getall data ", res.data);
      return res.data.messages;
    } catch (error) {
      console.log(error);
      return rejectWithValue(`Get message not successful ${error}`);
    }
  }
);
export const addMessageToRoom = createAsyncThunk(
  "chat/addMessageToRoom",
  async (payload, { rejectWithValue }) => {
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
      thunkAPI.dispatch(setMessage(message));
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
      return { ...state.messages, messages: newMsg };
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
