import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import PropTypes from "prop-types";
import {
  deleteEmployeeAsync,
  getEmployeeAsync,
} from "../../stores/employeeSlice";
import { useSelector, useDispatch } from "react-redux";

export default function DialogDeleteMultipleEmployee({
  isDialogOpen,
  handleCloseDialog,
  setSelected,
}) {
  const dispatch = useDispatch();
  const selectedEmployeeList = useSelector(
    (state) => state.employee.selectedEmployeeList
  );
  const handleDeleteEmployee = () => {
    // Loop through selectedEmployeeList and call delete func on each one
    // TODO: implement delete many, by sending list of employee id
    selectedEmployeeList.forEach((employee, index) => {
      dispatch(deleteEmployeeAsync({ selectedEmployeeId: employee._id })).then(
        () => {
          setSelected([]);
          dispatch(getEmployeeAsync());
        }
      );
    });
    handleCloseDialog();
  };
  return (
    <div>
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <h3>Are you sure you want to delete multiple employee?</h3>
            <Button onClick={handleCloseDialog}>
              <h3>X</h3>
            </Button>
          </Box>
        </DialogTitle>
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
DialogDeleteMultipleEmployee.propTypes = {
  isDialogOpen: PropTypes.bool,
  handleCloseDialog: PropTypes.func,
  setSelected: PropTypes.func,
};
