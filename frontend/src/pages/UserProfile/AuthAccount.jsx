import React, { useState, useEffect, useCallback } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

import { Typography, Button } from "@mui/material";
import MyBreadcrumbs from "../../components/CustomizedMUIComponents/MyBreadcrumbs";

import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";

import { Snackbar } from "@mui/material";
import MySearchBox from "../../components/CustomizedMUIComponents/StyledSearchBox";
import AuthAccountTable from "../../components/UserProfile/AuthAccountList";
import DialogAddAuthAccount from "../../components/UserProfile/DialogAddAuthAccount";

import debounce from "lodash.debounce";
//Redux
import { useDispatch } from "react-redux";
import { getAllAccount } from "../../stores/authSlice";


export default function AuthAccount() {
  const dispatch = useDispatch();
  const pathnames = location.pathname.split("/").filter((x) => x);

  // Add AuthAccount Dialog
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isDialogExportAuthAccountOpen, setDialogExportAuthAccountOpen] =
    useState(false);
  // Working with Snackbar
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);
  // Working with search func
  const [searchQuery, setSearchQuery] = useState("");
  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const setDialogExportAuthAccountClose = () => {
    setDialogExportAuthAccountOpen(false);
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
      dispatch(getAllAccount({ searchQuery: searchQuery }));
    }, 350),
    []
  );
  useEffect(() => {
    debounceFetchAPI(searchQuery);
  }, [searchQuery]);

  return (
    <>

      <DialogAddAuthAccount
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
        <Grid item xs={12} sm={3} md={2} paddingTop={{ xs: 2, sm: 0 }}>
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
            onClick={() => setDialogExportAuthAccountOpen(true)}
          >
            <FileUploadOutlinedIcon fontSize="medium" />
            <Typography variant="h6" sx={{ pl: 1 }}>
              Export
            </Typography>
          </Button>
        </Grid>

        <Grid item xs={12} sm={6} md={3} paddingTop={{ xs: 2, sm: 0, md: 0 }}>
          <Button variant="contained" onClick={() => handleDialogOpen()}>
            <Typography variant="h6">Add AuthAccount</Typography>
          </Button>
        </Grid>
      </Grid>

      <Paper elevation={1} sx={{ my: 3, p: 3 }}>
        <MySearchBox
          placeholder="Search for AuthAccount..."
          handleSearchQueryChange={handleSearchQueryChange}
        />
      </Paper>

      <div>
        {/* {AuthAccountList.length >= 1 ? (
          <AuthAccountTable />
        ) : (
          <Typography>AuthAccount list is empty</Typography>
        )} */}
        <AuthAccountTable />
      </div>
    </>
  );
}
