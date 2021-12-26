import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import { useFormik } from "formik";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { addEmployeeAsync } from "../../stores/employeeSlice";
import { validationSchema } from "../../utilities/employeeInfoValidationSchema";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export default function FormEmployeeInformation({
  handleCloseDialog,
  handleSnackbarOpen,
  submitButtonText,
  initialValues,
}) {
  const dispatch = useDispatch();

  const FormikWithMUI = () => {
    const formik = useFormik({
      initialValues: initialValues,
      validationSchema: validationSchema,
      onSubmit: (values) => {
        dispatch(addEmployeeAsync(values));
        handleSnackbarOpen();
        handleCloseDialog();
      },
    });
    return (
      <div style={{ marginTop: "30px" }}>
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
      <FormikWithMUI />
    </div>
  );
}

FormEmployeeInformation.propTypes = {
  handleSnackbarOpen: PropTypes.func,
  handleCloseDialog: PropTypes.func,
  submitButtonText: PropTypes.string,
  initialValues: PropTypes.object,
};
FormEmployeeInformation.defaultProps = {
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
  submitButtonText: "SUBMIT",
};
