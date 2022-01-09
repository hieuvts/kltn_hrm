import React, { useState, useEffect, useCallback } from "react";

import { useDispatch } from "react-redux";
import { getDepartmentAsync } from "../../stores/departmentSlice";

import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MuiAlert from "@mui/material/Alert";
import { Typography, Button, InputBase } from "@mui/material";
import MyBreadcrumbs from "../../components/CustomizedMUIComponents/MyBreadcrumbs";
import Link from "@mui/material/Link";
import DepartmentTable from "../../components/Department/DepartmentList";
import DialogAddDepartment from "../../components/Department/DialogAddDepartment";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import SearchIcon from "@mui/icons-material/Search";
import debounce from "lodash.debounce";
import MySearchBox from "../../components/CustomizedMUIComponents/StyledSearchBox";
import { Snackbar } from "@mui/material";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Department() {
  const dispatch = useDispatch();
  const pathnames = location.pathname.split("/").filter((x) => x);

  // // Add Department Dialog
  const [isDialogOpen, setDialogOpen] = useState(false);
  // const [isDialogExportEmployeeOpen, setDialogExportEmployeeOpen] =
  //   useState(false);
  // Working with Snackbar
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);
  // Working with search func
  const [searchQuery, setSearchQuery] = useState("");
  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  // const setDialogExportEmployeeClose = () => {
  //   setDialogExportEmployeeOpen(false);
  // };
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
      dispatch(getDepartmentAsync({ searchQuery: searchQuery }));
    }, 500),
    []
  );

  useEffect(() => {
    debounceFetchAPI(searchQuery);
    // dispatch(getEmployeeAsync());
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
          Created new department!
        </Alert>
      </Snackbar>

      <DialogAddDepartment
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
            <Typography variant="h6" sx={{ px: 1 }}>
              Import
            </Typography>
          </Button>
        </Grid>

        <Grid item xs={12} sm={3} md={2} paddingTop={{ xs: 1, md: 0 }}>
          <Button variant="outlined">
            <FileUploadOutlinedIcon fontSize="medium" />
            <Typography variant="h6" sx={{ px: 1 }}>
              Export
            </Typography>
          </Button>
        </Grid>

        <Grid item xs={12} sm={6} md={3} paddingTop={{ xs: 2, md: 0 }}>
          <Button variant="contained" onClick={() => handleDialogOpen()}>
            <Typography variant="h6" sx={{ px: 1 }}>
              Add Department
            </Typography>
          </Button>
        </Grid>
      </Grid>

      {/* Search box */}

      <Paper elevation={1} sx={{ my: 3, p: 3 }}>
        <MySearchBox
          placeholder="Search for department..."
          handleSearchQueryChange={handleSearchQueryChange}
        />
      </Paper>
      <div>
        <DepartmentTable />
      </div>
    </>
  );
}
