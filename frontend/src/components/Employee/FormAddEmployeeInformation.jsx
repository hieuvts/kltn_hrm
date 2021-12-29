import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import PropTypes from "prop-types";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

import { useDispatch } from "react-redux";
import { addEmployeeAsync } from "../../stores/employeeSlice";
import { employeeInfoValidationSchema } from "../../utilities/validationSchema";
import { useFormik } from "formik";
import SnackbarSuccess from "../Snackbar/SnackbarSuccess";
import SnackbarFailed from "../Snackbar/SnackbarFailed";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export default function FormAddEmployeeInformation({
  handleCloseDialog,
  submitButtonText,
  initialValues,
}) {
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
      validationSchema: employeeInfoValidationSchema,
      onSubmit: (values) => {
        dispatch(addEmployeeAsync(values))
          .unwrap()
          .then((originalPromiseResult) => {
            setSbSuccessOpen(true);
            setTimeout(() => {
              handleCloseDialog();
            }, 1500);
          })
          .catch((rejectedValueOrSerializedError) => {
            setSbFailedOpen(true);
          });
      },
    });
    return (
      <div style={{ marginTop: "30px" }}>
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
          {/* <InputLabel id="gender">Gender</InputLabel> */}
          <Select
            labelId="gender"
            id="gender"
            name="gender"
            label="Gender"
            value={formik.values.gender}
            onChange={formik.handleChange}
            fullWidth
            sx={{ mb: 3 }}
          >
            <MenuItem value={"Male"}>Male</MenuItem>
            <MenuItem value={"Female"}>Female</MenuItem>
            <MenuItem value={"Other"}>Other</MenuItem>
          </Select>

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              id="dateOfBirth"
              name="dateOfBirth"
              label="Date of birth"
              inputFormat="dd/MM/yyyy"
              value={formik.values.dateOfBirth}
              minDate={new Date("1900-01-01")}
              maxDate={new Date()}
              onChange={(value) => {
                formik.setFieldValue("dateOfBirth", value);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={
                    formik.touched.dateOfBirth &&
                    Boolean(formik.errors.dateOfBirth)
                  }
                  helperText={
                    formik.touched.dateOfBirth && formik.errors.dateOfBirth
                  }
                  fullWidth
                  sx={{ mb: 3 }}
                />
              )}
            />
          </LocalizationProvider>
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
            id="address"
            name="address"
            label="Address"
            value={formik.values.address}
            onChange={formik.handleChange}
            error={formik.touched.address && Boolean(formik.errors.address)}
            helperText={formik.touched.address && formik.errors.address}
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
        text={"Added new employee"}
      />
      <SnackbarFailed
        isOpen={isSbFailedOpen}
        handleClose={handleSbFailedClose}
        text={"Add employee failed"}
      />
      <FormikWithMUI />
    </div>
  );
}

FormAddEmployeeInformation.propTypes = {
  handleCloseDialog: PropTypes.func,
  submitButtonText: PropTypes.string,
  initialValues: PropTypes.object,
};
FormAddEmployeeInformation.defaultProps = {
  initialValues: {
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
  },
  submitButtonText: "SUBMIT",
};
