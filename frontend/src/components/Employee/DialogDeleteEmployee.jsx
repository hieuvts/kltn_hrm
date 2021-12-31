import React, { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import SnackbarSuccess from "../Snackbar/SnackbarSuccess";
import SnackbarFailed from "../Snackbar/SnackbarFailed";

import PropTypes from "prop-types";
import {
  deleteEmployeeAsync,
  getEmployeeAsync,
} from "../../stores/employeeSlice";
import { useSelector, useDispatch } from "react-redux";

export default function DialogDeleteEmployee({
  isDialogOpen,
  handleCloseDialog,
}) {
  const [isSbSuccessOpen, setSbSuccessOpen] = useState(false);
  const [isSbFailedOpen, setSbFailedOpen] = useState(false);
  const handleSbSuccessClose = () => {
    setSbSuccessOpen(false);
  };
  const handleSbFailedClose = () => {
    setSbFailedOpen(false);
  };

  const dispatch = useDispatch();
  const selectedEmployeeId = useSelector(
    (state) => state.employee.currentSelectedEmployee._id
  );
  const handleDeleteEmployee = () => {
    dispatch(deleteEmployeeAsync({ selectedEmployeeId: selectedEmployeeId }))
      .unwrap()
      .then(() => {
        dispatch(getEmployeeAsync());
        setSbSuccessOpen(true);
        setTimeout(() => {
          handleCloseDialog();
        }, 800);
      })
      .catch(() => {
        setSbFailedOpen(true);
      });
  };
  return (
    <div>
      <SnackbarSuccess
        isOpen={isSbSuccessOpen}
        handleClose={handleSbSuccessClose}
        text={"Deleted an employee"}
      />
      <SnackbarFailed
        isOpen={isSbFailedOpen}
        handleClose={handleSbFailedClose}
        text={"Delete employee failed!"}
      />
      <Dialog open={isDialogOpen} onClose={handleCloseDialog} maxWidth="md">
        <DialogTitle>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h4">Are you sure you want to delete this employee?</Typography>
            <Button onClick={handleCloseDialog}>
              <CloseIcon fontSize="large" />
            </Button>
          </Box>
        </DialogTitle>
        <DialogContent></DialogContent>
        <DialogActions sx={{ mr: 3, p: 2 }}>
          <Button
            variant="contained"
            sx={{ mr: 2 }}
            onClick={handleCloseDialog}
          >
            No
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => handleDeleteEmployee()}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
DialogDeleteEmployee.propTypes = {
  isDialogOpen: PropTypes.bool,
  handleCloseDialog: PropTypes.func,
};
