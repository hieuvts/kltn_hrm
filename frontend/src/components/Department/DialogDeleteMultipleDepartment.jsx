import React, { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import SnackbarSuccess from "../Snackbar/SnackbarSuccess";
import SnackbarFailed from "../Snackbar/SnackbarFailed";

import PropTypes from "prop-types";
import { deleteDepartmentAsync,getDepartmentASync } from "../../stores/departmentSlice";
import { useSelector, useDispatch } from "react-redux";

export default function DialogDeleteMultipleDeparment({
  isDialogOpen,
  handleCloseDialog,
  setSelected,
}) {
  const dispatch = useDispatch();
  const selectedDepartmentList = useSelector(
    (state) => state.department.selectedDepartmentList
  );
  const [isSbSuccessOpen, setSbSuccessOpen] = useState(false);
  const [isSbFailedOpen, setSbFailedOpen] = useState(false);
  const handleSbSuccessClose = () => {
    setSbSuccessOpen(false);
  };
  const handleSbFailedClose = () => {
    setSbFailedOpen(false);
  };
  const handleDeleteEmployee = () => {
    // Loop through selectedEmployeeList and call delete func on each one
    // TODO: implement delete many, by sending list of employee id
    selectedDepartmentList.forEach((department, index) => {
      dispatch(deleteDepartmentAsync({ selectedDepartmentId: department._id }))
        .unwrap()
        .then(() => {
          setSelected([]);
          dispatch(getDepartmentASync());
          setSbSuccessOpen(true);
          setTimeout(() => {
            handleCloseDialog();
          }, 800);
        })
        .catch(() => {
          setSbFailedOpen(true);
        });
    });
  };
  return (
    <div>
      <SnackbarSuccess
        isOpen={isSbSuccessOpen}
        handleClose={handleSbSuccessClose}
        text={"Delete successful!"}
      />
      <SnackbarFailed
        isOpen={isSbFailedOpen}
        handleClose={handleSbFailedClose}
        text={"Delete multiple department failed!"}
      />
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <h3>
              Are you sure you want to delete {selectedDepartmentList.length}{" "}
              department?
            </h3>
            <Button onClick={handleCloseDialog}>
              <CloseIcon fontSize="large" />
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
DialogDeleteMultipleDeparment.propTypes = {
  isDialogOpen: PropTypes.bool,
  handleCloseDialog: PropTypes.func,
  setSelected: PropTypes.func,
};
