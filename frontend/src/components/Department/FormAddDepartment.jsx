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
import SnackbarSuccess from "../Snackbar/SnackbarSuccess";
import SnackbarFailed from "../Snackbar/SnackbarFailed";

import { useDispatch } from "react-redux";
import { addDepartmentAsync } from "../../stores/departmentSlice";
import { departmentInformationValidationSchema } from "../../utilities/validationSchema";
import { useFormik } from "formik";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function FormAddDepartmentInformation({
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
      validationSchema: departmentInformationValidationSchema,
      onSubmit: (values) => {
        dispatch(addDepartmentAsync(values))
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
          <TextField
            fullWidth
            id="name"
            name="name"
            label="Name of Department"
            value={formik.values.departmentName}
            onChange={formik.handleChange}
            error={formik.touched.departmentName && Boolean(formik.errors.departmentName)}
            helperText={formik.touched.departmentName && formik.errors.departmentName}
            sx={{ mb: 3 }}
          />
          <TextField
            fullWidth
            id="amount"
            name="amount"
            label="Amount of Staff"
            value={formik.values.amount}
            onChange={formik.handleChange}
            error={formik.touched.amount && Boolean(formik.errors.amount)}
            helperText={formik.touched.amount && formik.errors.amount}
            sx={{ mb: 3 }}
          />
          {/* <InputLabel id="gender">Gender</InputLabel> */}
          <TextField
            fullWidth
            id="manager"
            name="manager"
            label="Name of Manager"
            value={formik.values.manager}
            onChange={formik.handleChange}
            error={formik.touched.manager && Boolean(formik.errors.manager)}
            helperText={formik.touched.manager && formik.errors.manager}
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
      <SnackbarSuccess
        isOpen={isSbSuccessOpen}
        handleClose={handleSbSuccessClose}
        text={"Added new Department"}
      />
      <SnackbarFailed
        isOpen={isSbFailedOpen}
        handleClose={handleSbFailedClose}
        text={"Add Department failed!"}
      />
      <FormikWithMUI />
    </div>
  );
}

FormAddDepartmentInformation.propTypes = {
  handleCloseDialog: PropTypes.func,
  submitButtonText: PropTypes.string,
  initialValues: PropTypes.object,
};
FormAddDepartmentInformation.defaultProps = {
  initialValues: {
    name: "",
    amount: "",
    manager: ""
  },
  submitButtonText: "SUBMIT",
};
