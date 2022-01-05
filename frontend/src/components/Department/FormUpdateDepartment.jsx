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
  updateDepartmentAsync,
  getDepartmentAsync,
  setCurrentSelectedDepartment,
} from "../../stores/departmentSlice";
import { departmentInformationValidationSchema } from "../../utilities/validationSchema";
import { useFormik } from "formik";

export default function FormUpdateDepartment({
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

  //   const initDepartmentValue = formikInitialValues["departments"].map(
  //     ({ name }) => ({ name })
  //   );
  //   const initRoleValue = formikInitialValues["roles"].map(
  //     ({ name }) => ({ name })
  //   );

  //   const departmentNameArr = initDepartmentValue.map((x) => x.name);
  //   const roleNameArr = initRoleValue.map((x) => x.name);

  //   delete formikInitialValues.departments;
  //   delete formikInitialValues.roles;

  //   formikInitialValues["departments"] = departmentNameArr;
  //   formikInitialValues["roles"] = roleNameArr;
  // End - Handling departments value

  const FormikWithMUI = () => {
    const formik = useFormik({
      initialValues: formikInitialValues,
      validationSchema: departmentInformationValidationSchema,
      onSubmit: (values) => {
        dispatch(updateDepartmentAsync(values))
          .unwrap()
          .then(() => {
            dispatch(
              setCurrentSelectedDepartment({
                currentSelectedDepartment: values,
              })
            );
            dispatch(getDepartmentAsync());
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
            value={formik.values.name}
            onChange={formik.handleChange}
            error={
              formik.touched.name &&
              Boolean(formik.errors.name)
            }
            helperText={
              formik.touched.name && formik.errors.name
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
        text={"Updated department information"}
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

FormUpdateDepartment.propTypes = {
  handleCloseDialog: PropTypes.func,
  initialValues: PropTypes.object,
};
FormUpdateDepartment.defaultProps = {
  initialValues: {
    name: "",
    amount: "",
    manager: "",
  },
};
