import React, { useState, useEffect, useCallback } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

import { Typography, Button } from "@mui/material";
import Link from "@mui/material/Link";
import MyBreadcrumbs from "../../components/CustomizedMUIComponents/MyBreadcrumbs";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import MuiAlert from "@mui/material/Alert";
import { Snackbar } from "@mui/material";
import MySearchBox from "../../components/CustomizedMUIComponents/StyledSearchBox";
import ProjectTable from "../../components/Project/ProjectList";
import DialogAddProject from "../../components/Project/DialogAddProject";
import DialogUpdateProject from "../../components/Project/DialogUpdateProject";
import debounce from "lodash.debounce";
//Redux
import { useDispatch } from "react-redux";
import { getProjectAsync } from "../../stores/projectSlice";
import { getDepartmentAsync } from "../../stores/departmentSlice";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Project() {
  const dispatch = useDispatch();
  const pathnames = location.pathname.split("/").filter((x) => x);

  // Add Project Dialog
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isDialogExportProjectOpen, setDialogExportProjectOpen] =
    useState(false);
  // Working with Snackbar
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);
  // Working with search func
  const [searchQuery, setSearchQuery] = useState("");
  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const setDialogExportProjectClose = () => {
    setDialogExportProjectOpen(false);
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
      dispatch(getProjectAsync({ searchQuery: searchQuery }));
    }, 350),
    []
  );
  useEffect(() => {
    debounceFetchAPI(searchQuery);
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
          Created new project!
        </Alert>
      </Snackbar>

      <DialogAddProject
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
        <Grid item paddingTop={{ xs: 2, sm: 0 }} xs={12} sm={3} md={2}>
          <Button variant="outlined">
            <FileDownloadOutlinedIcon fontSize="medium" />
            <Typography variant="h6" sx={{ pl: 1 }}>
              Import
            </Typography>
          </Button>
        </Grid>
        <Grid item xs={12} sm={3} md={2}>
          <Button
            variant="outlined"
            onClick={() => setDialogExportProjectOpen(true)}
          >
            <FileUploadOutlinedIcon fontSize="medium" />
            <Typography variant="h6" sx={{ pl: 1 }}>
              Export
            </Typography>
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={2} paddingTop={{ xs: 2, sm: 0, md: 0 }}>
          <Button variant="contained" onClick={() => handleDialogOpen()}>
            <Typography variant="h6">Add Project</Typography>
          </Button>
        </Grid>
      </Grid>

      <Paper elevation={1} sx={{ my: 3, p: 3 }}>
        <MySearchBox
          placeholder="Search For Project"
          handleSearchQueryChange={handleSearchQueryChange}
        />
      </Paper>
      <div>
        <ProjectTable />
      </div>
    </>
  );
}
