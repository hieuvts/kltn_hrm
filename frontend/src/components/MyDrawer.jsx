import React, { useState, useEffect, useCallback } from "react";
import Dashboard from "../pages/Dashboard/Dashboard";
import Department from "../pages/Department/Department";
import Employee from "../pages/Employee/Employee";
import Others from "../pages/Others";
import AboutUs from "../pages/AboutUs/AboutUs";
import WorkPlace from "../pages/Workplace/Workplace";
import NotFound from "../pages/404NotFound/404NotFound";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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

import { FcAssistant } from "react-icons/fc";
import CapitalizeFirstLetter from "../utilities/captitalizeFirstLetter";
import { styled, alpha, useTheme } from "@mui/material/styles";
import { logout } from "../stores/authSlice";
import StyledSearchBox from "./StyledSearchBox";
import clockTimer from "../utilities/clockTimer";
import { pageList } from "../utilities/appPageList";
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

export default function AppBarComponent() {
  const theme = useTheme();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedTabTitle, setSelectedTabTitle] = useState("Dashboard");
  const { user: currentUser } = useSelector((state) => state.auth);

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

  const dispatch = useDispatch();

  // const logOut = useCallback(() => {
  //   dispatch(logout());
  // }, [dispatch]);
  // useEffect(() => {
  //   if (currentUser) {
  //     console.log("MyDrawer.jsx ", currentUser);
  //   } else {
  //     console.log("MyDrawer.jsx not authorized");
  //   }
  // }, [currentUser, logOut]);
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
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
              ...(isDrawerOpen && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <StyledSearchBox placeholder="Search…" />
            <Typography sx={{ alignSelf: "center" }}>
              {currentUser.email}
            </Typography>
            <Button variant="contained">
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "white" }}
                onClick={() => dispatch(logout())}
              >
                LOGOUT
              </Link>
            </Button>
          </Box>
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
              <div key={index}>
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
          <Route path="workplace" element={<WorkPlace />} />
          <Route path="others" element={<Others />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="*" element={<Navigate to="404" />} />
        </Routes>
      </Box>
    </Box>
  );
}
