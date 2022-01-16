import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import PropTypes from "prop-types";
import CloseIcon from "@mui/icons-material/Close";
import FormAddEmployeeArchievement from "./FormAddEmployeeArchievement";
import { useSelector } from "react-redux";

export default function DialogAddEmployeeArchievement({
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
            <Typography variant="h4">Compliment</Typography>
            <Button onClick={handleCloseDialog}>
              <CloseIcon fontSize="large" />
            </Button>
          </Box>
        </DialogTitle>
        <DialogContent>
          <FormAddEmployeeArchievement
            handleCloseDialog={handleCloseDialog}
            initialValues={currentSelectedEmployee}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
DialogAddEmployeeArchievement.propTypes = {
  isDialogOpen: PropTypes.bool,
  handleCloseDialog: PropTypes.func,
  handleSnackbarOpen: PropTypes.func,
};
