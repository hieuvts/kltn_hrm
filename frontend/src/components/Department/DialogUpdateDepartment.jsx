import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import FormUpdateDepartment from "../Department/FormUpdateDepartment";

export default function DialogUpdateEmployee({
  isDialogOpen,
  handleCloseDialog,
}) {
  const currentSelectedDepartment = useSelector(
    (state) => state.department.currentSelectedDepartment
  );
  return (
    <div>
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <h3>Update Department</h3>
            <Button onClick={handleCloseDialog}>
              <CloseIcon fontSize="large" />
            </Button>
          </Box>
        </DialogTitle>
        <DialogContent>
          <FormUpdateDepartment
            handleCloseDialog={handleCloseDialog}
            initialValues={currentSelectedDepartment}
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
