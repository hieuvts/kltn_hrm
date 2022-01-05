import React, { useRef, useState, useEffect } from "react";
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
import { dummyUser } from "../../utilities/dummyUser";

// const API_ENDPOINT = "http://localhost:8000";

// const MESSAGE_EVENT = "message";
// const JOIN_ROOM_EVENT = "joinRoom";
// const authHeaderValue = authHeader();
// const token = authHeaderValue["x-access-token"];
export default function ChatPanel({ chatRoomId, roomName, roomMessages }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const currentUser = useSelector((state) => state.cloneUser.currentUser);
  const [messageToSend, setMessageToSend] = useState("");
  const [frEmail, setFrEmail] = useState("");
  const roomId = chatRoomId; // Gets roomId from URL
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
    setMessageToSend("");
  };
  const socketRef = useRef();
  // Merge old message (from DB) and new messages (current chatting)
  let mergedMessages = [...roomMessages, ...messages];

  useEffect(() => {
    joinRoom(user.email, chatRoomId);
  }, []);
  // useEffect(() => {
  //   console.log("Update messages");
  //   newsad = [...roomMessages, ...messages];
  //   console.log("newsad ", newsad);
  // }, [messages]);
  return (
    <>
      <Box sx={rowDirection}>
        {/* <Avatar
          alt={user.username}
          src={user.avatar}
          sx={{ width: 50, height: 50, mr: 3 }}
        /> */}
        {console.log("currentUser ", currentUser)}
        <Typography variant="h5" sx={{ mb: 3 }}>
          {roomName}
        </Typography>
      </Box>
      <Divider variant="fullWidth" sx={{ borderBottomWidth: 4 }} />
      <Box sx={{ colDirection }}>
        <ul className="chatBox">
          {mergedMessages.map((message, index) => {
            return (
              <div className="message-chat" key={index}>
                <li
                  className={`message ${
                    message.sender === currentUser.email
                      ? "message-sent "
                      : "message-received"
                  }`}
                >
                  {!message.isBroadcast ? (
                    <div
                      className={`message ${
                        message.sender === currentUser.email
                          ? "message-sent "
                          : "message-received"
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
                        {message.sender !== currentUser.email && (
                          <div className="message-info">
                            <div className="message-username">
                              {message.sender}
                            </div>
                            <div className="message-role">admin</div>
                          </div>
                        )}
                        <div className="message-content">{message.message}</div>
                        <div className="message-time">
                          {moment(message.createdAt).format("ddd, hA")}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="message-broadcast">{message.message}</div>
                  )}
                </li>
              </div>
            );
          })}
        </ul>
        <Box sx={{ mt: 30 }}>
          <ChatMessageInput
            messageToSend={messageToSend}
            handleSendMessage={handleSendMessage}
          />
        </Box>
      </Box>
    </>
  );
}
ChatPanel.propTypes = {
  chatRoomId: PropTypes.string,
  roomName: PropTypes.array,
  roomMessages: PropTypes.array,
};
