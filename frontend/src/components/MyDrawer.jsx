import React, { useState, useEffect, useCallback } from "react";
import Dashboard from "../pages/Dashboard/Dashboard";
import Department from "../pages/Department/Department";
import Employee from "../pages/Employee/Employee";
import Others from "../pages/Others";
import AboutUs from "../pages/AboutUs/AboutUs";
import WorkPlace from "../pages/Task/Task";
import Company from "../pages/Company/Company";
import InternalChat from "../pages/Chat/InternalChat";
import UserProfile from "../pages/UserProfile/UserProfile";
import Project from "../pages/Project/Project";
import Task from "../pages/Task/Task";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Toolbar,
  IconButton,
  Typography,
  Button,
  ListItemButton,
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
import AccountCircle from "@mui/icons-material/AccountCircle";

import Grid from "@mui/material/Grid";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

import { FcAssistant } from "react-icons/fc";
import CapitalizeFirstLetter from "../utilities/captitalizeFirstLetter";
import { styled, alpha, useTheme } from "@mui/material/styles";
import { logout } from "../stores/authSlice";
import StyledSearchBox from "./StyledSearchBox";
import CurrentClock from "./CurrentClock";
import NotificationBadget from "./NotificationsBadget";
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
  const { user: currentUser } = useSelector((state) => state.auth);
  const selectedTabFromLocalStr = localStorage.getItem("selectedTab");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedTab, setSelectedTab] = useState(selectedTabFromLocalStr);
  const pathnames = location.pathname.split("/").filter((x) => x);

  const dispatch = useDispatch();
  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };
  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };
  // Profile menu
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSelectedTab = (key) => {
    console.log("page141 ", key);
    setSelectedTab(key);
    localStorage.setItem("selectedTab", key);
  };
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <AppBar open={isDrawerOpen}>
        <Toolbar
          variant="regular"
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              ...(isDrawerOpen && { display: "none" }),
            }}
          >
            <MenuIcon fontSize="large" sx={{ color: "#fff" }} />
          </IconButton>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <CurrentClock />
            <StyledSearchBox placeholder="Search…" />

            {currentUser && (
              <div>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Button
                  variant="contained"
                  sx={{ borderRadius: 3 }}
                  onClick={handleMenu}
                >
                  <Typography sx={{ alignSelf: "center", color: "white" }}>
                    {currentUser.email}
                  </Typography>
                </Button>

                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <Link
                    to="/profile"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <MenuItem
                      onClick={() => {
                        handleClose();
                      }}
                    >
                      Profile
                    </MenuItem>
                  </Link>
                  <Link
                    to="/setting"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <MenuItem
                      onClick={() => {
                        handleClose();
                      }}
                    >
                      Company settings
                    </MenuItem>
                  </Link>
                  <Link
                    to="/login"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <MenuItem
                      onClick={() => {
                        dispatch(logout());
                        handleClose();
                      }}
                    >
                      Logout
                    </MenuItem>
                  </Link>
                </Menu>
              </div>
            )}
            <NotificationBadget notificationCount={3} />
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
            <ChevronLeftIcon fontSize="large" sx={{ color: "#fff" }} />
          </IconButton>
        </DrawerHeader>
        {isDrawerOpen && <Divider />}
        <div
          style={{ height: "100%", backgroundColor: "#1976d2", color: "white" }}
        >
          <List
            sx={{
              // Selected
              "&& .Mui-selected, && .Mui-selected:hover": {
                backgroundColor: "#fff",
                "&, & .css-10hburv-MuiTypography-root": {
                  fontWeight: "800",
                },
                "&, & .MuiListItemIcon-root": {
                  color: "#1976D2",
                },
              },

              // Hover
              "& .MuiListItemButton-root:hover": {
                bgcolor: "#3b8edf",
              },
            }}
          >
            {pageList.map((page, index) => (
              <div key={index}>
                <Link
                  style={{ textDecoration: "none", color: "white" }}
                  to={page.path}
                >
                  <ListItemButton
                    key={index}
                    selected={selectedTab === page.key}
                    onClick={() => handleSelectedTab(page.key)}
                  >
                    <ListItemIcon
                      sx={{
                        color: "white",
                      }}
                    >
                      {page.icon}
                    </ListItemIcon>
                    <ListItemText primary={page.title} />
                  </ListItemButton>
                </Link>
                <Divider component="li" sx={{ background: "white" }} />
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
          <Route path="project" element={<Project />} />
          <Route path="Task" element={<Task />} />
          <Route path="others" element={<Others />} />
          <Route path="setting" element={<Company />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="chat" element={<InternalChat />} />
          <Route path="*" element={<Navigate to="404" />} />
        </Routes>
      </Box>
    </Box>
  );
}
