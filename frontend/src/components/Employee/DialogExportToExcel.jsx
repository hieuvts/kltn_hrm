import React, { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import PropTypes from "prop-types";
import * as XLSX from "xlsx";
import * as FileSaver from "file-saver";

import { getEmployeeAsync } from "../../stores/employeeSlice";
import { useSelector, useDispatch } from "react-redux";
import ExportToExcel from "../../utilities/exportToExcel";
import { Typography } from "@mui/material";

const fileType =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
export default function DialogExportToExcel({
  isDialogOpen,
  handleCloseDialog,
}) {
  const [fileName, setFileName] = useState("");
  const employeeList = useSelector((state) => state.employee.employeeList);

  return (
    <div>
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <h5>Export all employee</h5>
            <Button onClick={handleCloseDialog}>
              <h3>X</h3>
            </Button>
          </Box>
        </DialogTitle>
        <DialogContent>
          <TextField
            id="outlined-basic"
            label="File name"
            variant="outlined"
            onChange={(e) => setFileName(e.target.value)}
            sx={{ m: 2 }}
          />
          <Typography>Filename: {fileName}</Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button
            variant="contained"
            sx={{ mr: 2 }}
            onClick={handleCloseDialog}
          >
            PDF
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              ExportToExcel(employeeList, fileName);
              handleCloseDialog();
            }}
          >
            EXCEL
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

DialogExportToExcel.propTypes = {
  isDialogOpen: PropTypes.bool,
  handleCloseDialog: PropTypes.func,
  employeeList: PropTypes.array,
};
