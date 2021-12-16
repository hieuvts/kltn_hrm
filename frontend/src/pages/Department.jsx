import React from "react";

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
import EnhancedTable from "../components/DepartmentList";

export default function Department() {
  const pathnames = location.pathname.split("/").filter((x) => x);
  return (
    <>
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
          <Button variant="contained">
            <Typography variant="h6" sx={{ px: 1 }}>
              Add Department
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
