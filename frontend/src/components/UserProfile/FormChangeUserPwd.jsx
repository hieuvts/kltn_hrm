import React, { useState } from "react";
import Button from "@mui/material/Button";
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

import { useDispatch } from "react-redux";
import { logout } from "../../stores/authSlice";
import { changePwdValidationSchema } from "../../utilities/validationSchema";
import { useFormik } from "formik";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export default function FormChangeUserPwd({
  handleCloseDialog,
  submitButtonText,
  initialValues,
}) {
  const user = JSON.parse(localStorage.getItem("user"));
  const [isSbSuccessOpen, setSbSuccessOpen] = useState(false);
  const [isSbFailedOpen, setSbFailedOpen] = useState(false);
  const handleSbSuccessClose = () => {
    setSbSuccessOpen(false);
  };
  const handleSbFailedClose = () => {
    setSbFailedOpen(false);
  };
  const dispatch = useDispatch();

  const FormikWithMUI = () => {
    const formik = useFormik({
      initialValues: initialValues,
      validationSchema: changePwdValidationSchema,
      onSubmit: (values) => {
        // dispatch(changePassword({ ...values, email: user.email }))
        //   .unwrap()
        //   .then((originalPromiseResult) => {
        //     setSbSuccessOpen(true);
        //     setTimeout(() => {
        //       handleCloseDialog();
        //       dispatch(logout());
        //     }, 800);
        //   })
        //   .catch((rejectedValueOrSerializedError) => {
        //     setSbFailedOpen(true);
        //   });
      },
    });
    return (
      <div style={{ marginTop: "30px" }}>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="oldPassword"
            name="oldPassword"
            label="Current password"
            type="password"
            value={formik.values.oldPassword}
            onChange={formik.handleChange}
            error={
              formik.touched.oldPassword && Boolean(formik.errors.oldPassword)
            }
            helperText={formik.touched.oldPassword && formik.errors.oldPassword}
            sx={{ mb: 3 }}
          />
          <TextField
            fullWidth
            id="password"
            name="password"
            label="New password"
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

          <Button variant="contained" color="primary" fullWidth type="submit">
            {submitButtonText}
          </Button>
        </form>
      </div>
    );
  };

  return (
    <div>
      <SnackbarSuccess
        isOpen={isSbSuccessOpen}
        handleClose={handleSbSuccessClose}
        text={"Change password success"}
      />
      <SnackbarFailed
        isOpen={isSbFailedOpen}
        handleClose={handleSbFailedClose}
        text={"Change password failed!"}
      />
      <FormikWithMUI />
    </div>
  );
}

FormChangeUserPwd.propTypes = {
  handleCloseDialog: PropTypes.func,
  submitButtonText: PropTypes.string,
  initialValues: PropTypes.object,
};
FormChangeUserPwd.defaultProps = {
  initialValues: {
    oldPassword: "",
    password: "",
    verifyPassword: "",
  },
  submitButtonText: "Change Password",
};
