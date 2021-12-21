import React from "react";
import { Typography, Button, Paper, InputBase, TextField } from "@mui/material";
import {
  getEmployeeAsync,
  addEmployeeAsync,
  updateEmployeeAsync,
} from "../stores/employeeSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";

import * as yup from "yup";

const validationSchema = yup.object().shape({
  name: yup
    .string("Enter your name")
    .min(5, "Name should be of minimum 5 characters length")
    .required("Name is required"),
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
});

export default function Others() {
  const FormikWithMUI = () => {
    const formik = useFormik({
      initialValues: {
        name: "initial",
        email: "initialEmail@gmail.com",
      },
      validationSchema: validationSchema,
      onSubmit: (values) => {
        console.log("form values: ", values);
        // dispatch(addEmployeeAsync(values));
      },
    });
    return (
      <div style={{ marginTop: "30px" }}>
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
          <Button variant="contained" color="primary" fullWidth type="submit">
            SUBMIT
          </Button>
        </form>
      </div>
    );
  };

  const employee = useSelector((state) => state.employee);
  const dispatch = useDispatch();
  const handleGetAllEmployee = () => {
    dispatch(getEmployeeAsync());
  };
  const handleUpdateEmployee = () => {
    dispatch(updateEmployeeAsync({ employeeid: "61bf766089b3596631a31ad5" }));
  };
  return (
    <div>
      <h3>Test redux here</h3>
      {employee.map((value, index) => {
        return <h3 key={index}>{value.name}</h3>;
      })}
      <Button variant="outlined" onClick={() => handleGetAllEmployee()}>
        getAllEmployee
      </Button>
      <Typography variant="h3">Status: </Typography>
      <Button variant="outlined" onClick={() => handleUpdateEmployee()}>
        update Employee
      </Button>
      <FormikWithMUI />
    </div>
  );
}
