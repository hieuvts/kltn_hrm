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
import { updateCompanyAsync, getCompanyAsync } from "../../stores/companySlice";
import { companyInfoValidationSchema } from "../../utilities/validationSchema";
import { useFormik } from "formik";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export default function FormUpdateCompany({
  handleCloseDialog,
  submitButtonText,
  initialValues,
}) {
  const [isSbSuccessOpen, setSbSuccessOpen] = useState(false);
  const [isSbFailedOpen, setSbFailedOpen] = useState(false);
  const currentUserLocal = JSON.parse(localStorage.getItem("user"));
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
      validationSchema: companyInfoValidationSchema,
      onSubmit: (values) => {
        dispatch(updateCompanyAsync(values))
          .unwrap()
          .then((originalPromiseResult) => {
            setSbSuccessOpen(true);
            dispatch(getCompanyAsync({ id: currentUserLocal.companyID }));
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
                label="First name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                sx={{ mb: 3 }}
              />
              <TextField
                fullWidth
                id="typeOfCompany"
                name="typeOfCompany"
                label="Type of companny"
                value={formik.values.typeOfCompany}
                onChange={formik.handleChange}
                error={
                  formik.touched.typeOfCompany &&
                  Boolean(formik.errors.typeOfCompany)
                }
                helperText={
                  formik.touched.typeOfCompany && formik.errors.typeOfCompany
                }
                sx={{ mb: 3 }}
              />
              <TextField
                fullWidth
                id="mainBusinessLines"
                name="mainBusinessLines"
                label="Main business lines"
                value={formik.values.mainBusinessLines}
                onChange={formik.handleChange}
                error={
                  formik.touched.mainBusinessLines &&
                  Boolean(formik.errors.mainBusinessLines)
                }
                helperText={
                  formik.touched.mainBusinessLines &&
                  formik.errors.mainBusinessLines
                }
                sx={{ mb: 3 }}
              />
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  id="establishedDate"
                  name="establishedDate"
                  label="Established date"
                  inputFormat="dd/MM/yyyy"
                  value={formik.values.establishedDate}
                  minDate={new Date("1900-01-01")}
                  maxDate={new Date()}
                  onChange={(value) => {
                    formik.setFieldValue("establishedDate", value);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      error={
                        formik.touched.establishedDate &&
                        Boolean(formik.errors.establishedDate)
                      }
                      helperText={
                        formik.touched.establishedDate &&
                        formik.errors.establishedDate
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
                id="address"
                name="address"
                label="Address"
                value={formik.values.address}
                onChange={formik.handleChange}
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
                sx={{ mb: 3 }}
              />
              <TextField
                fullWidth
                id="address2"
                name="address2"
                label="Address 2"
                value={formik.values.address2}
                onChange={formik.handleChange}
                error={
                  formik.touched.address2 && Boolean(formik.errors.address2)
                }
                helperText={formik.touched.address2 && formik.errors.address2}
                sx={{ mb: 3 }}
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
                id="fax"
                name="fax"
                label="Fax"
                value={formik.values.fax}
                onChange={formik.handleChange}
                error={
                  formik.touched.fax && Boolean(formik.errors.fax)
                }
                helperText={formik.touched.fax && formik.errors.fax}
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
                id="website"
                name="website"
                label="Website"
                value={formik.values.website}
                onChange={formik.handleChange}
                error={formik.touched.website && Boolean(formik.errors.website)}
                helperText={formik.touched.website && formik.errors.website}
                sx={{ mb: 3 }}
              />
              <TextField
                fullWidth
                id="taxCode"
                name="taxCode"
                label="Tax code"
                value={formik.values.taxCode}
                onChange={formik.handleChange}
                error={formik.touched.taxCode && Boolean(formik.errors.taxCode)}
                helperText={formik.touched.taxCode && formik.errors.taxCode}
                sx={{ mb: 3 }}
              />
            </Grid>
          </Grid>

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
        text={"Updated company"}
      />
      <SnackbarFailed
        isOpen={isSbFailedOpen}
        handleClose={handleSbFailedClose}
        text={"Update company failed!!"}
      />
      <FormikWithMUI />
    </div>
  );
}

FormUpdateCompany.propTypes = {
  handleCloseDialog: PropTypes.func,
  submitButtonText: PropTypes.string,
  initialValues: PropTypes.object,
};
FormUpdateCompany.defaultProps = {
  initialValues: {
    name: "",
    establishedDate: new Date(),
    typeOfCompany: "",
    mainBusinessLines: "",
    address: "",
    address2: "",
    phoneNumber: "",
    fax: "",
    email: "",
    website: "",
    taxCode: "",
  },
  submitButtonText: "SUBMIT",
};
