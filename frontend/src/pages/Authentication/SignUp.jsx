import React, { useState, useEffect } from "react";
import { Grid, Box, TextField, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { PropTypes } from "prop-types";
import Link from "@mui/material/Link";
import { useFormik } from "formik";
import { accountSignUpValidationSchema } from "../../utilities/validationSchema";

import SnackbarInfo from "../../components/Snackbar/SnackbarInfo";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../../stores/authSlice";
import { clearMessage } from "../../stores/messageSlice";

const initialValues = {
  email: "",
  password: "",
  verifyPassword: "",
};

export default function SignUp({ handleChange }) {
  const [isRegSuccessful, setRegSuccessful] = useState(false);
  const [isSbInfoOpen, setSbInfoOpen] = useState(false);
  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.message);
  // const [isChecked, setChecked] = useState(false);

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const handleSbInfoClose = () => {
    setSbInfoOpen(false);
  };
  const navigate = useNavigate();
  const handleRegister = (values) => {
    const { email, password } = values;
    setRegSuccessful(false);
    dispatch(signUp({ email, password }))
      .unwrap()
      .then(() => {
        setRegSuccessful(true);
        setSbInfoOpen(true);
      })
      .catch(() => {
        setRegSuccessful(false);
        setSbInfoOpen(true);
      });
  };
  const FormikWithMUI = () => {
    const formik = useFormik({
      initialValues: initialValues,
      validationSchema: accountSignUpValidationSchema,
      onSubmit: (values) => handleRegister(values),
    });
    return (
      <form onSubmit={formik.handleSubmit}>
        <Grid container>
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
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

          <TextField
            fullWidth
            id="verifyPassword"
            name="verifyPassword"
            label="Verify password"
            type="password"
            value={formik.values.verifyPassword}
            onChange={formik.handleChange}
            error={
              formik.touched.verifyPassword &&
              Boolean(formik.errors.verifyPassword)
            }
            helperText={
              formik.touched.verifyPassword && formik.errors.verifyPassword
            }
            sx={{ mb: 3 }}
          />
        </Grid>
        {/* <FormControlLabel
          control={
            <Checkbox
              checked={isChecked}
              onChange={() => setChecked(!isChecked)}
              inputProps={{ "aria-label": "controlled" }}
            />
          }
          label="Agree with terms of services and policy"
        /> */}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          type="submit"
          sx={{ mt: 3 }}
        >
          Signup
        </Button>
      </form>
    );
  };
  return (
    <Box sx={{ marginX: { xs: 10, lg: 50 }, marginTop: { xs: 5, lg: 20 } }}>
      {message && (
        <SnackbarInfo
          isOpen={isSbInfoOpen}
          handleClose={handleSbInfoClose}
          text={message}
        />
      )}
      <Box sx={{ textAlign: "center" }}>
        <Box sx={{ mt: 3, mb: 5 }}>
          <LockOutlinedIcon />
          <Typography variant="h4"> Sign up</Typography>
        </Box>
      </Box>

      <FormikWithMUI />
      <Box sx={{ textAlign: "right", mt: 3 }}>
        <Button onClick={() => navigate("/login")}>
          Already have an account? Login
        </Button>
      </Box>
    </Box>
  );
}

SignUp.propTypes = {
  handleChange: PropTypes.func,
};
