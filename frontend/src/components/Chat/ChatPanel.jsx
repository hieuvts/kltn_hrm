import React, { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import Avatar from "@mui/material/Avatar";

import { getUser } from "../../stores/userSlice";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import socketIOService from "../../services/socketIO.service";
import { StyledBadge } from "../../components/StyledBadget";
import ChatMessageInput from "./ChatMessageInput";
import avatarFemale from "../../assets/icons/avatarFemale.png";
import avatarMale from "../../assets/icons/avatarMale.png";
import { getChatMessage, addMessageToRoom } from "../../stores/chatRoomSlice";

import "./chatPanel.scss";

export default function ChatPanel({
  chatRoomId,
  totalMember,
  roomName,
  roomMessages,
}) {
  const user = JSON.parse(localStorage.getItem("user"));
  const currentUser = useSelector((state) => state.user.currentUser);
  const roomId = chatRoomId; // Gets roomId from URL
  const [messageToSend, setMessageToSend] = useState("");
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
        <div className="totalMember">
          {totalMember} {"members"}
        </div>
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
                      <div className="messageContent">{message.message}</div>
                      <div className="time">
                        {moment(message.createdAt).format("ddd, hA")}
                      </div>
                    </div>
                  </div>
                )}
                <AlwaysScrollToBottom />
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
