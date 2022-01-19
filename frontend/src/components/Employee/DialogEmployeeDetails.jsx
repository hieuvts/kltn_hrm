import React, { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@mui/material/Grid";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import PropTypes from "prop-types";
import PersonalInformation from "./EmployeeDetails/PersonalInformation";
import AboutMe from "./EmployeeDetails/AboutMe";
import EmployeeAvatar from "./EmployeeDetails/EmployeeAvatar";
import EffecientLevel from "./EmployeeDetails/EffecientLevel";
import EmploymentHistory from "./EmployeeDetails/EmploymentHistory";
import { useSelector } from "react-redux";
import EmpProjectList from "./EmployeeProjects/EmpProjectList";
import EmpTaskList from "./EmployeeProjects/EmpTaskList";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
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
      <Dialog maxWidth="lg" open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h4" sx={{ pl: 3 }}>
              {employee.name}
            </Typography>
            <Button onClick={handleCloseDialog}>
              <CloseIcon fontSize="large" />
            </Button>
          </Box>
          <Grid item sm={12} sx={{ px: 4 }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs value={tabValue} onChange={handleTabChange}>
                <Tab label="General" {...a11yProps(0)} />
                <Tab label="Task" {...a11yProps(1)} />
              </Tabs>
            </Box>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <Grid container>
            {/* General employee info */}
            <TabPanel value={tabValue} index={0}>
              <Grid
                container
                sx={{
                  minWidth: "65vw",
                  maxWidth: "65vw",
                  maxHeight: "70vh",
                  minHeight: "70vh",
                }}
              >
                <Grid item sm={12} lg={6}>
                  <Box sx={{ m: 3 }}>
                    <PersonalInformation />
                  </Box>
                </Grid>
                <Grid item sm={12} lg={6}>
                  <Box sx={{ m: 3 }}>
                    <AboutMe />
                  </Box>
                  <Box sx={{ m: 3 }}>
                    <EmploymentHistory />
                  </Box>
                </Grid>
              </Grid>
            </TabPanel>

            {/* Employees' projects, tasks */}
            <TabPanel value={tabValue} index={1}>
              <Grid
                container
                sx={{
                  minWidth: "65vw",
                  maxWidth: "65vw",
                  maxHeight: "70vh",
                  minHeight: "70vh",
                }}
              >
                <Grid item sm={12} lg={12}>
                  <Typography variant="h6" sx={{ ml: 3 }}>
                    {employee.fname + " " + employee.lname}{" "}
                    {" is working on these projects"}
                  </Typography>
                  <Box sx={{ m: 3 }}>
                    <EmpTaskList />
                  </Box>
                </Grid>
              </Grid>
            </TabPanel>
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
