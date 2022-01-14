import React, { useState, useEffect, useCallback } from "react";
import Grid from "@mui/material/Grid";

import { Typography, Button } from "@mui/material";

import MuiAlert from "@mui/material/Alert";
import { Snackbar } from "@mui/material";
import TaskList from "../../components/Task/TaskList";
import DialogAddTask from "../../components/Task/DialogAddTask";
import MyBreadcrumbs from "../../components/CustomizedMUIComponents/MyBreadcrumbs";
import debounce from "lodash.debounce";
//Redux
import { useDispatch, useSelector } from "react-redux";
import { getTaskAsync } from "../../stores/taskSlice";
import { getDepartmentAsync } from "../../stores/departmentSlice";
import { getEmployeeAsync } from "../../stores/employeeSlice";
import { getProjectAsync } from "../../stores/projectSlice";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Task() {
  const dispatch = useDispatch();
  const pathnames = location.pathname.split("/").filter((x) => x);

  // Add Task Dialog
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isDialogExportTaskOpen, setDialogExportTaskOpen] = useState(false);
  // Working with Snackbar
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);
  // Working with search func
  const [searchQuery, setSearchQuery] = useState("");
  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const setDialogExportTaskClose = () => {
    setDialogExportTaskOpen(false);
  };
  const handleDialogClose = () => {
    setDialogOpen(false);
  };
  const handleSnackbarOpen = () => {
    setSnackbarOpen(true);
  };
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };
  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
    console.log("current searchQuery --> ", e.target.value);
  };
  const debounceFetchAPI = useCallback(
    debounce((searchQuery) => {
      dispatch(getTaskAsync({ searchQuery: searchQuery }));
    }, 350),
    []
  );
  useEffect(() => {
    debounceFetchAPI(searchQuery);
    dispatch(getDepartmentAsync());
    dispatch(getEmployeeAsync());
    dispatch(getProjectAsync());
  }, [handleSearchQueryChange]);

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={isSnackbarOpen}
        autoHideDuration={2500}
        onClose={handleSnackbarClose}
        key={"top" + "right"}
        sx={{ mt: "5%" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Created new task!
        </Alert>
      </Snackbar>

      <DialogAddTask
        isDialogOpen={isDialogOpen}
        setDialogOpen={setDialogOpen}
        handleCloseDialog={handleDialogClose}
        handleSnackbarOpen={handleSnackbarOpen}
      />
      <MyBreadcrumbs pathnames={pathnames} />
      <Grid
        container
        justifyContent="flex-end"
        textAlign={{ sm: "right", md: "center" }}
        padding={{ sm: 5, md: 0 }}
        sx={{ alignItems: "center" }}
      >
        <Grid item paddingTop={{ xs: 2, sm: 0 }} xs={12} sm={3} md={2}></Grid>
        <Grid item xs={12} sm={3} md={2}></Grid>
        <Grid item xs={12} sm={6} md={2} paddingTop={{ xs: 2, sm: 0, md: 0 }}>
          <Button variant="contained" onClick={() => handleDialogOpen()}>
            <Typography variant="h6">Add Task</Typography>
          </Button>
        </Grid>
      </Grid>

      <div
        style={{ display: "flex", justifyContent: "center", height: "100%" }}
      >
        <TaskList />
      </div>
    </>
  );
}
