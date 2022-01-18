import React, { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import SnackbarSuccess from "../Snackbar/SnackbarSuccess";
import SnackbarFailed from "../Snackbar/SnackbarFailed";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getAllAccount, signUp } from "../../stores/authSlice";
import { accountSignUpValidationSchema } from "../../utilities/validationSchema";
import { useFormik } from "formik";

const initialValues = {
  email: "",
  password: "",
  verifyPassword: "",
};
export default function FormSignUp() {
  const [isSbSuccessOpen, setSbSuccessOpen] = useState(false);
  const [isSbFailedOpen, setSbFailedOpen] = useState(false);
  const company = useSelector((state) => state.company);
  const handleSbSuccessClose = () => {
    setSbSuccessOpen(false);
  };
  const handleSbFailedClose = () => {
    setSbFailedOpen(false);
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const FormikWithMUI = () => {
    const formik = useFormik({
      initialValues: initialValues,
      validationSchema: accountSignUpValidationSchema,
      onSubmit: (values) => {
        dispatch(
          signUp({
            email: values.email,
            password: values.password,
            privilege: "superadmin",
            companyID: company.id,
          })
        )
          .unwrap()
          .then(() => {
            setSbSuccessOpen(true);
            dispatch(getAllAccount({ searchQuery: "" }));
          })
          .catch((error) => {
            setSbFailedOpen(true);
          });
      },
    });
    return (
      <form onSubmit={formik.handleSubmit} style={{ marginTop: "32px" }}>
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
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          sx={{ mb: 3 }}
        />

        <TextField
          fullWidth
          id="verifyPassword"
          name="verifyPassword"
          label="Verify password"
          type="password"
          value={formik.values.verifyPassword}
          onChange={formik.handleChange}
          error={
            formik.touched.verifyPassword &&
            Boolean(formik.errors.verifyPassword)
          }
          helperText={
            formik.touched.verifyPassword && formik.errors.verifyPassword
          }
          sx={{ mb: 3 }}
        />

        <Box sx={{ textAlign: "right" }}>
          <Button variant="contained" color="primary" type="submit">
            CREATE
          </Button>
        </Box>
      </form>
    );
  };

  return (
    <div>
      <SnackbarSuccess
        isOpen={isSbSuccessOpen}
        handleClose={handleSbSuccessClose}
        text={"Added new account!"}
      />
      <SnackbarFailed
        isOpen={isSbFailedOpen}
        handleClose={handleSbFailedClose}
        text={"Create new account failed!!"}
      />
      <FormikWithMUI />
    </div>
  );
}
