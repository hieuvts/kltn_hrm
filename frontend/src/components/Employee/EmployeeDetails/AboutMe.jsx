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
export default function AboutMe() {
  const employee = useSelector(
    (state) => state.employee.currentSelectedEmployee
  );
  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Box sx={rowDirection}>
        <Typography variant="h5">About me</Typography>
      </Box>
      <Divider />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          py: 1,
        }}
      >
        <Avatar alt="Remy Sharp" src={maleAvatar} />
        <Box sx={colDirection}>
          <p>
            Share interesting life stories or tell other users about yourself,
            upload photos of memorable moments.
          </p>
          <Button variant="outlined" sx={{ borderRadius: 8 }}>
            Write about yourself
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
