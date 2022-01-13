import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import PropTypes from "prop-types";
import MuiAlert from "@mui/material/Alert";
import SnackbarSuccess from "../Snackbar/SnackbarSuccess";
import SnackbarFailed from "../Snackbar/SnackbarFailed";

import { useDispatch, useSelector } from "react-redux";
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
  const employees = useSelector((state) => state.employee.employeeList);

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
            error={
              formik.touched.departmentName &&
              Boolean(formik.errors.departmentName)
            }
            helperText={
              formik.touched.departmentName && formik.errors.departmentName
            }
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
          <FormControl fullWidth>
            <InputLabel id="manager-label">Manager</InputLabel>
            <Select
              labelId="manager-label"
              id="manager"
              name="manager"
              label="Manager"
              fullWidth
              value={formik.values.manager}
              onChange={formik.handleChange}
              sx={{ mb: 3 }}
            >
              {employees.map((employee, index) => (
                <MenuItem key={index} value={employee.id}>
                  {employee.fname + " " + employee.lname}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

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
    manager: "",
  },
  submitButtonText: "SUBMIT",
};
