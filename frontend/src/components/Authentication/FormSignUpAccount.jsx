import React, { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import PropTypes from "prop-types";
import MuiAlert from "@mui/material/Alert";
import SnackbarSuccess from "../Snackbar/SnackbarSuccess";
import SnackbarFailed from "../Snackbar/SnackbarFailed";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../../stores/authSlice";
import { accountSignUpValidationSchema } from "../../utilities/validationSchema";
import { useFormik } from "formik";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const initialValues = {
  email: "",
  password: "",
  verifyPassword: "",
};
export default function FormSignUpAccount({ setFormData, nextStep, prevStep }) {
  const [isSbSuccessOpen, setSbSuccessOpen] = useState(false);
  const [isSbFailedOpen, setSbFailedOpen] = useState(false);
  const company = useSelector((state) => state.company);
  const handleSbSuccessClose = () => {
    setSbSuccessOpen(false);
  };
  const handleSbFailedClose = () => {
    setSbFailedOpen(false);
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const FormikWithMUI = () => {
    const formik = useFormik({
      initialValues: initialValues,
      validationSchema: accountSignUpValidationSchema,
      onSubmit: (values) => {
        dispatch(
          signUp({
            email: values.email,
            password: values.password,
            privilege: "superadmin",
            companyID: company.id,
          })
        )
          .unwrap()
          .then(() => {
            setSbSuccessOpen(true);
            nextStep();
            navigate("/login");
          })
          .catch((error) => {
            setSbFailedOpen(true);
          });
      },
    });
    return (
      <form onSubmit={formik.handleSubmit} style={{ marginTop: "32px" }}>
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

        <Box sx={{ textAlign: "right" }}>
          <Button variant="contained" color="primary" type="submit">
            Next
          </Button>
        </Box>
      </form>
    );
  };

  return (
    <div>
      <SnackbarSuccess
        isOpen={isSbSuccessOpen}
        handleClose={handleSbSuccessClose}
        text={"Added super admin!"}
      />
      <SnackbarFailed
        isOpen={isSbFailedOpen}
        handleClose={handleSbFailedClose}
        text={"Create super admin account failed!!"}
      />
      <FormikWithMUI />
    </div>
  );
}

FormSignUpAccount.propTypes = {
  setFormData: PropTypes.func,
  nextStep: PropTypes.func,
  prevStep: PropTypes.func,
};
