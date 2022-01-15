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
import SnackbarSuccess from "../../Snackbar/SnackbarSuccess";
import SnackbarFailed from "../../Snackbar/SnackbarFailed";

import { useDispatch, useSelector } from "react-redux";
import { addEmployeeAsync } from "../../../stores/employeeSlice";
import { employeeInfoValidationSchema } from "../../../utilities/validationSchema";
import { useFormik } from "formik";

export default function FormUpdateEmployeeArchievement({
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

  const FormikWithMUI = () => {
    const formik = useFormik({
      initialValues: initialValues,
      // validationSchema: employeeInfoValidationSchema,
      onSubmit: (values) => {
        // dispatch(addEmployeeAsync(values))
        //   .unwrap()
        //   .then((originalPromiseResult) => {
        //     setSbSuccessOpen(true);
        //     setTimeout(() => {
        //       handleCloseDialog();
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
          <Grid container rowSpacing={3} columnSpacing={3}>
            <Grid item sm={12} md={6}>
              <Typography variant="h5">Employee:</Typography>
              <Typography sx={{ mt: 3 }}>
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
                id="archievement"
                name="archievement"
                label="Archievement"
                multiline
                minRows={2}
                maxRows={4}
                value={formik.values.archievement}
                onChange={formik.handleChange}
                error={
                  formik.touched.archievement &&
                  Boolean(formik.errors.archievement)
                }
                helperText={
                  formik.touched.archievement && formik.errors.archievement
                }
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
        text={"Updated archievement!"}
      />
      <SnackbarFailed
        isOpen={isSbFailedOpen}
        handleClose={handleSbFailedClose}
        text={"Update archievement failed!"}
      />
      <FormikWithMUI />
    </div>
  );
}

FormUpdateEmployeeArchievement.propTypes = {
  handleCloseDialog: PropTypes.func,
  initialValues: PropTypes.object,
};
FormUpdateEmployeeArchievement.defaultProps = {
  initialValues: { date: new Date(), archievement: "" },
};
