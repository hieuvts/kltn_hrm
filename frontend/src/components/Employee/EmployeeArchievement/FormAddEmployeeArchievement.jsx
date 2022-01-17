import React, { useState } from "react";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import Button from "@mui/material/Button";
import DatePicker from "@mui/lab/DatePicker";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import MenuItem from "@mui/material/MenuItem";
import PropTypes from "prop-types";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import { Typography } from "@mui/material";
import SnackbarSuccess from "../../Snackbar/SnackbarSuccess";
import SnackbarFailed from "../../Snackbar/SnackbarFailed";

import { addEmployeeAchievementAsync } from "../../../stores/employeeAchievementSlice";
import { getEmployeeAsync } from "../../../stores/employeeSlice";
import { useDispatch, useSelector } from "react-redux";

export default function FormAddEmployeeArchievement({
  handleCloseDialog,
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
  const formikInitialValues = {
    employeeID: initialValues.id,
    fname: initialValues.fname,
    lname: initialValues.lname,
    date: initialValues.date,
    achievement: "",
  };
  formikInitialValues.date = new Date();
  const dispatch = useDispatch();

  const FormikWithMUI = () => {
    const formik = useFormik({
      initialValues: formikInitialValues,
      // validationSchema: employeeInfoValidationSchema,
      onSubmit: (values) => {
        console.log("archive submit ", values);
        dispatch(addEmployeeAchievementAsync(values))
          .unwrap()
          .then((originalPromiseResult) => {
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
              <Typography variant="h5">Employee</Typography>
              <Typography sx={{ mt: 3 }} variant="h6">
                {formik.values.fname + " " + formik.values.lname}
              </Typography>
            </Grid>
            <Grid item sm={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  id="date"
                  name="date"
                  label="Date"
                  inputFormat="dd/MM/yyyy"
                  value={formik.values.date}
                  minDate={new Date("1900-01-01")}
                  onChange={(value) => {
                    formik.setFieldValue("date", value);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      error={formik.touched.date && Boolean(formik.errors.date)}
                      helperText={formik.touched.date && formik.errors.date}
                      fullWidth
                      sx={{ mb: 3 }}
                    />
                  )}
                />
              </LocalizationProvider>
              <TextField
                fullWidth
                id="achievement"
                name="achievement"
                label="Archievement"
                multiline
                minRows={2}
                maxRows={4}
                value={formik.values.achievement}
                onChange={formik.handleChange}
                error={
                  formik.touched.achievement &&
                  Boolean(formik.errors.achievement)
                }
                helperText={
                  formik.touched.achievement && formik.errors.achievement
                }
                sx={{ mb: 3 }}
              />
            </Grid>
          </Grid>
          <Button variant="contained" color="primary" fullWidth type="submit">
            SAVE
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
        text={"Added compliment!"}
      />
      <SnackbarFailed
        isOpen={isSbFailedOpen}
        handleClose={handleSbFailedClose}
        text={"Add compliment failed!"}
      />
      <FormikWithMUI />
    </div>
  );
}

FormAddEmployeeArchievement.propTypes = {
  handleCloseDialog: PropTypes.func,
  initialValues: PropTypes.object,
};
FormAddEmployeeArchievement.defaultProps = {
  initialValues: {
    date: new Date(),
    archievement: "",
  },
};
