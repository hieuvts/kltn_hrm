import React, { useState } from "react";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import DatePicker from "@mui/lab/DatePicker";
import FormControl from "@mui/material/FormControl";
import Autocomplete from "@mui/material/Autocomplete";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import MenuItem from "@mui/material/MenuItem";
import PropTypes from "prop-types";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import SnackbarSuccess from "../Snackbar/SnackbarSuccess";
import SnackbarFailed from "../Snackbar/SnackbarFailed";
import AddIcon from "@mui/icons-material/Add";
import { commonPositionInCompany } from "../../utilities/commonPositionInCompany";
import { useDispatch, useSelector } from "react-redux";
import { addEmployeeAsync } from "../../stores/employeeSlice";
import { employeeInfoValidationSchema } from "../../utilities/validationSchema";
import { useFormik } from "formik";
import DialogAddDepartment from "../Department/DialogAddDepartment";

export default function FormAddEmployeeInformation({
  handleCloseDialog,
  initialValues,
}) {
  const [isSbSuccessOpen, setSbSuccessOpen] = useState(false);
  const [isSbFailedOpen, setSbFailedOpen] = useState(false);
  const departments = useSelector((state) => state.department.departmentList);
  const [isDialogAddDeptOpen, setDialogAddDeptOpen] = useState(false);
  const handleSbSuccessClose = () => {
    setSbSuccessOpen(false);
  };
  const handleSbFailedClose = () => {
    setSbFailedOpen(false);
  };
  const handleDialogAddDeptClose = () => {
    setDialogAddDeptOpen(false);
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
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <FormControl fullWidth>
                  <InputLabel id="departments-label">Department</InputLabel>
                  <Select
                    labelId="departments-label"
                    id="departmentID"
                    name="departmentID"
                    label="Department"
                    fullWidth
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
                <Button
                  type="button"
                  variant="outlined"
                  sx={{ ml: 1, height: "3.5rem" }}
                  onClick={() => setDialogAddDeptOpen(true)}
                >
                  <AddIcon />
                </Button>
              </Box>

              <Autocomplete
                id="positionAC"
                freeSolo
                onChange={(event, value) => {
                  formik.setFieldValue("position", value);
                }}
                options={commonPositionInCompany.map((option) => option)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    id="position"
                    name="position"
                    label="Position"
                    value={formik.values.position}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.position && Boolean(formik.errors.position)
                    }
                    helperText={
                      formik.touched.position && formik.errors.position
                    }
                    sx={{ mb: 3 }}
                  />
                )}
              />

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
            SUBMIT
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
        text={"Add employee failed!"}
      />
      <DialogAddDepartment
        isDialogOpen={isDialogAddDeptOpen}
        handleCloseDialog={handleDialogAddDeptClose}
      />
      <FormikWithMUI />
    </div>
  );
}

FormAddEmployeeInformation.propTypes = {
  handleCloseDialog: PropTypes.func,
  initialValues: PropTypes.object,
};
FormAddEmployeeInformation.defaultProps = {
  initialValues: {
    fname: "",
    lname: "",
    gender: "Male",
    position: "New staff",
    dateOfBirth: new Date(),
    phoneNumber: "",
    email: "",
    address: "",
    departmentID: "1",
    isDeleted: false,
  },
};
