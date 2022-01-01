import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import { apiBaseUrl } from "../config/apiBaseUrl";

const initialState = {
    departmentList: [],
    currentSelectedDepartment: {},
    selectedDepartmentList: [],
}

export const getDepartmentASync = createAsyncThunk("department/getAllDepartment", async (payload, { rejectWithValue }) => {
    let searchQuery = "";
    if (typeof [payload === "undefined"]) {
        console.log("search is undefined");
    }
    else {
        console.log("typeof payload.Searchquery", typeof payload.searchQuery);
        searchQuery = payload.searchQuery;
    }
    try {
        const res = await fetch(
            `${apiBaseUrl}/department/getAll?search=${searchQuery}`
        );
        if (res.ok) {
            const resFromServer = await res.json();
            const department = resFromServer.departments;
            console.log("Get all departmnet successful");
            return { departmentList: department };
        }
        else {
            console.log("[FAILED] getDepartmentAsync: ", res.status);
            return rejectWithValue("Get department not successful");
        }
    }
    catch (error) {
        return rejectWithValue("Get department not successful");
    }
});

export const addDepartmentASync = createAsyncThunk(
    "department/addDepartment",
    async (payload, { rejectWithValue }) => {
        try {
            const res = await fetch(`${apiBaseUrl}/department/create`, {
                method: "POST",
                headers: { "Content-Type": "application/json", },
                body: JSON.stringify({
                    name: payload.name,
                    amout: payload.amout,
                    manager: payload.manager,
                    isDeleted: false,
                }),
            });
            if (res.ok) {
                const department = await res.json();
                return { department };
            } else return rejectWithValue("Add department not successful");
        }
        catch (error) {
            return rejectWithValue("Add department not successful");
        }
    }
);

export const updateDepartmentAsync = createAsyncThunk(
    "department/updateDepartment",
    async (payload, { rejectWithValue }) => {
        try {
            const res = await fetch(`${apiBaseUrl}/department/${payload._id}/put`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: payload.name,
                    amout: payload.amout,
                    manager: payload.manager,
                    isDeleted: false,
                }),
            });
            if (res.ok) {
                const department = await res.json();
                return { department };
            } else return rejectWithValue("Update department not successful");
        }
        catch (error) {
            return rejectWithValue("Update department not successful");
        }
    }
);

export const deleteDepartmentAsync = createAsyncThunk(
    "department/delete",
    async (payload, { rejectWithValue }) => {
        try {
            const res = await fetch(
                `${apiBaseUrl}/department/${payload.selecteddepartmentId}/delete`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ _id: payload._id }),
                }
            );
            if (!res.ok) {
                rejectWithValue("Delete department not successful");
            } else {
                console.log("[deletedepartmentAsync] success");
            }
        } catch {
            return rejectWithValue("Delete department not successful");
        }
    }
); 

export const departmentSlice = createSlice({
    name: "department",
    initialState,
    reducers: {
      getdepartmentInfo: (state, action) => {
        console.log("[departmentSlice.js] action.payload=", action.payload);
        state.name = action.payload.name;
      },
      setCurrentSelectedDepartment: (state, action) => {
        return {
          ...state,
          currentSelectedDepartment: action.payload.currentSelectedDepartment,
        };
      },
      addToSelectedDepartmentList: (state, action) => {
        state.selectedDepartmentList.push(action.payload.selectedDepartment);
      },
      removeFromSelectedDepartmentList: (state, action) => {
        state.selectedDepartmentList = state.selectedDepartmentList.filter(
          (department) => department._id !== action.payload.setCurrentSelectedDepartment._id
        );
      },
      setMultiSelectedDepartmentList: (state, action) => {
        const selectedDepartmentList = action.payload;
        selectedDepartmentList.forEach((department) =>
          state.selectedDepartmentList.push(department)
        );
      },
    },
    extraReducers: {
      // Get Department from server
      [getDepartmentASync.pending]: (state, actions) => {
        console.log("[Pending] getDepartmentAsync state= ", state);
      },
      [getDepartmentASync.rejected]: (state, actions) => {
        console.log("[Rejected] getDepartmentAsync errorMsg= ", actions);
      },
      [getDepartmentASync.fulfilled]: (state, actions) => {
        console.log(
          "[Fulfilled] getDepartmentAsync actions.payload.Departments= ",
          actions.payload
        );
        return { ...state, departmentList: actions.payload.departmentList };
      },
  
      // Add Department to server
      // [addDepartmentAsync.pending]: (state, actions) => {
      //   console.log("[Pending] addDepartmentAsync state= ", state);
      // },
      [addDepartmentASync.rejected]: (state, actions) => {
        console.log("[Rejected] addDepartmentASync errorMsg= ", actions.payload);
      },
      [addDepartmentASync.fulfilled]: (state, actions) => {
        console.log(
          "[Fulfilled] addDepartmentASync actions.payload.Departments= ",
          actions.payload
        );
        // state.push(actions.payload.Department);
      },
  
      // Add Department to server
      // [updateDepartmentAsync.pending]: (state, actions) => {
      //   console.log("[Pending] updateDepartmentAsync state= ", state);
      // },
      [updateDepartmentAsync.rejected]: (state, actions) => {
        console.log("[Rejected] updateDepartmentAsync errorMsg= ", actions.payload);
      },
      [updateDepartmentAsync.fulfilled]: (state, actions) => {
        console.log(
          "[Fulfilled] updateDepartmentAsync actions.payload.Departments= ",
          actions.payload
        );
        // state.push(actions.payload.Department);
        return;
      },
  
      // Delete Department from server
      [deleteDepartmentAsync.rejected]: (state, actions) => {
        console.log("[Rejected] deleteDepartmentAsync errorMsg ", actions.payload);
      },
      [deleteDepartmentAsync.fulfilled]: (state, actions) => {
        console.log(
          "[Fulfilled] deleteDepartmentAsync actions.payload.Departments= ",
          actions.payload
        );
        return;
      },
    },
  });
  export const {
    getdepartmentInfo,
    setCurrentSelectedDepartment,
    addToSelectedDepartmentList,
    removeFromSelectedDepartmentList,
    setMultiSelectedDepartmentList,
  } = departmentSlice.actions;
  
  export default departmentSlice.reducer;