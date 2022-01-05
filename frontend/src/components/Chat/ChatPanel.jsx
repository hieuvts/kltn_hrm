import React, { useState, useEffect } from "react";
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
import socketIOClient from "socket.io-client";

import { getUser } from "../../stores/userSlice";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { rowDirection, colDirection } from "../../utilities/flexBoxStyle";
import socketIOService from "../../services/socketIO.service";
import { StyledBadge } from "../../components/StyledBadget";
import ChatMessageInput from "./ChatMessageInput";
import avatarFemale from "../../assets/icons/avatarFemale.png";
import avatarMale from "../../assets/icons/avatarMale.png";
import { getChatMessage, addMessageToRoom } from "../../stores/chatRoomSlice";

import "./ChatPanel.css";
export default function ChatPanel() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const chatRoom = useSelector((state) => state.chatRoom);
  const [newMessage, setNewMessage] = useState("");
  const [frEmail, setFrEmail] = useState("");
  const roomId = "test"; // Gets roomId from URL
  // Creates a websocket and manages messaging
  const { messages, joinRoom, sendMessage } = socketIOService(roomId);
  const dispatch = useDispatch();

  const handleSendMessage = (values) => {
    let messageBody = {
      sender: currentUser.email,
      message: values.message,
      isBroadcast: false,
    };
    sendMessage(messageBody);
    setNewMessage("");
  };
  const handleFetchMessage = () => {
    dispatch(getChatMessage({ chatRoomId: currentUser.chatRooms[0] }));
  };
  console.log("chatRoom data ", chatRoom);
  return (
    <>
      <Box sx={rowDirection}>
        {/* <Avatar
          alt={user.username}
          src={user.avatar}
          sx={{ width: 50, height: 50, mr: 3 }}
        /> */}
        <Typography variant="h5" sx={{ mb: 3 }}>
          {currentUser.employee.fname + currentUser.employee.lname}
        </Typography>
        <Button variant="contained" onClick={handleFetchMessage}>
          Pull message
        </Button>
        <TextField
          label="frEmail"
          name="frEmail"
          id="frEmail"
          variant="outlined"
          placeholder={frEmail}
          onChange={(e) => setFrEmail(e.target.value)}
        ></TextField>
        <Button variant="contained" onClick={joinRoom}>
          Connect to {frEmail}
        </Button>
      </Box>
      <Divider variant="fullWidth" sx={{ borderBottomWidth: 4 }} />
      <Box sx={{ colDirection }}>
        <ul className="chatBox">
          {chatRoom.messages.map((value, index) => {
            let createdAt = moment(value.createdAt).format("ddd, hA");
            let messageContent = value.message;
            let isOwned = value.ownedByCurrentUser;
            let isBroadcast = value.isBroadcast;
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
