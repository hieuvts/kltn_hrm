import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userService from "../services/user.service";

const initialState = {
  userList: [],
  currentUser: {
    employee: {
      fname: "",
      lname: "",
    },
  },
};

export const getAllUser = createAsyncThunk(
  "user/getAllUser",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await userService.getAllUser();

      return res.data;
    } catch (error) {
      return rejectWithValue(`Get all user not successful ${error}`);
    }
  }
);

export const getUser = createAsyncThunk(
  "user/getUser",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await userService.getUser(payload.userId);

      return res.data.user;
    } catch (error) {
      return rejectWithValue(`Get user not successful ${error}`);
    }
  }
);

// export const updateUserInfo = createAsyncThunk(
//   "user/updateUser",
//   async (payload, { rejectWithValue }) => {
//     try {
//       const res = await userService.updateuser(payload._id, payload);

//       return res.data.users;
//     } catch (error) {
//       return rejectWithValue(`Update user not successful ${error}`);
//     }
//   }
// );

// export const deleteUser = createAsyncThunk(
//   "user/deleteUser",
//   async (payload, { rejectWithValue }) => {
//     try {
//       const res = await userService.deleteuser(payload.selecteduserId);

//       return res.data;
//     } catch (error) {
//       return rejectWithValue(`Delete user not successful ${error}`);
//     }
//   }
// );

export const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: {
    // Get user from server
    [getAllUser.pending]: (state, actions) => {
      console.log("[Pending] getAllUser", actions);
    },
    [getAllUser.rejected]: (state, actions) => {
      console.log("[Rejected] getAllUser", actions.payload);
    },
    [getAllUser.fulfilled]: (state, actions) => {
      return { ...state, userList: actions.payload };
      console.log("[Fulfilled] getAllUser", actions);
    },

    // Get one user from server
    [getUser.pending]: (state, actions) => {
      console.log("[Pending] getUser", actions);
    },
    [getUser.rejected]: (state, actions) => {
      console.log("[Rejected] getUser", actions.payload);
    },
    [getUser.fulfilled]: (state, actions) => {
      console.log("[Fulfilled] getUser", actions);
      return {
        ...state,
        currentUser: actions.payload,
      };
    },
  },
});

export default userSlice.reducer;
