import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";

import authHeader from "./authHeader";
const API_ENDPOINT = "http://localhost:8000";

const MESSAGE_EVENT = "message";
const JOIN_ROOM_EVENT = "joinRoom";
const authHeaderValue = authHeader();
const token = authHeaderValue["x-access-token"];

export default function chatService(roomId) {
  const [messages, setMessages] = useState([]); // Sent and received messages
  const socketRef = useRef();

  useEffect(() => {
    // Creates a WebSocket connection
    socketRef.current = socketIOClient(API_ENDPOINT, {
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
    socketRef.current.on("hello", (message) => {
      console.log("broadcast from server");
    });

    // Destroys the socket reference
    // when the connection is closed
    return () => {
      socketRef.current.disconnect();
    };
  }, [roomId]);

  const joinRoom = () => {
    socketRef.current.emit(JOIN_ROOM_EVENT, { username: "hieu", room: "test" });
  };
  // Sends a message to the server that
  // forwards it to all users in the same room
  const sendMessage = (message) => {
    socketRef.current.emit(MESSAGE_EVENT, {
      message: message,
      senderId: socketRef.current.id,
    });
  };

  return { messages, joinRoom, sendMessage };
}
