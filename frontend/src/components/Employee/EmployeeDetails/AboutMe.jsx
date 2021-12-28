import React, { useState } from "react";
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
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
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

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function AboutMe() {
  const employee = useSelector(
    (state) => state.employee.currentSelectedEmployee
  );
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);
  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={isSnackbarOpen}
        autoHideDuration={2500}
        onClose={() => setSnackbarOpen(false)}
        key={"top" + "right"}
        sx={{ mt: "10%" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          This feature is under developement
        </Alert>
      </Snackbar>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Box sx={rowDirection}>
          <Typography variant="h6">About me</Typography>
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
            <Button
              variant="outlined"
              onClick={() => setSnackbarOpen(true)}
              sx={{ borderRadius: 8 }}
            >
              Write about yourself
            </Button>
          </Box>
        </Box>
      </Paper>
    </div>
  );
}
