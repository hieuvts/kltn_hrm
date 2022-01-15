import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import FormUpdateEmployeeArchievement from "./FormUpdateEmployeeArchievement";
export default function DialogUpdateEmployeeArchievement({
  isDialogOpen,
  handleCloseDialog,
}) {
  var currentSelectedEmployee = useSelector(
    (state) => state.employee.currentSelectedEmployee
  );

  return (
    <div>
      <Dialog open={isDialogOpen} onClose={handleCloseDialog} maxWidth="md">
        <DialogTitle>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h4">Update archievement</Typography>
            <Button onClick={handleCloseDialog}>
              <CloseIcon fontSize="large" />
            </Button>
          </Box>
        </DialogTitle>
        <DialogContent>
          <FormUpdateEmployeeArchievement
            handleCloseDialog={handleCloseDialog}
            initialValues={currentSelectedEmployee}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
DialogUpdateEmployeeArchievement.propTypes = {
  isDialogOpen: PropTypes.bool,
  handleCloseDialog: PropTypes.func,
};
