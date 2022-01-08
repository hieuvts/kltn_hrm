import React, { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
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

import "./chatPanel.scss";
import { dummyUser } from "../../utilities/dummyUser";

// const API_ENDPOINT = "http://localhost:8000";

// const MESSAGE_EVENT = "message";
// const JOIN_ROOM_EVENT = "joinRoom";
// const authHeaderValue = authHeader();
// const token = authHeaderValue["x-access-token"];
export default function ChatPanel({
  chatRoomId,
  totalMember,
  roomName,
  roomMessages,
}) {
  const user = JSON.parse(localStorage.getItem("user"));
  const currentUser = useSelector((state) => state.user.currentUser);
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
    // window.scrollTo(0, document.body.scrollHeight);
  };
  // const messagesEndRef = useRef(null);
  // const scrollToBottom = () => {
  //   messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  // };
  // useEffect(scrollToBottom, [messages]);
  const AlwaysScrollToBottom = () => {
    const elementRef = useRef();
    useEffect(() => elementRef.current.scrollIntoView());
    return <div ref={elementRef} />;
  };
  // Merge old message (from DB) and new messages (current chatting)
  let mergedMessages = [...roomMessages, ...messages];

  useEffect(() => {
    joinRoom(user.email, chatRoomId);
  }, []);

  return (
    <div className="chatBox">
      <div className="title">
        <div className="chatRoomName">{roomName}</div>
        <div className="totalMember">{totalMember}</div>
      </div>
      <div className="content">
        <ul>
          {mergedMessages.map((message, index) => {
            return (
              <li
                key={index}
                className={`messageList ${
                  message.sender === currentUser.email ? "sent" : "received"
                }`}
              >
                {message.isBroadcast ? (
                  <div className="broadcast">{message.message}</div>
                ) : (
                  <div
                    className={`message ${
                      message.sender === currentUser.email ? "sent" : "received"
                    }`}
                  >
                    <div className="avatar">
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
                    </div>

                    <div
                      className={`bubble ${
                        message.sender === currentUser.email
                          ? "sent"
                          : "received"
                      }`}
                    >
                      {message.sender !== currentUser.email && (
                        <div className="info">
                          <div className="username">{message.sender}</div>
                          <div className="role">admin</div>
                        </div>
                      )}
                      <div className="content">{message.message}</div>
                      <div className="time">
                        {moment(message.createdAt).format("ddd, hA")}
                      </div>
                    </div>
                  </div>
                )}
                {/* <AlwaysScrollToBottom /> */}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="textFieldSender">
        <ChatMessageInput handleSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}
ChatPanel.propTypes = {
  chatRoomId: PropTypes.string,
  totalMember: PropTypes.number,
  roomName: PropTypes.string,
  roomMessages: PropTypes.array,
};
