import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import PropTypes from "prop-types";
import CloseIcon from "@mui/icons-material/Close";
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
              <CloseIcon fontSize="large" />
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
