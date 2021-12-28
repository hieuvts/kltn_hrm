import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";

import maleAvatar from "../../../assets/icons/avatarMale.png";

const rowDirection = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  py: 1,
};
const colDirection = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  pl: 5,
  py: 1,
};
export default function EmployeeAvatar() {
  const employee = useSelector(
    (state) => state.employee.currentSelectedEmployee
  );
  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ mb: 3 }}>
        Role: Admin
      </Typography>
      <Box sx={{ width: "100%", textAlign: "center" }}>
        <img
          src={`https://images.unsplash.com/photo-1541560052-5e137f229371?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80`}
          width="200px"
          height="200px"
        ></img>
      </Box>
    </Paper>
  );
}
