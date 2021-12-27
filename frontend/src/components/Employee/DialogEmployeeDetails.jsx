import React, { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

export default function DialogEmployeeDetails({
  isDialogOpen,
  handleCloseDialog,
}) {
  const employee = useSelector(
    (state) => state.employee.currentSelectedEmployee
  );
  console.log("Dialg details: ", employee);
  return (
    <>
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <h3>{employee.name}</h3>
            <Button onClick={handleCloseDialog}>
              <h3>X</h3>
            </Button>
          </Box>
        </DialogTitle>
        <DialogContent>
          <h3>Test dialog employee details</h3>
        </DialogContent>
      </Dialog>
    </>
  );
}

DialogEmployeeDetails.propTypes = {
  isDialogOpen: PropTypes.bool,
  handleCloseDialog: PropTypes.func,
};
