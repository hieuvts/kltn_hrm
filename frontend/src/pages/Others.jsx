// Testing authorization services
import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Others() {
  // const user = useSelector((state) => state.auth);
  // const currentUser = user.currentUser;
  const { user: currentUser } = useSelector((state) => state.auth);

  if (!currentUser.email) {
    console.log("!currentUser", currentUser);
    return <Navigate to="/login" />;
  } else {
    console.log("currentUser", currentUser);
  }

  return (
    <>
      <Box>
        <Typography variant="h4">{currentUser.email}</Typography>
        <Typography variant="subtitle1">
          Token: {currentUser.accessToken.toString()}
        </Typography>
        <Typography variant="subtitle1">id: {currentUser.id}</Typography>
        <Typography variant="subtitle1">Email: {currentUser.email}</Typography>
        Authorizations:{" "}
        {currentUser.roles &&
          currentUser.roles.map((role, index) => (
            <Typography variant="subtitle2" key={index}>
              Role {index} {role}
            </Typography>
          ))}
      </Box>
    </>
  );
}
