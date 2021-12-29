import React, { useState } from "react";
import { Tabs, Tab } from "@mui/material";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";

import SignUp from "../../components/Authentication/SignUp";
import Login from "../../components/Authentication/Login";

export default function Authentication() {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const tabStyle = {
    width: "100%",
    textAlign: "center",
    alignItems: "center",
    alignContents: "center",
  };

  function TabPanel({ children, value, index, other }) {
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box>{children}</Box>}
      </div>
    );
  }
  TabPanel.propTypes = {
    children: PropTypes.object,
    other: PropTypes.object,
    value: PropTypes.number,
    index: PropTypes.number,
  };

  return (
    <Box sx={{ marginX: { sm: 15, md: 30 } }}>
      <Tabs
        value={value}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
        aria-label="disabled tabs example"
        centered
      >
        <Tab label="Login" style={tabStyle} />
        <Tab label="Signup" style={tabStyle} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Login handleChange={handleChange} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <SignUp handleChange={handleChange} />
      </TabPanel>
      {/* <Routes>
        <Route path="/login/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes> */}
    </Box>
  );
}
