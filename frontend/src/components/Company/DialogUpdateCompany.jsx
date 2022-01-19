import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import PropTypes from "prop-types";
import CloseIcon from "@mui/icons-material/Close";
import FormUpdateCompany from "./FormUpdateCompany";
import { useSelector } from "react-redux";

export default function DialogUpdateCompany({
  isDialogOpen,
  handleCloseDialog,
}) {
  const selectedComp = useSelector((state) => state.company);
  return (
    <div>
      <Dialog open={isDialogOpen} onClose={handleCloseDialog} maxWidth="md">
        <DialogTitle>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h5">
              Update your company information
            </Typography>
            <Button onClick={handleCloseDialog}>
              <CloseIcon fontSize="large" />
            </Button>
          </Box>
        </DialogTitle>
        <DialogContent>
          <FormUpdateCompany
            initialValues={selectedComp}
            handleCloseDialog={handleCloseDialog}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
DialogUpdateCompany.propTypes = {
  isDialogOpen: PropTypes.bool,
  handleCloseDialog: PropTypes.func,
  handleSnackbarOpen: PropTypes.func,
};
