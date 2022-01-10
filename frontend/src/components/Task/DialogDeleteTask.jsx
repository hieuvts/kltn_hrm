import React, { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import SnackbarSuccess from "../Snackbar/SnackbarSuccess";
import SnackbarFailed from "../Snackbar/SnackbarFailed";

import PropTypes from "prop-types";
import { deleteTaskAsync, getTaskAsync } from "../../stores/taskSlice";
import { useSelector, useDispatch } from "react-redux";

export default function DialogDeleteTask({
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
  const selectedTaskID = useSelector(
    (state) => state.task.currentSelectedTask._id
  );
  const handleDeleteTask = () => {
    dispatch(deleteTaskAsync({ selectedTaskID: selectedTaskID }))
      .unwrap()
      .then(() => {
        dispatch(getTaskAsync());
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
        text={"Deleted an task"}
      />
      <SnackbarFailed
        isOpen={isSbFailedOpen}
        handleClose={handleSbFailedClose}
        text={"Delete task failed!"}
      />
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <h5>Are you sure you want to delete this task?</h5>
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
            onClick={() => handleDeleteTask()}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
DialogDeleteTask.propTypes = {
  isDialogOpen: PropTypes.bool,
  handleCloseDialog: PropTypes.func,
};
