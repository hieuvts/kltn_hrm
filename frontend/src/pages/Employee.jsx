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

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
  border: "solid",
  borderWidth: "1px",
  borderColor: "grey",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 1),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function Employee() {
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
      <Paper elevation={1} sx={{ mt: 3 }}>
        <Box sx={{ p: 3 }}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              fullWidth
            />
          </Search>
        </Box>
      </Paper>
    </>
  );
}
