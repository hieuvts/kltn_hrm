import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import taskService from "../services/task.service";
import { logout } from "./authSlice";

const initialState = {
  taskList: [],
  currentSelectedTask: {},
  selectedTaskList: [],
};

export const getTaskAsync = createAsyncThunk(
  "task/getAllTask",
  async (payload, thunkAPI) => {
    let searchQuery = "";
    if (typeof payload === "undefined") {
      console.log("search is undefined");
    } else {
      console.log("typeof payload.Searchquery", typeof payload.searchQuery);
      searchQuery = payload.searchQuery;
    }
    try {
      const res = await taskService.getAllTask(searchQuery);

      return res.data.tasks;
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

export const addTaskAsync = createAsyncThunk(
  "task/addTask",
  async (payload, thunkAPI) => {
    try {
      const res = await taskService.addTask(payload);
      return res.data.tasks;
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

export const updateTaskAsync = createAsyncThunk(
  "task/updateTask",
  async (payload, thunkAPI) => {
    try {
      const res = await taskService.updateTask(payload._id, payload);

      return res.data.tasks;
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

export const deleteTaskAsync = createAsyncThunk(
  "task/delete",
  async (payload, thunkAPI) => {
    try {
      const res = await taskService.deleteTask(payload.selectedTaskID);
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

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    getTaskInfo: (state, action) => {
      console.log("[taskSlice.js] action.payload=", action.payload);
      state.name = action.payload.name;
    },
    setCurrentSelectedTask: (state, action) => {
      return {
        ...state,
        currentSelectedTask: action.payload.currentSelectedTask,
      };
    },
    addToSelectedTaskList: (state, action) => {
      state.selectedTaskList.push(action.payload.selectedTask);
    },
    removeFromSelectedTaskList: (state, action) => {
      state.selectedTaskList = state.selectedTaskList.filter(
        (task) => task._id !== action.payload.selectedTask._id
      );
    },
    setMultiSelectedTaskList: (state, action) => {
      const selectedTaskList = action.payload;
      selectedTaskList.forEach((task) => state.selectedTaskList.push(task));
    },
  },
  extraReducers: {
    // Get Task from server
    [getTaskAsync.pending]: (state, actions) => {
      console.log("[Pending] getTaskAsync state= ", state);
    },
    [getTaskAsync.rejected]: (state, actions) => {
      console.log("[Rejected] getTaskAsync errorMsg= ", actions);
    },
    [getTaskAsync.fulfilled]: (state, actions) => {
      console.log("[Fulfilled] getTaskAsync ");
      return { ...state, taskList: actions.payload };
    },

    [addTaskAsync.rejected]: (state, actions) => {
      console.log("[Rejected] addTaskAsync errorMsg= ", actions.payload);
    },
    [addTaskAsync.fulfilled]: (state, actions) => {
      console.log(
        "[Fulfilled] addTaskAsync actions.payload.tasks= ",
        actions.payload
      );
      // state.push(actions.payload.Task);
    },
    [updateTaskAsync.rejected]: (state, actions) => {
      console.log("[Rejected] updateTaskAsync errorMsg= ", actions.payload);
    },
    [updateTaskAsync.fulfilled]: (state, actions) => {
      console.log(
        "[Fulfilled] updateTaskAsync actions.payload.tasks= ",
        actions.payload
      );
      // state.push(actions.payload.Task);
      return;
    },

    // Delete Task from server
    [deleteTaskAsync.rejected]: (state, actions) => {
      console.log("[Rejected] deleteTaskAsync errorMsg ", actions.payload);
    },
    [deleteTaskAsync.fulfilled]: (state, actions) => {
      console.log(
        "[Fulfilled] deleteTaskAsync actions.payload.tasks= ",
        actions.payload
      );
      return;
    },
  },
});
export const {
  getTaskInfo,
  setCurrentSelectedTask,
  addToSelectedTaskList,
  removeFromSelectedTaskList,
  setMultiSelectedTaskList,
} = taskSlice.actions;

export default taskSlice.reducer;
