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
import { Provider, useDispatch } from "react-redux";
import store from "../stores/store";
import { getEmployeeInfo, getEmployeeAsync } from "../stores/employeeSlice";

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
        onClick={() =>
          dispatch(
            getEmployeeInfo({
              name: `new name ${Math.floor(Math.random() * 10)}`,
              data: "new data",
            })
          )
        }
      >
        Test dispatch redux m
      </Button>
      <Button variant="outlined" onClick={() => dispatch(getEmployeeAsync())}>
        Test dispatch ASYNC THUNK
      </Button>
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

      {/* <Typography variant="h4">Employee</Typography> */}
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
          <Button variant="contained">
            <Typography variant="h6" sx={{ px: 1 }}>
              Add Employee
            </Typography>
          </Button>
        </Grid>
      </Grid>

      {/* Search box */}

      <Paper elevation={1} sx={{ mt: 3, p: 3 }}>
        <MySearchBox placeholder="Search for customer..." />
      </Paper>
      <div>
        <EnhancedTable />
      </div>
    </>
  );
}
