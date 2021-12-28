import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { getEmployeeAsync } from "../../../stores/employeeSlice";
import DialogUpdateEmploee from "../DialogUpdateEmployee";

const rowDirection = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  py: 1,
};
const colDirection = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  py: 1,
};
export default function PersonalInformation() {
  var employee = (employee = useSelector(
    (state) => state.employee.currentSelectedEmployee
  ));
  const dispatch = useDispatch();
  const [isDialogUpdateEmployeeOpen, setDialogUpdateEmployee] = useState(false);
  const handleCloseDialogUpdateEmployee = () => {
    setDialogUpdateEmployee(false);
  };
  useEffect(() => {
    dispatch(getEmployeeAsync());
  }, []);
  return (
    <>
      <DialogUpdateEmploee
        isDialogOpen={isDialogUpdateEmployeeOpen}
        handleCloseDialog={handleCloseDialogUpdateEmployee}
      />
      <Paper elevation={3} sx={{ p: 3 }}>
        <Box sx={rowDirection}>
          <Typography variant="h6" sx={{ alignSelf: "center" }}>
            Contact
          </Typography>
          <Button
            variant="outlined"
            color="info"
            onClick={() => setDialogUpdateEmployee(true)}
          >
            Edit
          </Button>
        </Box>
        <Divider />
        <Box sx={colDirection}>
          <Box sx={rowDirection}>
            <Typography variant="h6">Name: </Typography>
            <Typography variant="h6">{employee.name}</Typography>
          </Box>
          <Box sx={rowDirection}>
            <Typography variant="h6">Gender: </Typography>
            <Typography variant="h6">{employee.gender}</Typography>
          </Box>
          <Box sx={rowDirection}>
            <Typography variant="h6">Email: </Typography>
            <Typography variant="h6">{employee.email}</Typography>
          </Box>
          <Box sx={rowDirection}>
            <Typography variant="h6">Address: </Typography>
            <Typography variant="h6">{employee.address}</Typography>
          </Box>
          <Box sx={rowDirection}>
            <Typography variant="h6">Department: </Typography>
            <Typography variant="h6">{employee.departmentID}</Typography>
          </Box>
        </Box>
      </Paper>
    </>
  );
}
