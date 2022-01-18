import React, { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import SnackbarSuccess from "../Snackbar/SnackbarSuccess";
import SnackbarFailed from "../Snackbar/SnackbarFailed";

import PropTypes from "prop-types";
import {getAllAccount, deleteAccount} from "../../stores/authSlice";
import { useSelector, useDispatch } from "react-redux";

export default function DialogDeleteMultipleAuthAccount({
  isDialogOpen,
  handleCloseDialog,
  setSelected,
}) {
  const dispatch = useDispatch();
  const selectedAuthAccountList = useSelector(
    (state) => state.auth.selectedAuthAccountList
  );
  const [isSbSuccessOpen, setSbSuccessOpen] = useState(false);
  const [isSbFailedOpen, setSbFailedOpen] = useState(false);
  const handleSbSuccessClose = () => {
    setSbSuccessOpen(false);
  };
  const handleSbFailedClose = () => {
    setSbFailedOpen(false);
  };
  const handleDeleteAuthAccount = () => {
    selectedAuthAccountList.forEach((account) => {
      dispatch(deleteAccount({ selectedAuthAccountId: account.id }))
        .unwrap()
        .then(() => {
          setSelected([]);
          dispatch(getAllAccount());
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
        text={"Delete multiple accounts failed!"}
      />
      <Dialog open={isDialogOpen} onClose={handleCloseDialog} maxWidth="md">
        <DialogTitle>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h4">
              Are you sure you want to delete {selectedAuthAccountList.length}{" "}
              accounts?
            </Typography>
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
            onClick={() => handleDeleteAuthAccount()}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
DialogDeleteMultipleAuthAccount.propTypes = {
  isDialogOpen: PropTypes.bool,
  handleCloseDialog: PropTypes.func,
  setSelected: PropTypes.func,
};
