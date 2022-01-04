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
import { useFormik } from "formik";
import { addProjectAsync } from "../../stores/projectSlice";
import { projectInformationValidationSchema } from "../../utilities/validationSchema";

export default function FormAddProject({
  handleCloseDialog,
  submitButtonText,
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

  const FormikWithMUI = () => {
    const formik = useFormik({
      initialValues: initialValues,
      validationSchema: projectInformationValidationSchema,
      onSubmit: (values) => {
        dispatch(addProjectAsync(values))
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
                id="name"
                name="name"
                label="Project Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                sx={{ mb: 3 }}
              />
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  id="startDate"
                  name="startDate"
                  label="Start Date"
                  inputFormat="dd/MM/yyyy"
                  value={formik.values.startDate}
                  minDate={new Date("1900-01-01")}
                  maxDate={new Date()}
                  onChange={(value) => {
                    formik.setFieldValue("startDate", value);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      error={
                        formik.touched.startDate &&
                        Boolean(formik.errors.startDate)
                      }
                      helperText={
                        formik.touched.startDate && formik.errors.startDate
                      }
                      fullWidth
                      sx={{ mb: 3 }}
                    />
                  )}
                />
              </LocalizationProvider>

              <TextField
                fullWidth
                id="customer"
                name="customer"
                label="Customer"
                value={formik.values.customer}
                onChange={formik.handleChange}
                error={formik.touched.customer && Boolean(formik.errors.customer)}
                helperText={formik.touched.customer && formik.errors.customer}
                sx={{ mb: 3 }}
              />
            </Grid>

            <Grid item sm={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="departments-label">Departments</InputLabel>
                <Select
                  labelId="departments-label"
                  id="departments"
                  fullWidth
                  multiple
                  value={formik.values.departments}
                  onChange={(e) => {
                    formik.setFieldValue("departments", e.target.value);
                  }}
                  input={<OutlinedInput id="departments" label="Departments" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                  sx={{ mb: 3 }}
                >
                  {departments.map((department, index) => (
                    <MenuItem key={index} value={department.name}>
                      {department.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  id="endDate"
                  name="endDate"
                  label="End Date"
                  inputFormat="dd/MM/yyyy"
                  value={formik.values.endDate}
                  minDate={new Date("1900-01-01")}
                  onChange={(value) => {
                    formik.setFieldValue("endDate", value);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      error={
                        formik.touched.endDate &&
                        Boolean(formik.errors.endDate)
                      }
                      helperText={
                        formik.touched.endDate && formik.errors.endDate
                      }
                      fullWidth
                      sx={{ mb: 3 }}
                    />
                  )}
                />
              </LocalizationProvider>
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
        text={"Added new Project"}
      />
      <SnackbarFailed
        isOpen={isSbFailedOpen}
        handleClose={handleSbFailedClose}
        text={"Add Project failed!"}
      />
      <FormikWithMUI />
    </div>
  );
}

FormAddProject.propTypes = {
  handleCloseDialog: PropTypes.func,
  submitButtonText: PropTypes.string,
  initialValues: PropTypes.object,
};
FormAddProject.defaultProps = {
  initialValues: {
    name: "",
    employee: [],
    customer: "",
    startDate: new Date(),
    endDate: new Date(),
    departments: [],
    isDeleted: false,
  },
  submitButtonText: "SUBMIT",
};
