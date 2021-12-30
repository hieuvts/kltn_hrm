import React, { useState } from "react";
import { Box, TextField, Typography, Button, Paper } from "@mui/material";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import MuiAlert from "@mui/material/Alert";
import { useFormik } from "formik";
import { accountLoginValidationSchema } from "../../utilities/validationSchema";
import DialogForgotPassword from "./DialogForgotPassword";
import { PropTypes } from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../stores/authSlice";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const initialValues = {
  email: "",
  password: "",
};

export default function Login({ handleChange }) {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const user = useSelector((state) => state.auth.identification);
  const dispatch = useDispatch();
  const handleCloseDialog = () => {
    setDialogOpen(false);
  };
  const handleLogin = (email, password) => {
    dispatch(login({ email, password }));
  };
  const FormikWithMUI = () => {
    const formik = useFormik({
      initialValues: initialValues,
      validationSchema: accountLoginValidationSchema,
      onSubmit: (values) => {
        handleLogin(values.email, values.password);
        handleSnackbarOpen();
        handleCloseDialog();
      },
    });
    return (
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          sx={{ mb: 3 }}
        />
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          sx={{ mb: 3 }}
        />
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <FormControlLabel control={<Checkbox />} label="Remember password" />
          <Button
            variant="link"
            onClick={() => setDialogOpen(true)}
            sx={{ textTransform: "none", color: "#194591", fontSize: "medium" }}
          >
            Forgot password?
          </Button>
        </Box>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          type="submit"
          sx={{ mt: 3 }}
        >
          Login
        </Button>
      </form>
    );
  };
  return (
    <>
      <DialogForgotPassword
        isDialogOpen={isDialogOpen}
        handleCloseDialog={handleCloseDialog}
      />
      <Box sx={{ textAlign: "center" }}>
        <Box sx={{ mt: 3, mb: 5 }}>
          <LockOutlinedIcon />
          <Typography variant="h4">Login</Typography>
        </Box>
      </Box>
      <FormikWithMUI />
      <Box sx={{ textAlign: "right", mt: 3 }}>
        <Button onClick={(e) => handleChange(e, 1)}>
          Don&#39;t have an account? Sign up!
        </Button>
      </Box>
      <Typography>Test account: {user.accessToken} </Typography>;
    </>
  );
}

Login.propTypes = {
  handleChange: PropTypes.func,
};
