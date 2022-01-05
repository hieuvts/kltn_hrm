import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import projectService from "../services/project.service";

const initialState = {
  projectList: [],
  currentSelectedProject: {},
  selectedProjectList: [],
};

export const getProjectAsync = createAsyncThunk(
  "project/getAllProject",
  async (payload, { rejectWithValue }) => {
    let searchQuery = "";
    if (typeof payload === "undefined") {
      console.log("search is undefined");
    } else {
      console.log("typeof payload.Searchquery", typeof payload.searchQuery);
      searchQuery = payload.searchQuery;
    }
    try {
      const res = await projectService.getAllProject(searchQuery);

      return res.data.projects;
    } catch {
      return rejectWithValue("Get project not successful");
    }
  }
);

export const addProjectAsync = createAsyncThunk(
  "project/addProject",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await projectService.addProject(payload);
      return res.data.projects;
    } catch(error) {
      return rejectWithValue("Add project not successful");
    }
  }
);

export const updateProjectAsync = createAsyncThunk(
  "project/updateProject",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await projectService.updateProject(payload._id, payload);

      return res.data.projects;
    } catch {
      return rejectWithValue("Update project not successful");
    }
  }
);

export const deleteProjectAsync = createAsyncThunk(
  "project/delete",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await projectService.deleteProject(
        payload.selectedProjectID
      );
      return res.data;
    } 
    catch {
      return rejectWithValue("Delete project not successful");
    }
  }
);

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    getProjectInfo: (state, action) => {
      console.log("[projectSlice.js] action.payload=", action.payload);
      state.name = action.payload.name;
    },
    setCurrentSelectedProject: (state, action) => {
      return {
        ...state,
        currentSelectedProject: action.payload.currentSelectedProject,
      };
    },
    addToSelectedProjectList: (state, action) => {
      state.selectedProjectList.push(action.payload.selectedProject);
    },
    removeFromSelectedProjectList: (state, action) => {
      state.selectedProjectList = state.selectedProjectList.filter(
        (project) => project._id !== action.payload.selectedProject._id
      );
    },
    setMultiSelectedProjectList: (state, action) => {
      const selectedProjectList = action.payload;
      selectedProjectList.forEach((project) =>
        state.selectedProjectList.push(project)
      );
    },
  },
  extraReducers: {
    // Get Project from server
    [getProjectAsync.pending]: (state, actions) => {
      console.log("[Pending] getProjectAsync state= ", state);
    },
    [getProjectAsync.rejected]: (state, actions) => {
      console.log("[Rejected] getProjectAsync errorMsg= ", actions);
    },
    [getProjectAsync.fulfilled]: (state, actions) => {
      console.log("[Fulfilled] getProjectAsync ");
      return { ...state, projectList: actions.payload };
    },

    [addProjectAsync.rejected]: (state, actions) => {
      console.log("[Rejected] addProjectAsync errorMsg= ", actions.payload);
    },
    [addProjectAsync.fulfilled]: (state, actions) => {
      console.log(
        "[Fulfilled] addProjectAsync actions.payload.projects= ",
        actions.payload
      );
      // state.push(actions.payload.Project);
    },
    [updateProjectAsync.rejected]: (state, actions) => {
      console.log("[Rejected] updateProjectAsync errorMsg= ", actions.payload);
    },
    [updateProjectAsync.fulfilled]: (state, actions) => {
      console.log(
        "[Fulfilled] updateProjectAsync actions.payload.projects= ",
        actions.payload
      );
      // state.push(actions.payload.Project);
      return;
    },

    // Delete Project from server
    [deleteProjectAsync.rejected]: (state, actions) => {
      console.log("[Rejected] deleteProjectAsync errorMsg ", actions.payload);
    },
    [deleteProjectAsync.fulfilled]: (state, actions) => {
      console.log(
        "[Fulfilled] deleteProjectAsync actions.payload.projects= ",
        actions.payload
      );
      return;
    },
  },
});
export const {
  getProjectInfo,
  setCurrentSelectedProject,
  addToSelectedProjectList,
  removeFromSelectedProjectList,
  setMultiSelectedProjectList,
} = projectSlice.actions;

export default projectSlice.reducer;
