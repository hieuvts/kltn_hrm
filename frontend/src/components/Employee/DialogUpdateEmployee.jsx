import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import FormUpdateEmployeeInformation from "./FormUpdateEmployeeInformation";
export default function DialogUpdateEmployee({
  isDialogOpen,
  handleCloseDialog,
}) {
  const currentSelectedEmployee = useSelector(
    (state) => state.employee.currentSelectedEmployee
  );
  return (
    <div>
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <h3>Update employee</h3>
            <Button onClick={handleCloseDialog}>
              <h3>X</h3>
            </Button>
          </Box>
        </DialogTitle>
        <DialogContent>
          <FormUpdateEmployeeInformation
            handleCloseDialog={handleCloseDialog}
            initialValues={currentSelectedEmployee}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
DialogUpdateEmployee.propTypes = {
  isDialogOpen: PropTypes.bool,
  handleCloseDialog: PropTypes.func,
};
