import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import PropTypes from "prop-types";
import * as yup from "yup";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import ExportToExcel from "../../utilities/exportToExcel";


const fileType =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";

export const validationSchema = yup.object().shape({
  fileName: yup
    .string("Enter file name")
    .required("File name is required!")
    .matches(/^[^\\/:\*\?"<>\|]+$/, `Should not contains \ / : * ? " < > |`),
});
export default function DialogExportToExcel({
  isDialogOpen,
  handleCloseDialog,
}) {
  const employeeList = useSelector((state) => state.employee.employeeList);

  const FormikWithMUI = () => {
    const formik = useFormik({
      initialValues: {
        fileName: "",
      },
      validationSchema: validationSchema,
      onSubmit: (values) => {
        ExportToExcel(employeeList, values.fileName);
      },
    });
    return (
      <form onSubmit={formik.handleSubmit}>
        <TextField
          id="fileName"
          label="File name"
          placeholder="EmployeeList"
          variant="outlined"
          fullWidth
          value={formik.values.fileName}
          error={formik.touched.fileName && Boolean(formik.errors.fileName)}
          helperText={formik.touched.fileName && formik.errors.fileName}
          onChange={formik.handleChange}
          sx={{ my: 3 }}
        />
        <Button variant="contained" color="primary" fullWidth type="submit">
          Export
        </Button>
      </form>
    );
  };
  return (
    <div>
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <h5>Export all employee</h5>
            <Button onClick={handleCloseDialog}>
              <h3>X</h3>
            </Button>
          </Box>
        </DialogTitle>
        <DialogContent>
          <FormikWithMUI />
        </DialogContent>
      </Dialog>
    </div>
  );
}

DialogExportToExcel.propTypes = {
  isDialogOpen: PropTypes.bool,
  handleCloseDialog: PropTypes.func,
  employeeList: PropTypes.array,
};
