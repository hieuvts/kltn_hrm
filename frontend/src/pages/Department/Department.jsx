import React, { useState, useEffect, useCallback } from "react";

import { useDispatch } from "react-redux";
import { getDepartmentASync } from "../../stores/departmentSlice";

import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MuiAlert from "@mui/material/Alert";
import { Typography, Button, InputBase } from "@mui/material";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import DepartmentTable from "../../components/Department/DepartmentList";
import DialogAddDepartment from "../../components/Department/DialogAddDepartment";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import SearchIcon from "@mui/icons-material/Search";
import debounce from "lodash.debounce";
import CapitalizeFirstLetter from "../../utilities/captitalizeFirstLetter";
import MySearchBox from "../../components/StyledSearchBox";
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
      dispatch(getDepartmentASync({ searchQuery: searchQuery }));
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
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          Home
        </Link>

        {pathnames.map((path, idx) => (
          <Link
            underline="hover"
            color="text.primary"
            href={path}
            aria-current="page"
            key={idx}
          >
            {CapitalizeFirstLetter(path)}
          </Link>
        ))}
      </Breadcrumbs>

      {/* <Typography variant="h4">Department</Typography> */}
      <Grid container justifyContent="flex-end" textAlign="right">
        <Grid item xs={12} md={3}>
          <Button variant="link">
            <FileUploadOutlinedIcon fontSize="medium" />
            <Typography variant="h6" sx={{ px: 1 }}>
              Import
            </Typography>
          </Button>
        </Grid>
        <Grid item xs={12} md={3}>
          <Button variant="link">
            <FileDownloadOutlinedIcon fontSize="medium" />
            <Typography variant="h6" sx={{ px: 1 }}>
              Export
            </Typography>
          </Button>
        </Grid>
        <Grid item xs={12} md={3}>
          <Button variant="contained" onClick={() => handleDialogOpen()}>
            <Typography variant="h6" sx={{ px: 1 }}>
              Add Department
            </Typography>
          </Button>
        </Grid>
      </Grid>

      {/* Search box */}

      <Paper elevation={1} sx={{ mt: 3, p: 3 }}>
        <MySearchBox placeholder="Search for Department"
        handleSearchQueryChange={handleSearchQueryChange} />
      </Paper>
      <div>
        <DepartmentTable />
      </div>
    </>
  );
}
