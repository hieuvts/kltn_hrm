import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

import { Typography, Button } from "@mui/material";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";

import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import SearchIcon from "@mui/icons-material/Search";
import MuiAlert from "@mui/material/Alert";
import { Snackbar } from "@mui/material";
import CapitalizeFirstLetter from "../../utilities/captitalizeFirstLetter";
import MySearchBox from "../../components/StyledSearchBox";
import EmployeeTable from "../../components/Employee/EmployeeList";
import DialogAddEmployee from "../../components/Employee/DialogAddEmployee";

//Redux
import { useDispatch } from "react-redux";
import { getEmployeeAsync } from "../../stores/employeeSlice";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Employee() {
  const dispatch = useDispatch();
  const pathnames = location.pathname.split("/").filter((x) => x);

  // Working with Dialog
  const [isDialogOpen, setDialogOpen] = useState(false);
  // Working with Snackbar
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);

  const handleDialogOpen = () => {
    setDialogOpen(true);
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
  useEffect(() => {
    dispatch(getEmployeeAsync());
  },[]);

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
          Created new employee!
        </Alert>
      </Snackbar>

      <DialogAddEmployee
        isDialogOpen={isDialogOpen}
        setDialogOpen={setDialogOpen}
        handleCloseDialog={handleDialogClose}
        handleSnackbarOpen={handleSnackbarOpen}
      />
      {/* <Button
        variant="outlined"
        sx={{ mb: 5 }}
        onClick={() => dispatch(getEmployeeAsync())}
      >
        fetch Employee List from server
      </Button> */}
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
      >
        <Grid item xs={4} md={2}>
          <Button variant="link">
            <FileUploadOutlinedIcon fontSize="medium" />
            <Typography variant="h6">Import</Typography>
          </Button>
        </Grid>
        <Grid item xs={4} md={2}>
          <Button variant="link">
            <FileDownloadOutlinedIcon fontSize="medium" />
            <Typography variant="h6">Export</Typography>
          </Button>
        </Grid>
        <Grid item xs={12} md={2} paddingTop={{ sm: 2, md: 0 }}>
          <Button variant="contained" onClick={() => handleDialogOpen()}>
            <Typography variant="h6">Add Employee</Typography>
          </Button>
        </Grid>
      </Grid>
      {/* Search box */}
      <Paper elevation={1} sx={{ my: 3, p: 3 }}>
        <MySearchBox placeholder="Search for customer..." />
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
