import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Button from "@mui/material/Button";

import avatarMale from "../../assets/icons/avatarMale.png";
import { useSelector, useDispatch } from "react-redux";
import { rowDirection, colDirection } from "../../utilities/flexBoxStyle";
import FriendList from "../../components/Chat/FriendList";
import ChatPanel from "../../components/Chat/ChatPanel";
import { getUser } from "../../stores/userSlice";
import { getAllChatRoom } from "../../stores/chatRoomSlice";
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
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
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
  const user = JSON.parse(localStorage.getItem("user"));

  const [value, setValue] = React.useState(0);
  const chatRoom = useSelector((state) => state.chatRoom);
  const dispatch = useDispatch();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleGetAllChatRoom = () => {
    dispatch(getAllChatRoom());
  };
  useEffect(() => {
    handleGetAllChatRoom();
    dispatch(getUser({ userId: user.id }));
  }, []);
  return (
    <Grid container direction="row" columnSpacing={3}>
      <Grid item xs={3}>
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
            {chatRoom.map((room, index) => (
              <Tab
                key={index}
                label={
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar sx={{ alignSelf: "center" }}>
                      <Avatar
                        alt={room.name}
                        src={avatarMale}
                        sx={{ width: 50, height: 50, mr: 3 }}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={room.name}
                      secondary={
                        <React.Fragment>
                          <Typography
                            variant="caption"
                            sx={{ textTransform: "none" }}
                          >
                            {"..."}
                            {room.messages.slice(-1)[0].message.slice(-30)}
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
      <Grid item xs={9}>
        {chatRoom.map((room, index) => (
          <TabPanel key={index} value={value} index={index}>
            <span>
              <ChatPanel
                chatRoomId={room._id}
                roomName={room.name}
                roomMessages={room.messages}
              />
            </span>
          </TabPanel>
        ))}
      </Grid>
    </Grid>
  );
}
