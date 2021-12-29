import React from "react";
import {
  Avatar,
  Grid,
  Paper,
  TextField,
  FormControl,
  Typography,
  Button,
} from "@mui/material";

import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { useFormik } from "formik";
import { accountValidationSchema } from "../../utilities/accountValidationSchema";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const initialValues = {
  fname: "",
  lname: "",
  gender: "Male",
  dateOfBirth: new Date(),
  phoneNumber: "",
  email: "",
  address: "",
  roleID: "1",
  departmentID: "1",
  projectID: "1",
  isDeleted: false,
};

export default function Login() {
  const paperStyle = { padding: 20, width: 310, margin: "0 auto" };
  const avatarStyle = { backgroundColor: "#5048E4" };
  const headerStyle = { margin: "8px" };
  const inputStyle = { marginTop: "8px" };
  const FormikWithMUI = () => {
    const formik = useFormik({
      initialValues: initialValues,
      validationSchema: accountValidationSchema,
      onSubmit: (values) => {
        dispatch(addEmployeeAsync(values));
        handleSnackbarOpen();
        handleCloseDialog();
      },
    });
    return (
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="fname"
          name="fname"
          label="First name"
          value={formik.values.fname}
          onChange={formik.handleChange}
          error={formik.touched.fname && Boolean(formik.errors.fname)}
          helperText={formik.touched.fname && formik.errors.fname}
          sx={{ mb: 3 }}
        />
        <TextField
          fullWidth
          id="lname"
          name="lname"
          label="Last name"
          value={formik.values.lname}
          onChange={formik.handleChange}
          error={formik.touched.lname && Boolean(formik.errors.lname)}
          helperText={formik.touched.lname && formik.errors.lname}
          sx={{ mb: 3 }}
        />

        <TextField
          fullWidth
          id="phoneNumber"
          name="phoneNumber"
          label="Phone number"
          value={formik.values.phoneNumber}
          onChange={formik.handleChange}
          error={
            formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
          }
          helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
          sx={{ mb: 3 }}
        />
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
          id="username"
          name="username"
          label="Username"
          value={formik.values.username}
          onChange={formik.handleChange}
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
          sx={{ mb: 3 }}
        />
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Password"
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

        <Button variant="contained" color="primary" fullWidth type="submit">
          Signup
        </Button>
      </form>
    );
  };
  return (
    <Grid>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={true}
        autoHideDuration={2500}
        key={"top" + "right"}
        sx={{ mt: "0" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Placeholder
        </Alert>
      </Snackbar>
      <Paper elevation={10} style={paperStyle}>
        <Grid align={"center"}>
          <h2 style={headerStyle}>Login</h2>
          <Avatar style={avatarStyle}>
            <AddCircleOutlineOutlinedIcon />
          </Avatar>
          <Typography variant="caption">Fill account information</Typography>
        </Grid>
        <FormikWithMUI />
      </Paper>
    </Grid>
  );
}
