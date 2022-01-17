import React from "react";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@mui/material/Grid";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import ListEmpsOfDepartment from "./ListEmpsOfDepartment";
import PropTypes from "prop-types";
import { rowDirection, colDirection } from "../../../utilities/flexBoxStyle";
import { useSelector } from "react-redux";

export default function DialogDepartmentDetail({
  isDialogOpen,
  handleCloseDialog,
}) {
  const department = useSelector(
    (state) => state.department.currentSelectedDepartment
  );

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
                <Typography variant="h5">Department name</Typography>
                <Typography variant="body1" sx={{ mr: 5 }}>
                  {department.name}
                </Typography>
              </Box>
              <Box sx={rowDirection}>
                <Typography variant="h5">Manager</Typography>
                <Typography variant="body1" sx={{ mr: 5 }}>
                  {department.manager}
                </Typography>
              </Box>
            </Box>
          </Paper>
          <Paper sx={{ mt: 3 }}>
            {department.Employees && (
              <>
                <Typography variant="h6">
                  Number of employees: {department.Employees.length}
                </Typography>
                <ListEmpsOfDepartment employeeList={department.Employees} />
              </>
            )}
          </Paper>
        </DialogContent>
      </Dialog>
    </>
  );
}
DialogDepartmentDetail.propTypes = {
  isDialogOpen: PropTypes.bool,
  handleCloseDialog: PropTypes.func,
};
