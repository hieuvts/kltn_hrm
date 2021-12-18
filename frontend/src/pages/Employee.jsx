import React from "react";
import { useEffect } from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

import { Typography, Button, InputBase } from "@mui/material";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { styled, alpha, useTheme } from "@mui/material/styles";

import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import SearchIcon from "@mui/icons-material/Search";

import CapitalizeFirstLetter from "../utilities/captitalizeFirstLetter";
import MySearchBox from "../components/StyledSearchBox";
import EnhancedTable from "../components/CustomerList";

//Redux
import { useDispatch } from "react-redux";
import { getEmployeeAsync } from "../stores/employeeSlice";

export default function Employee() {
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch();
  //   return () => {
  //     cleanup;
  //   };
  // }, [input]);
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <>
      <Button
        variant="outlined"
        sx={{ mb: 5 }}
        onClick={() => dispatch(getEmployeeAsync())}
      >
        fetch Employee List from server
      </Button>
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
          <Button variant="contained">
            <Typography variant="h6">Add Employee</Typography>
          </Button>
        </Grid>
      </Grid>

      {/* Search box */}

      <Paper elevation={1} sx={{ my: 3, p: 3 }}>
        <MySearchBox placeholder="Search for customer..." />
      </Paper>
      <div>
        <EnhancedTable />
      </div>
    </>
  );
}
