import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Snackbar from "@mui/material/Snackbar";
import CloseIcon from "@mui/icons-material/Close";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import * as yup from "yup";
import { useFormik } from "formik";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { addEmployeeAsync } from "../stores/employeeSlice";

const phoneNumberRegex =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = yup.object().shape({
  name: yup
    .string("Enter your name")
    .min(2, "Name should be of minimum 2 characters length")
    .max(150, "Name should be of maximum 150 characters length")
    .required("Name is required!"),
  gender: yup
    .mixed()
    .oneOf(["Male", "Female", "Other"])
    .required("Gender is required!"),
  dateOfBirth: yup
    .date("Select your birthday")
    .required("Birthday is required!"),
  phoneNumber: yup
    .string("Enter your phone number")
    .matches(phoneNumberRegex, "Phone number is not valid")
    .min(8, "Phone number should be of minimum 8 characters length")
    .max(15, "Phone number should be of maximum 15 characters length")
    .required("Phone number is required!"),
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required!"),
  address: yup
    .string("Enter your address")
    .max(150, "Address should be of maximum 150 characters length")
    .required("Address is required!"),
  roleID: yup
    .string()
    .max(10, "RoleID should be of maximum 10 characters lenght")
    .default("roleID"),
  departmentID: yup
    .string()
    .max(10, "DepartmentID should be of maximum 10 characters lenght")
    .default("departmentID"),
  projectID: yup
    .string()
    .max(10, "ProjectID should be of maximum 10 characters lenght")
    .default("projectID"),
  isDeleted: yup.bool().default(false),
});
export default function FormEmployeeInformation({
  handleCloseDialog,
  handleSnackbarOpen,
}) {
  FormEmployeeInformation.propTypes = {
    handleSnackbarOpen: PropTypes.func,
    handleCloseDialog: PropTypes.func,
  };
  const [datePickerValue, setDatePickerValue] = useState(
    new Date("2021-01-01T00:00:))")
  );

  const handleDatePicker = (dateValue) => {
    setDatePickerValue(dateValue);
  };
  const dispatch = useDispatch();

  const FormikWithMUI = () => {
    const formik = useFormik({
      initialValues: {
        name: "",
        gender: "Male",
        dateOfBirth: "",
        phoneNumber: "",
        email: "",
        address: "",
        roleID: "1",
        departmentID: "1",
        projectID: "1",
        isDeleted: false,
      },
      validationSchema: validationSchema,
      onSubmit: (values) => {
        // alert(JSON.stringify(values, null, 2));
        dispatch(addEmployeeAsync(values));
        handleSnackbarOpen();
        handleCloseDialog();
      },
    });
    return (
      <div style={{ marginTop: "30px" }}>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="name"
            name="name"
            label="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            sx={{ mb: 3 }}
          />
          <InputLabel id="gender">Gender</InputLabel>
          <Select
            labelId="gender"
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

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              id="dateOfBirth"
              name="dateOfBirth"
              label="Date of birth"
              inputFormat="dd/MM/yyyy"
              value={formik.values.dateOfBirth}
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
            SUBMIT
          </Button>
        </form>
      </div>
    );
  };

  return (
    <div>
      <FormikWithMUI />
    </div>
  );
}
