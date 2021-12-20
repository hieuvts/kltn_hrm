import React from "react";

import { useState } from "react";
import Dashboard from "../pages/Dashboard";
import Department from "../pages/Department";
import Employee from "../pages/Employee";
import Others from "../pages/Others";
import AboutUs from "../pages/AboutUs";
import NotFound from "../pages/404NotFound";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Link } from "react-router-dom";

import {
  Toolbar,
  IconButton,
  Typography,
  Button,
  InputBase,
} from "@mui/material";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import DashboardIcon from "@mui/icons-material/Dashboard";
import Apartment from "@mui/icons-material/Apartment";
import Engineering from "@mui/icons-material/Engineering";
import Mode from "@mui/icons-material/Mode";
import Error from "@mui/icons-material/Error";
import SearchIcon from "@mui/icons-material/Search";
import { VscProject } from "react-icons/vsc";
import { FcAssistant } from "react-icons/fc";
import CapitalizeFirstLetter from "../utilities/captitalizeFirstLetter";

import { styled, alpha, useTheme } from "@mui/material/styles";

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
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
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
// Mini variant drawer
const drawerWidth = 240;
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const MyDrawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const pageList = [
  {
    title: "Dashboard",
    key: "dashboard",
    path: "/dashboard",
    icon: <DashboardIcon />,
    className: "nav-text",
  },
  {
    title: "Employee",
    key: "employee",
    path: "/employee",
    icon: <Engineering />,
    className: "nav-text",
  },
  {
    title: "Department",
    path: "/department",
    key: "department",
    icon: <Apartment />,
    className: "nav-text",
  },
  {
    title: "Project",
    path: "/project",
    key: "project",
    icon: <VscProject />,
    className: "nav-text",
  },
  {
    title: "Others",
    path: "/others",
    key: "others",
    icon: <Mode />,
    className: "nav-text",
  },
  {
    title: "404",
    path: "/404",
    key: "404",
    icon: <Error />,
    className: "nav-text",
  },
];

export default function AppBarComponent() {
  const theme = useTheme();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedTabTitle, setSelectedTabTitle] = useState("Dashboard");

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };
  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };
  const handleChangeTabTitle = (title) => {
    setSelectedTabTitle(title);
  };

  const pathnames = location.pathname.split("/").filter((x) => x);
  const currentPathname = pathnames.slice(-1)[0];
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={isDrawerOpen}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: "36px",
              ...(isDrawerOpen && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }} component="div">
            {CapitalizeFirstLetter(currentPathname)}
          </Typography>

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Button variant="contained">LOGIN</Button>
        </Toolbar>
      </AppBar>
      <MyDrawer variant="permanent" open={isDrawerOpen}>
        <DrawerHeader
          sx={{
            backgroundColor: "#1976d2",
            color: "white",
            alignContent: "center",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <FcAssistant size="60" />
            <Typography
              variant="h4"
              sx={{
                ml: 2,
              }}
            >
              HRM
            </Typography>
          </Box>

          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        {isDrawerOpen && <Divider />}
        <div
          style={{ height: "100%", backgroundColor: "#1976d2", color: "white" }}
        >
          <List>
            {pageList.map((page, index) => (
              <div key = {page.key}>
                <Link
                  style={{ textDecoration: "none", color: "white" }}
                  to={page.path}
                >
                  <ListItem
                    button
                    key={index}
                    sx={{
                      ":hover": {
                        backgroundColor: "#3b8edf",
                      },
                    }}
                    onClick={() => handleChangeTabTitle(page.title)}
                  >
                    <ListItemIcon
                      sx={{
                        color: "white",
                      }}
                    >
                      {page.icon}
                    </ListItemIcon>
                    <ListItemText primary={page.title} />
                  </ListItem>
                </Link>
                <Divider
                  variant="inset"
                  component="li"
                  sx={{ background: "white" }}
                />
              </div>
            ))}
          </List>
        </div>
      </MyDrawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />

        <Routes>
          <Route path="" element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="department" element={<Department />} />
          <Route path="employee" element={<Employee />} />
          <Route path="others" element={<WorkPlace />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="*" element={<Navigate to="404" />} />
        </Routes>
      </Box>
    </Box>
  );
}
