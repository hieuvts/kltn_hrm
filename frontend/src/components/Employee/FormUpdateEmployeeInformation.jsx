import React, { useState } from "react";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import DatePicker from "@mui/lab/DatePicker";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import PropTypes from "prop-types";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import SnackbarSuccess from "../Snackbar/SnackbarSuccess";
import SnackbarFailed from "../Snackbar/SnackbarFailed";

import { useDispatch, useSelector } from "react-redux";
import {
  updateEmployeeAsync,
  getEmployeeAsync,
  setCurrentSelectedEmployee,
} from "../../stores/employeeSlice";
import { employeeInfoValidationSchema } from "../../utilities/validationSchema";
import { useFormik } from "formik";
export default function FormUpdateEmployeeInformation({
  handleCloseDialog,
  initialValues,
}) {
  const [isSbSuccessOpen, setSbSuccessOpen] = useState(false);
  const [isSbFailedOpen, setSbFailedOpen] = useState(false);
  const departments = useSelector((state) => state.department.departmentList);

  const handleSbSuccessClose = () => {
    setSbSuccessOpen(false);
  };
  const handleSbFailedClose = () => {
    setSbFailedOpen(false);
  };

  const dispatch = useDispatch();
  // state.currentSelectedEmployee
  // has key/value departments with full data (id, name, headOfDepartment,...)
  // => Extract only department name, pass it as an array, not JS object
  // Start - Handling departments value
  var formikInitialValues = { ...initialValues };

  // End - Handling departments value

  const FormikWithMUI = () => {
    const formik = useFormik({
      initialValues: formikInitialValues,
      validationSchema: employeeInfoValidationSchema,
      onSubmit: (values) => {
        values.departmentID = values.departmentID.toString();
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
              <FormControl fullWidth>
                <InputLabel id="departments-label">Department</InputLabel>
                <Select
                  labelId="departments-label"
                  id="departmentID"
                  label="Department"
                  fullWidth
                  name="departmentID"
                  value={formik.values.departmentID}
                  onChange={formik.handleChange}
                  sx={{ mb: 3 }}
                >
                  {departments.map((department, index) => (
                    <MenuItem key={index} value={department.id}>
                      {department.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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
    fname: "",
    lname: "",
    gender: "Male",
    dateOfBirth: new Date(),
    phoneNumber: "",
    email: "",
    address: "",
    departments: [],
    roles: [],
    projects: [],
    isDeleted: false,
  },
};
