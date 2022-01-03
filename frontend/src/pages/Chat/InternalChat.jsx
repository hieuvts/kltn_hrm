import React, { useState, useEffect } from "react";
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

const ENDPOINT = "http://localhost:8000";

export default function InternalChat() {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [response, setResponse] = useState("");
  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("FromAPI", (data) => {
      setResponse(data);
    });
  }, []);
  return (
    <Grid container direction="row" columnSpacing={3}>
      <Typography variant="h5">Time is: {response}</Typography>
      <Grid item xs={4}>
        <Box>
          <Typography variant="h5">Internal Chat</Typography>
        </Box>
        <Box xs={{ colDirection }}>
          <FriendList />
        </Box>
      </Grid>
      <Grid item xs={8}>
        <ChatPanel />
      </Grid>
    </Grid>
  );
}
