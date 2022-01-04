import React from "react";
import PropTypes from "prop-types";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import InputAdornment from "@mui/material/InputAdornment";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ListItemButton from "@mui/material/ListItemButton";

import moment from "moment";
import { rowDirection, colDirection } from "../../utilities/flexBoxStyle";
import chatService from "../../services/chatService";
import { StyledBadge } from "../../components/StyledBadget";
import ChatMessageInput from "./ChatMessageInput";
import avatarFemale from "../../assets/icons/avatarFemale.png";
import avatarMale from "../../assets/icons/avatarMale.png";

import "./ChatPanel.css";
export default function ChatPanel({ user }) {
  const roomId = "test"; // Gets roomId from URL
  // Creates a websocket and manages messaging
  const { messages, joinRoom, sendMessage } = chatService(roomId);
  // Message to be sent
  const [newMessage, setNewMessage] = React.useState("");

  const handleSendMessage = (values) => {
    sendMessage(values.message);
    setNewMessage("");
  };

  return (
    <>
      <Box sx={rowDirection}>
        {/* <Avatar
          alt={user.username}
          src={user.avatar}
          sx={{ width: 50, height: 50, mr: 3 }}
        /> */}
        <Typography variant="h5" sx={{ mb: 3 }}>
          {user.username}
        </Typography>
        <Button variant="contained" onClick={joinRoom}>
          Connect to chat server
        </Button>
      </Box>
      <Divider variant="fullWidth" sx={{ borderBottomWidth: 4 }} />
      <Box sx={{ colDirection }}>
        <ul className="chatBox">
          {messages.map((message, index) => {
            let createdAt = moment(message.createdAt).format("ddd, hA");
            let messageContent = message.message;
            let isOwned = message.ownedByCurrentUser;
            let isBroadcast = message.isBroadcast;
            return (
              <div className="message-chat" key={index}>
                <li
                  className={`message ${
                    isOwned ? "message-sent " : "message-received"
                  }`}
                >
                  {!isBroadcast ? (
                    <div
                      className={`message ${
                        isOwned ? "message-sent " : "message-received"
                      }`}
                    >
                      <StyledBadge
                        overlap="circular"
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "right",
                        }}
                        variant="dot"
                      >
                        <Avatar alt="U" src={avatarFemale} sx={{ mx: 1 }} />
                      </StyledBadge>
                      <div className="message-bubble">
                        {!isOwned && (
                          <div className="message-info">
                            <div className="message-username">Username</div>
                            <div className="message-role">admin</div>
                          </div>
                        )}
                        <div className="message-content">{messageContent}</div>
                        <div className="message-time">{createdAt}</div>
                      </div>
                    </div>
                  ) : (
                    <div className="message-broadcast">{messageContent}</div>
                  )}
                </li>
              </div>
            );
          })}
        </ul>
        <Box sx={{ mt: 30 }}>
          <ChatMessageInput
            newMessage={newMessage}
            handleSendMessage={handleSendMessage}
          />
        </Box>
      </Box>
    </>
  );
}
ChatPanel.propTypes = {
  user: PropTypes.object,
};
