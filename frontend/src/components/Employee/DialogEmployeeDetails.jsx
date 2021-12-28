import React, { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import AppBar from "@mui/material/AppBar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import Paper from "@mui/material/Paper";
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@mui/material/Grid";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import PersonalInformation from "./EmployeeDetails/PersonalInformation";
import AboutMe from "./EmployeeDetails/AboutMe";
import EmployeeAvatar from "./EmployeeDetails/EmployeeAvatar";
import EffecientLevel from "./EmployeeDetails/EffecientLevel";
import EmploymentHistory from "./EmployeeDetails/EmploymentHistory";

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

export default function DialogEmployeeDetails({
  isDialogOpen,
  handleCloseDialog,
}) {
  const employee = useSelector(
    (state) => state.employee.currentSelectedEmployee
  );
  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <>
      <Dialog maxWidth={"xl"} open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h4" sx={{ pl: 3 }}>
              {employee.name}
            </Typography>
            <Button onClick={handleCloseDialog}>
              <CloseIcon fontSize="large" />
            </Button>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Grid container>
            <Grid item sm={12} sx={{ px: 4 }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs value={tabValue} onChange={handleTabChange}>
                  <LinkTab label="General" href="/all" />
                  <LinkTab label="Task" href="/task" />
                </Tabs>
              </Box>
            </Grid>
            <Grid item sm={12} lg={6}>
              <Box sx={{ m: 3 }}>
                <EmployeeAvatar />
              </Box>
              <Box sx={{ m: 3 }}>
                <EffecientLevel />
              </Box>
              <Box sx={{ m: 3 }}>
                <EmploymentHistory />
              </Box>
            </Grid>
            <Grid item sm={12} lg={6}>
              <Box sx={{ m: 3 }}>
                <PersonalInformation />
              </Box>
              <Box sx={{ m: 3 }}>
                <AboutMe />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
}

DialogEmployeeDetails.propTypes = {
  isDialogOpen: PropTypes.bool,
  handleCloseDialog: PropTypes.func,
};
