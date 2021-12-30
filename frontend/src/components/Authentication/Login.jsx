import React, { useState, useEffect } from "react";
import { Box, TextField, Typography, Button, Paper } from "@mui/material";
import { Navigate } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CircularProgress from "@mui/material/CircularProgress";
import LinearProgress from "@mui/material/LinearProgress";
import { useFormik } from "formik";
import { accountLoginValidationSchema } from "../../utilities/validationSchema";
import DialogForgotPassword from "./DialogForgotPassword";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../stores/authSlice";
import { clearMessage } from "../../stores/messageSlice";
import SnackbarFailed from "../Snackbar/SnackbarFailed";

export default function Login({ handleChange, history }) {
  const [isDialogForgotPwdOpen, setDialogForgotPwdOpen] = useState(false);
  const [isSbFailedOpen, setSbFailedOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const handleCloseDialogForgotPwd = () => {
    setDialogForgotPwdOpen(false);
  };
  const handleSbFailedClose = () => {
    setSbFailedOpen(false);
  };

  const handleLogin = (values) => {
    const { email, password } = values;
    setLoading(true);

    dispatch(login({ email, password }))
      .unwrap()
      .then(() => {
        history.push("/");
        window.location.reload();
      })
      .catch(() => {
        setLoading(false);
        setSbFailedOpen(true);
      });
  };

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }
  const initialValues = {
    email: "",
    password: "",
  };
  const FormikWithMUI = () => {
    const formik = useFormik({
      initialValues: initialValues,
      validationSchema: accountLoginValidationSchema,
      onSubmit: (values) => handleLogin(values),
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
          disabled={isLoading}
          sx={{ mt: 3 }}
        >
          Login
          {isLoading && <CircularProgress />}
        </Button>
      </form>
    );
  };
  return (
    <>
      {message && (
        <SnackbarFailed
          isOpen={isSbFailedOpen}
          handleClose={handleSbFailedClose}
          text={message}
        />
      )}
      <DialogForgotPassword
        isDialogOpen={isDialogForgotPwdOpen}
        handleCloseDialog={handleCloseDialogForgotPwd}
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
    </>
  );
}

Login.propTypes = {
  handleChange: PropTypes.func,
  history: PropTypes.array,
};
