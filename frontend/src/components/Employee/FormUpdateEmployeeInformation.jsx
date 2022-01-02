import React, { useState } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import MuiAlert from "@mui/material/Alert";
import SnackbarSuccess from "../Snackbar/SnackbarSuccess";
import SnackbarFailed from "../Snackbar/SnackbarFailed";

import PropTypes from "prop-types";
import { employeeInfoValidationSchema } from "../../utilities/validationSchema";
import {
  updateEmployeeAsync,
  getEmployeeAsync,
  setCurrentSelectedEmployee,
} from "../../stores/employeeSlice";

import { useDispatch } from "react-redux";
import { useFormik } from "formik";
export default function FormUpdateEmployeeInformation({
  handleCloseDialog,
  initialValues,
}) {
  const dispatch = useDispatch();
  const [isSbSuccessOpen, setSbSuccessOpen] = useState(false);
  const [isSbFailedOpen, setSbFailedOpen] = useState(false);
  const handleSbSuccessClose = () => {
    setSbSuccessOpen(false);
  };
  const handleSbFailedClose = () => {
    setSbFailedOpen(false);
  };

  const FormikWithMUI = () => {
    const formik = useFormik({
      initialValues: initialValues,
      validationSchema: employeeInfoValidationSchema,
      onSubmit: (values) => {
        dispatch(updateEmployeeAsync(values))
          .unwrap()
          .then(() => {
            dispatch(
              setCurrentSelectedEmployee({ currentSelectedEmployee: values })
            );
            dispatch(getEmployeeAsync());
            setSbSuccessOpen(true);
            setTimeout(() => {
              handleCloseDialog();
            }, 800);
          })
          .catch((rejectedValueOrSerializedError) => {
            setSbFailedOpen(true);
          });
      },
    });
    return (
      <div style={{ marginTop: "30px" }}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container rowSpacing={3} columnSpacing={3}>
            <Grid item sm={12} md={6}>
              {" "}
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
              <FormControl fullWidth>
              <InputLabel id="gender-label">Gender</InputLabel>
                <Select
                  labelId="gender-label"
                  id="gender"
                  name="gender"
                  value={formik.values.gender}
                  label="Gender"
                  fullWidth
                  onChange={formik.handleChange}
                  sx={{ mb: 3 }}
                >
                  <MenuItem value={"Male"}>Male</MenuItem>
                  <MenuItem value={"Female"}>Female</MenuItem>
                  <MenuItem value={"Other"}>Other</MenuItem>
                </Select>
              </FormControl>
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
            </Grid>
            <Grid item sm={12} md={6}>
              <TextField
                fullWidth
                id="phoneNumber"
                name="phoneNumber"
                label="Phone number"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                error={
                  formik.touched.phoneNumber &&
                  Boolean(formik.errors.phoneNumber)
                }
                helperText={
                  formik.touched.phoneNumber && formik.errors.phoneNumber
                }
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
            </Grid>
          </Grid>

          <Button variant="contained" color="primary" fullWidth type="submit">
            UPDATE
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
        text={"Updated employee information"}
      />
      <SnackbarFailed
        isOpen={isSbFailedOpen}
        handleClose={handleSbFailedClose}
        text={"Update failed!"}
      />
      <FormikWithMUI />
    </div>
  );
}

FormUpdateEmployeeInformation.propTypes = {
  handleCloseDialog: PropTypes.func,
  initialValues: PropTypes.object,
};
FormUpdateEmployeeInformation.defaultProps = {
  initialValues: {
    name: "",
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
};
