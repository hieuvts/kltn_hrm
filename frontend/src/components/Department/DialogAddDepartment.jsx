import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import PropTypes from "prop-types";
import CloseIcon from "@mui/icons-material/Close";
import FormAddDepartmentInformation from "./FormAddDepartment";

export default function DialogAddDepartment({
  isDialogOpen,
  handleCloseDialog,
}) {
  return (
    <div>
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <h3>Create new department</h3>
            <Button onClick={handleCloseDialog}>
              <CloseIcon fontSize="large" />
            </Button>
          </Box>
        </DialogTitle>
        <DialogContent>
          <FormAddDepartmentInformation
            handleCloseDialog={handleCloseDialog}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
DialogAddDepartment.propTypes = {
  isDialogOpen: PropTypes.bool,
  handleCloseDialog: PropTypes.func,
};
