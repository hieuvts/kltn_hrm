import React, { useState } from "react";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import PropTypes from "prop-types";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export default function SnackbarInfo({ isOpen, text, handleClose }) {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={isOpen}
      autoHideDuration={2500}
      onClose={handleClose}
      key={"top" + "right"}
      sx={{ mt: "5%" }}
    >
      <Alert onClose={handleClose} severity="info" sx={{ width: "100%" }}>
        {text}
      </Alert>
    </Snackbar>
  );
}

SnackbarInfo.propTypes = {
  isOpen: PropTypes.bool,
  text: PropTypes.string,
  handleClose: PropTypes.func,
};
