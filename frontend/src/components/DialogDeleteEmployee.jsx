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

export default function DialogDeleteEmployee({
  isDialogOpen,
  handleCloseDialog,
}) {
  DialogDeleteEmployee.propTypes = {
    isDialogOpen: PropTypes.bool,
    handleCloseDialog: PropTypes.func,
  };

  return (
    <div>
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <h5>Are you sure you want to delete this employee?</h5>
            <Button onClick={handleCloseDialog}>
              <h3>X</h3>
            </Button>
          </Box>
        </DialogTitle>
        <DialogContent>
          {/* <FormEmployeeInformation
            handleSnackbarOpen={handleSnackbarOpen}
            handleCloseDialog={handleCloseDialog}
          /> */}
        </DialogContent>
        <DialogActions sx={{ mr: 3, p: 2 }}>
          <Button
            variant="contained"
            onClick={handleCloseDialog}
            sx={{ mr: 2 }}
          >
            Yes
          </Button>
          <Button variant="contained" onClick={handleCloseDialog}>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
