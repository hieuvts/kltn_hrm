import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";

import authHeader from "./authHeader";
import { socketIOEndPoint } from "../config/apiBaseUrl";

const MESSAGE_EVENT = "message";
const JOIN_ROOM_EVENT = "joinRoom";
const authHeaderValue = authHeader();
const token = authHeaderValue["x-access-token"];

export default function chatService(roomId) {
  const [messages, setMessages] = useState([]); // Sent and received messages
  const socketRef = useRef();

  useEffect(() => {
    // Creates a WebSocket connection
    socketRef.current = socketIOClient(socketIOEndPoint, {
      auth: { token },
      query: { roomId },
    });

    // Listens for incoming messages
    socketRef.current.on(MESSAGE_EVENT, (message) => {
      const incomingMessage = {
        ...message,
        ownedByCurrentUser: message.senderId === socketRef.current.id,
      };
      setMessages((messages) => [...messages, incomingMessage]);
    });
    // Destroys the socket reference
    // when the connection is closed
    return () => {
      socketRef.current.disconnect();
    };
  }, [roomId]);

  const joinRoom = (email, chatRoomId) => {
    console.log("invoke socketioservice joinRoom");
    socketRef.current.emit(JOIN_ROOM_EVENT, {
      email: email,
      chatRoomId: chatRoomId,
    });
  };
  // Sends a message to the server that
  // forwards it to all users in the same room
  const sendMessage = (messageBody) => {
    let senderId = socketRef.current.id;
    let messagePkg = { ...messageBody, senderId };
    socketRef.current.emit(MESSAGE_EVENT, messagePkg);
  };

  return { messages, joinRoom, sendMessage };
}
