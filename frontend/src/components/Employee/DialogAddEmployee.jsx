import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import PropTypes from "prop-types";

import FormEmployeeInformation from "./FormEmployeeInformation";
export default function DialogAddEmployee({
  isDialogOpen,
  handleCloseDialog,
  handleSnackbarOpen,
}) {
  return (
    <div>
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <h3>Create new employee</h3>
            <Button onClick={handleCloseDialog}>
              <h3>X</h3>
            </Button>
          </Box>
        </DialogTitle>
        <DialogContent>
          <FormEmployeeInformation
            handleSnackbarOpen={handleSnackbarOpen}
            handleCloseDialog={handleCloseDialog}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
DialogAddEmployee.propTypes = {
  isDialogOpen: PropTypes.bool,
  handleCloseDialog: PropTypes.func,
  handleSnackbarOpen: PropTypes.func,
};
