import React, { useState } from "react";
import { Grid, Box, TextField, Typography, Button } from "@mui/material";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { PropTypes } from "prop-types";
import Link from "@mui/material/Link";
import { useFormik } from "formik";
import { accountSignUpValidationSchema } from "../../utilities/validationSchema";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const initialValues = {
  email: "",
  password: "",
  verifyPassword: "",
};

export default function SignUp({ handleChange }) {
  const paperStyle = { padding: 20, width: 310, margin: "0 auto" };
  const avatarStyle = { backgroundColor: "#5048E4" };
  const headerStyle = { margin: "8px" };
  const inputStyle = { marginTop: "8px" };

  const [isChecked, setChecked] = useState(false);
  const FormikWithMUI = () => {
    const formik = useFormik({
      initialValues: initialValues,
      validationSchema: accountSignUpValidationSchema,
      onSubmit: (values) => {
        dispatch(addEmployeeAsync(values));
        handleSnackbarOpen();
        handleCloseDialog();
      },
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
        <FormControlLabel
          control={
            <Checkbox
              checked={isChecked}
              onChange={() => setChecked(!isChecked)}
              inputProps={{ "aria-label": "controlled" }}
            />
          }
          label="Agree with terms of services and policy"
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          type="submit"
          sx={{ mt: 3 }}
          disabled={!isChecked}
        >
          Signup
        </Button>
      </form>
    );
  };
  return (
    <Box>
      {/* <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={true}
        autoHideDuration={2500}
        key={"top" + "right"}
        sx={{ mt: "0" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Placeholder
        </Alert>
      </Snackbar> */}
      <Box sx={{ textAlign: "center" }}>
        <Box sx={{ mt: 3, mb: 5 }}>
          <LockOutlinedIcon />
          <Typography variant="h4"> Sign up</Typography>
        </Box>
      </Box>

      <FormikWithMUI />
      <Box sx={{ textAlign: "right", mt: 3 }}>
        <Button onClick={(e) => handleChange(e, 0)}>
          Already have an account? Login
        </Button>
      </Box>
    </Box>
  );
}

SignUp.propTypes = {
  handleChange: PropTypes.func,
};
