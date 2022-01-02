import React, { useState, useEffect, useCallback } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

import { Typography, Button } from "@mui/material";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";

import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import MuiAlert from "@mui/material/Alert";
import { Snackbar } from "@mui/material";
import CapitalizeFirstLetter from "../../utilities/captitalizeFirstLetter";
import MySearchBox from "../../components/StyledSearchBox";
import EmployeeTable from "../../components/Employee/EmployeeList";
import DialogAddEmployee from "../../components/Employee/DialogAddEmployee";

import debounce from "lodash.debounce";
//Redux
import { useDispatch } from "react-redux";
import { getEmployeeAsync } from "../../stores/employeeSlice";
import { getDepartmentAsync } from "../../stores/departmentSlice";
import DialogExportToExcel from "../../components/Employee/DialogExportToExcel";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Employee() {
  const dispatch = useDispatch();
  const pathnames = location.pathname.split("/").filter((x) => x);

  // Add Employee Dialog
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isDialogExportEmployeeOpen, setDialogExportEmployeeOpen] =
    useState(false);
  // Working with Snackbar
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);
  // Working with search func
  const [searchQuery, setSearchQuery] = useState("");
  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const setDialogExportEmployeeClose = () => {
    setDialogExportEmployeeOpen(false);
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
      dispatch(getEmployeeAsync({ searchQuery: searchQuery }));
    }, 350),
    []
  );
  useEffect(() => {
    debounceFetchAPI(searchQuery);
    dispatch(getDepartmentAsync());
  }, [handleSearchQueryChange]);

  return (
    <>
      <DialogExportToExcel
        isDialogOpen={isDialogExportEmployeeOpen}
        handleCloseDialog={setDialogExportEmployeeClose}
      />
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
          Created new employee!
        </Alert>
      </Snackbar>

      <DialogAddEmployee
        isDialogOpen={isDialogOpen}
        setDialogOpen={setDialogOpen}
        handleCloseDialog={handleDialogClose}
        handleSnackbarOpen={handleSnackbarOpen}
      />
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          Home
        </Link>

        {pathnames.map((pathName, idx) => (
          <Link
            underline="hover"
            color="text.primary"
            href={pathName}
            aria-current="page"
            key={idx}
          >
            {CapitalizeFirstLetter(pathName)}
          </Link>
        ))}
      </Breadcrumbs>
      <Grid
        container
        justifyContent="flex-end"
        textAlign={{ sm: "right", md: "center" }}
        padding={{ sm: 5, md: 0 }}
        sx={{ alignItems: "center" }}
      >
        <Grid item paddingTop={{ xs: 2, sm: 0 }} xs={12} sm={3} md={2}>
          <Button variant="link">
            <FileDownloadOutlinedIcon fontSize="medium" />
            <Typography variant="h6" sx={{ pl: 1 }}>
              Import
            </Typography>
          </Button>
        </Grid>
        <Grid item xs={12} sm={3} md={2}>
          <Button
            variant="link"
            onClick={() => setDialogExportEmployeeOpen(true)}
          >
            <FileUploadOutlinedIcon fontSize="medium" />
            <Typography variant="h6" sx={{ pl: 1 }}>
              Export
            </Typography>
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={2} paddingTop={{ xs: 2, sm: 0, md: 0 }}>
          <Button variant="contained" onClick={() => handleDialogOpen()}>
            <Typography variant="h6">Add Employee</Typography>
          </Button>
        </Grid>
      </Grid>

      <Paper elevation={1} sx={{ my: 3, p: 3 }}>
        <MySearchBox
          placeholder="Search for customer by name, email, phone number..."
          handleSearchQueryChange={handleSearchQueryChange}
        />
      </Paper>

      <div>
        {/* {employeeList.length >= 1 ? (
          <EmployeeTable />
        ) : (
          <Typography>Employee list is empty</Typography>
        )} */}
        <EmployeeTable />
      </div>
    </>
  );
}
