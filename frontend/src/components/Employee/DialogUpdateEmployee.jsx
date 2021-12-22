import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import PropTypes from "prop-types";

import FormEmployeeInformation from "./FormEmployeeInformation";
export default function DialogUpdateEmployee({
  isDialogOpen,
  handleCloseDialog,
  handleSnackbarOpen,
}) {
  DialogUpdateEmployee.propTypes = {
    isDialogOpen: PropTypes.bool,
    handleCloseDialog: PropTypes.func,
    handleSnackbarOpen: PropTypes.func,
  };

  return (
    <div>
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <h5>Fill the employee personal information</h5>
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
