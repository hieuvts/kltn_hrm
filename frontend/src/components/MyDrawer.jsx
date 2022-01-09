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
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Toolbar,
  IconButton,
  Typography,
  Button,
  Grid,
  ListItemButton,
} from "@mui/material";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";

import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import AccountCircle from "@mui/icons-material/AccountCircle";

import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { styled, alpha, useTheme } from "@mui/material/styles";
import { FcAssistant } from "react-icons/fc";
import { logout } from "../stores/authSlice";
import StyledSearchBox from "../components/CustomizedMUIComponents/StyledSearchBox";
import CurrentClock from "../components/CustomizedMUIComponents/CurrentClock";
import NotificationBadget from "../components/CustomizedMUIComponents/NotificationsBadget";
import { pageList } from "../utilities/appPageList";
// Mini variant drawer
import {
  AppBar,
  MyDrawer,
  DrawerHeader,
} from "./CustomizedMUIComponents/MyDrawer";
export default function AppBarComponent() {
  const location = useLocation();
  const theme = useTheme();
  const { user: currentUser } = useSelector((state) => state.auth);
  const pathnames = location.pathname.split("/").filter((x) => x);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

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
          <div>
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
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              minWidth: "100%",
              flexDirection: "center",
              justifyContent: "center",
            }}
          >
            <Grid container sx={{ alignItems: "center" }}>
              <Grid item xs={4}></Grid>
              <Grid item xs={4}>
                <CurrentClock />
              </Grid>
              <Grid item xs={4}>
                {currentUser && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-end",
                      marginRight: "2rem",
                    }}
                  >
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
                    <NotificationBadget notificationCount={3} />
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
              </Grid>
            </Grid>
          </div>
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
                    selected={
                      location.pathname.split("/").slice(-1)[0] === page.key
                    }
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
          <Route path="" element={<Navigate to="dashboard" />} />
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
