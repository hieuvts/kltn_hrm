import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import SendIcon from "@mui/icons-material/Send";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import socketIOClient from "socket.io-client";
import { useSelector } from "react-redux";
import { rowDirection, colDirection } from "../../utilities/flexBoxStyle";
import FriendList from "../../components/Chat/FriendList";
import ChatPanel from "../../components/Chat/ChatPanel";

import { dummyUser } from "../../utilities/dummyUser";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
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
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function InternalChat() {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid container direction="row" columnSpacing={3}>
      <Grid item xs={4}>
        <Box xs={{ colDirection }}>
          {/* <FriendList /> */}
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1, borderColor: "divider" }}
          >
            {dummyUser.map((user, index) => (
              <Tab
                key={index}
                label={
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar sx={{ alignSelf: "center" }}>
                      <Avatar
                        alt={user.name}
                        src={user.avatar}
                        sx={{ width: 50, height: 50, mr: 3 }}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={user.name}
                      secondary={
                        <React.Fragment>
                          <Typography
                            variant="caption"
                            sx={{ textTransform: "none" }}
                          >
                            {"..."}
                            {user.message.slice(-30)}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                }
                {...a11yProps(index)}
              />
            ))}
          </Tabs>
        </Box>
      </Grid>
      <Grid item xs={8}>
        {/* <ChatPanel /> */}
        {dummyUser.map((user, index) => (
          <TabPanel key={index} value={value} index={index}>
            {user.message}
          </TabPanel>
        ))}
      </Grid>
    </Grid>
  );
}
