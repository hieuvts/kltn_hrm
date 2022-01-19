import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@mui/material/Grid";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import ProjTaskList from "./ProjectDetail/ListOfTaskInProj";
import PropTypes from "prop-types";
import { rowDirection, colDirection } from "../../utilities/flexBoxStyle";
import { useSelector } from "react-redux";

export default function DialogProjectDetail({
  isDialogOpen,
  handleCloseDialog,
}) {
  const projects = useSelector((state) => state.project.currentSelectedProject);

  return (
    <>
      <Dialog maxWidth="lg" open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>
          <Box sx={{ display: "flex", justifyContent: "end" }}>
            <Button onClick={handleCloseDialog}>
              <CloseIcon fontSize="large" />
            </Button>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Paper>
            <Box sx={colDirection}>
              <Box sx={rowDirection}>
                <Typography variant="h5">Name</Typography>
                <Typography variant="body1" sx={{ mr: 5 }}>
                  {projects.name}
                </Typography>
              </Box>
              <Box sx={rowDirection}>
                <Typography variant="h5">Customer</Typography>
                <Typography variant="body1" sx={{ mr: 5 }}>
                  {projects.customer}
                </Typography>
              </Box>
            </Box>
          </Paper>
          <Paper sx={{ mt: 3 }}>
            {projects.Tasks && (
              <>
                <Typography variant="h5" sx={{ ml: 5, py: 1 }}>
                  Task list
                </Typography>
                <ProjTaskList />
              </>
            )}
          </Paper>
        </DialogContent>
      </Dialog>
    </>
  );
}
DialogProjectDetail.propTypes = {
  isDialogOpen: PropTypes.bool,
  handleCloseDialog: PropTypes.func,
};
