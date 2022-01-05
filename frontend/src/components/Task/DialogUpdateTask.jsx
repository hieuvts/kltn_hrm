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

import FormUpdateTask from "./FormUpdateTask";

export default function DialogUpdateTask({
  isDialogOpen,
  handleCloseDialog,
}) {
  const currentSelectedTask = useSelector(
    (state) => state.task.currentSelectedTask
  );
  return (
    <div>
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <h3>Update Task</h3>
            <Button onClick={handleCloseDialog}>
              <CloseIcon fontSize="large" />
            </Button>
          </Box>
        </DialogTitle>
        <DialogContent>
          <FormUpdateTask
            handleCloseDialog={handleCloseDialog}
            initialValues={currentSelectedTask}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
DialogUpdateTask.propTypes = {
  isDialogOpen: PropTypes.bool,
  handleCloseDialog: PropTypes.func,
};
