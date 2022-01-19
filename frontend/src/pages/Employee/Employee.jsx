import React, { useState, useEffect, useCallback } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

import { Typography, Button } from "@mui/material";
import MyBreadcrumbs from "../../components/CustomizedMUIComponents/MyBreadcrumbs";
import Link from "@mui/material/Link";

import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import MuiAlert from "@mui/material/Alert";
import { Snackbar } from "@mui/material";
import MySearchBox from "../../components/CustomizedMUIComponents/StyledSearchBox";
import EmployeeTable from "../../components/Employee/EmployeeList";
import DialogAddEmployee from "../../components/Employee/DialogAddEmployee";
import PropTypes from "prop-types";
import debounce from "lodash.debounce";
//Redux
import { useDispatch } from "react-redux";
import { getEmployeeAsync, addMultipleEmployeAsync } from "../../stores/employeeSlice";
import { getDepartmentAsync } from "../../stores/departmentSlice";
import DialogExportToExcel from "../../components/Employee/DialogExportToExcel";
import * as XLSX from "xlsx";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
import SnackbarFailed from "../../components/Snackbar/SnackbarFailed";
import SnackbarSuccess from "../../components/Snackbar/SnackbarSuccess";

export default function Employee() {
  const dispatch = useDispatch();
  const pathnames = location.pathname.split("/").filter((x) => x);
  const [isSbSuccessOpen, setSbSuccessOpen] = useState(false);
  const [isSbFailedOpen, setSbFailedOpen] = useState(false);
  const handleSbSuccessClose = () => {
    setSbSuccessOpen(false);
  };
  const handleSbFailedClose = () => {
    setSbFailedOpen(false);
  };

  const FileUploader = (props) => {
    const hiddenFileInput = React.useRef(null);

    const handleClick = (event) => {
      hiddenFileInput.current.click();
    };
    const handleChange = (event) => {
      const fileUploaded = event.target.files[0];
      props.handleFile(fileUploaded);
    };

    
    FileUploader.propTypes = {
      handleFile: PropTypes.any,
    };

    const handleFileUpload =  async (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      var jsonOut = {};
      reader.onload = (evt) => {
        /* Parse data */
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, { type: "binary" });
        /* Get first worksheet */
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        /* Convert array of arrays */
        jsonOut = XLSX.utils.sheet_to_json(ws,{raw:true});
        dispatch(addMultipleEmployeAsync(jsonOut))
        .unwrap()
        .then(() => {
          dispatch(getEmployeeAsync());
          setSbSuccessOpen(true);
        })
        .catch((rejectedValueOrSerializedError) => {
          setSbFailedOpen(true);
        })
      };
      reader.readAsBinaryString(file);;
    };

    return (
      <>
        <Button variant="outlined" onClick={handleClick}>
          <FileDownloadOutlinedIcon fontSize="medium" />
          <Typography variant="h6" sx={{ pl: 1 }}>
            Import
          </Typography>
        </Button>
        <input
          type="file"
          accept=".csv,.xlsx,.xls"
          ref={hiddenFileInput}
          onChange={handleFileUpload}
          style={{ display: "none" }}
        />
      </>
    );
  };
  // Add Employee Dialog
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isDialogExportEmployeeOpen, setDialogExportEmployeeOpen] =
    useState(false);
  // Working with Snackbar
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);
  // Working with search func
  const [searchQuery, setSearchQuery] = useState("");
  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const setDialogExportEmployeeClose = () => {
    setDialogExportEmployeeOpen(false);
  };
  const handleDialogClose = () => {
    setDialogOpen(false);
  };
  const handleSnackbarOpen = () => {
    setSnackbarOpen(true);
  };
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };
  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
    console.log("current searchQuery --> ", e.target.value);
  };
  const debounceFetchAPI = useCallback(
    debounce((searchQuery) => {
      dispatch(getEmployeeAsync({ searchQuery: searchQuery }));
    }, 350),
    []
  );
  useEffect(() => {
    debounceFetchAPI(searchQuery);
  }, [handleSearchQueryChange]);

  useEffect(() => {
    dispatch(getDepartmentAsync());
  }, []);
  return (
    <>
      <DialogExportToExcel
        isDialogOpen={isDialogExportEmployeeOpen}
        handleCloseDialog={setDialogExportEmployeeClose}
      />
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={isSnackbarOpen}
        autoHideDuration={2500}
        onClose={handleSnackbarClose}
        key={"top" + "right"}
        sx={{ mt: "5%" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Created new employee!
        </Alert>
      </Snackbar>

      <DialogAddEmployee
        isDialogOpen={isDialogOpen}
        setDialogOpen={setDialogOpen}
        handleCloseDialog={handleDialogClose}
        handleSnackbarOpen={handleSnackbarOpen}
      />
      <MyBreadcrumbs pathnames={pathnames} />

      <Grid
        container
        justifyContent="flex-end"
        textAlign={{ sm: "right", md: "center" }}
        padding={{ sm: 5, md: 0 }}
        sx={{ alignItems: "center" }}
      >
        <Grid item xs={12} sm={3} md={2} paddingTop={{ xs: 2, sm: 0 }}>
          <FileUploader />
        </Grid>

        <Grid item xs={12} sm={3} md={2}>
          <Button
            variant="outlined"
            onClick={() => setDialogExportEmployeeOpen(true)}
          >
            <FileUploadOutlinedIcon fontSize="medium" />
            <Typography variant="h6" sx={{ pl: 1 }}>
              Export
            </Typography>
          </Button>
        </Grid>

        <Grid item xs={12} sm={6} md={3} paddingTop={{ xs: 2, sm: 0, md: 0 }}>
          <Button variant="contained" onClick={() => handleDialogOpen()}>
            <Typography variant="h6">Add Employee</Typography>
          </Button>
        </Grid>
      </Grid>

      <Paper elevation={1} sx={{ my: 3, p: 3 }}>
        <MySearchBox
          placeholder="Search for employee..."
          handleSearchQueryChange={handleSearchQueryChange}
        />
      </Paper>

      <div>
      <SnackbarSuccess
        isOpen={isSbSuccessOpen}
        handleClose={handleSbSuccessClose}
        text={"Import Data Success"}
      />
      <SnackbarFailed
        isOpen={isSbFailedOpen}
        handleClose={handleSbFailedClose}
        text={"Import Data Failed"}
      />
        {/* {employeeList.length >= 1 ? (
          <EmployeeTable />
        ) : (
          <Typography>Employee list is empty</Typography>
        )} */}
        <EmployeeTable />
      </div>
    </>
  );
}
