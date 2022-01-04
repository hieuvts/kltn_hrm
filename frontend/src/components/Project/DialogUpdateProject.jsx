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

import FormUpdateProject from "./FormUpdateProject";

export default function DialogUpdateProject({
  isDialogOpen,
  handleCloseDialog,
}) {
  const currentSelectedProject = useSelector(
    (state) => state.project.currentSelectedProject
  );
  return (
    <div>
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <h3>Update Project</h3>
            <Button onClick={handleCloseDialog}>
              <CloseIcon fontSize="large" />
            </Button>
          </Box>
        </DialogTitle>
        <DialogContent>
          <FormUpdateProject
            handleCloseDialog={handleCloseDialog}
            initialValues={currentSelectedProject}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
DialogUpdateProject.propTypes = {
  isDialogOpen: PropTypes.bool,
  handleCloseDialog: PropTypes.func,
};
