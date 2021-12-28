import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
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
  DialogDeleteEmployee.propTypes = {
    isDialogOpen: PropTypes.bool,
    handleCloseDialog: PropTypes.func,
  };
  const dispatch = useDispatch();
  const selectedEmployeeId = useSelector(
    (state) => state.employee.currentSelectedEmployee._id
  );
  const handleDeleteEmployee = () => {
    dispatch(
      deleteEmployeeAsync({ selectedEmployeeId: selectedEmployeeId })
    ).then(() => {
      dispatch(getEmployeeAsync());
    });
    handleCloseDialog();
  };
  return (
    <div>
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <h5>Are you sure you want to delete this employee?</h5>
            <Button onClick={handleCloseDialog}>
              <CloseIcon fontSize="large" />
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
