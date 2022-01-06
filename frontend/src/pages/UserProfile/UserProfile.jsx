// Testing authorization services
import React, { useState } from "react";
import {
  Typography,
  Button,
  Box,
  Breadcrumbs,
  Link,
  Grid,
  Divider,
  Paper,
} from "@mui/material";
import { rowDirection, colDirection } from "../../utilities/flexBoxStyle";
import CapitalizeFirstLetter from "../../utilities/captitalizeFirstLetter";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import DialogDeleteUserProfile from "../../components/UserProfile/DialogDeleteUserProfile";
import DialogUpdateUserProfile from "../../components/UserProfile/DialogUpdateUserProfile";

export default function UserProfile() {
  // const user = useSelector((state) => state.auth);
  // const currentUser = user.currentUser;
  const [isDialogDelUserProfileOpen, setDialogDelUserProfileOpen] =
    useState(false);
  const [isDialogUpdateUserProfileOpen, setDialogUpdateUserProfileOpen] =
    useState(false);
  const handleDialogDelUserProfileClose = () => {
    setDialogDelUserProfileOpen(false);
  };
  const handleDialogUpdateUserProfileClose = () => {
    setDialogUpdateUserProfileOpen(false);
  };
  const user = useSelector((state) => state.auth.user);

  const pathnames = location.pathname.split("/").filter((x) => x);
  return (
    <>
      <DialogDeleteUserProfile
        isDialogOpen={isDialogDelUserProfileOpen}
        handleCloseDialog={handleDialogDelUserProfileClose}
      />
      <DialogUpdateUserProfile
        isDialogOpen={isDialogUpdateUserProfileOpen}
        handleCloseDialog={handleDialogUpdateUserProfileClose}
      />
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
        justifyContent="space-between"
        textAlign="center"
        padding={{ sm: 5, md: 0 }}
        rowSpacing={3}
        columnSpacing={3}
        sx={{ alignItems: "center", mt: 3 }}
      >
        <Grid item sm={12} md={6} sx={{ alignSelf: "start" }}>
          <Box sx={colDirection}>
            <Paper elevation={2} sx={{ m: 1, p: 3 }}>
              <Box sx={rowDirection}>
                <Typography>Email:</Typography>
                <Typography>{user.email}</Typography>
              </Box>
              <Box sx={rowDirection}>
                <Typography>Roles:</Typography>
                {user.roles.map((role, index) => (
                  <Typography key={index}>{role.name}</Typography>
                ))}
              </Box>
            </Paper>
            <Paper elevation={2} sx={{ m: 1, p: 3 }}>
              <Box>
                <Typography variant="h6" sx={{ textAlign: "left" }}>
                  Employee profile
                </Typography>
              </Box>
              <Divider sx={{ my: 1 }} />
              <Box sx={rowDirection}>
                <Typography>Full name: </Typography>
                <Typography>
                  {user.employee.fname} {user.employee.lname}
                </Typography>
              </Box>
              <Box sx={rowDirection}>
                <Typography>Gender: </Typography>
                <Typography>{user.employee.gender}</Typography>
              </Box>
              <Box sx={rowDirection}>
                <Typography>Departments: </Typography>
                <Typography>{user.employee.departments}</Typography>
              </Box>
              <Box sx={rowDirection}>
                <Typography>Project: </Typography>
                <Typography>{user.employee.project}</Typography>
              </Box>
            </Paper>
          </Box>
        </Grid>

        <Grid item sm={12} md={6} sx={{ alignSelf: "start" }}>
          <Box sx={colDirection}>
            {/* <Box sx={rowDirection}>
              <Typography>Roles:</Typography>
              {user.roles.map((role, index) => (
                <Typography key={index}>{role}</Typography>
              ))}
            </Box> */}
          </Box>
        </Grid>
      </Grid>
      <Box sx={{ width: "100%", textAlign: "right", mt: 5 }}>
        <Button
          variant="contained"
          onClick={() => setDialogUpdateUserProfileOpen(true)}
          sx={{ mx: 3 }}
        >
          Update
        </Button>
        <Button
          color="warning"
          variant="outlined"
          onClick={() => setDialogDelUserProfileOpen(true)}
        >
          Delete
        </Button>
      </Box>
    </>
  );
}
