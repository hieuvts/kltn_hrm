import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import { emailValidationSchema } from "../../utilities/validationSchema";
import { useFormik } from "formik";

import { Typography } from "@mui/material";

export default function DialogForgotPassword({
  isDialogOpen,
  handleCloseDialog,
}) {
  const FormikWithMUI = () => {
    const formik = useFormik({
      initialValues: {
        email: "",
      },
      validationSchema: emailValidationSchema,
      onSubmit: (values) => {
        alert("Please check your inbox!!!");
      },
    });
    return (
      <form onSubmit={formik.handleSubmit}>
        <TextField
          id="email"
          label="Email"
          placeholder="Enter your email address"
          variant="outlined"
          fullWidth
          value={formik.values.email}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          onChange={formik.handleChange}
          sx={{ my: 3 }}
        />
        <Button variant="contained" color="primary" fullWidth type="submit">
          Send password reset email
        </Button>
      </form>
    );
  };
  return (
    <div>
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h4" sx={{ alignSelf: "center" }}>
              Reset your password
            </Typography>
            <Button onClick={handleCloseDialog}>
              <CloseIcon fontSize="large" />
            </Button>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ mt: 3 }}>
          <Typography variant="subtitle1" sx={{ alignSelf: "center" }}>
            Enter your user account&#39;s verified email address and we will
            send you a password reset link.
          </Typography>
          <FormikWithMUI />
        </DialogContent>
      </Dialog>
    </div>
  );
}

DialogForgotPassword.propTypes = {
  isDialogOpen: PropTypes.bool,
  handleCloseDialog: PropTypes.func,
};
