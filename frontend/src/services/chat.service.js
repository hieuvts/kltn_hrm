import axios from "axios";
import authHeader from "./authHeader";
import { apiBaseUrl } from "../config/apiBaseUrl";

const API_URL = `${apiBaseUrl}/chat/`;

const getAllChatRoom = (searchQuery) => {
  return axios.get(API_URL + "getAll?search=" + searchQuery, {
    headers: authHeader(),
  });
};

const getChatRoomInfo = (chatRoomId) => {
  return axios.get(API_URL + chatRoomId, {
    headers: authHeader(),
  });
};

const getChatMessage = (chatRoomId) => {
  return axios.get(API_URL + chatRoomId + "/getMsg", {
    headers: authHeader(),
  });
};
const addMessageToRoom = (chatRoomId, message) => {
  return axios.post(API_URL + chatRoomId + "/addMsg", message, {
    headers: authHeader(),
  });
};
// members: ['61d1e81fc580ba64fa2faf0b', '61d579da5cc2556e252bf8d5' ],
// name: 'Public Chat 4',
// messages: [ {sender: 'hieu@gmail.com',
// 	message: 'Hello Vinh',
// 	isBroadcast: false}]
const createChatRoom = (chatRoomInfo) => {
  return axios.put(API_URL + "/createChatRoom", chatRoomInfo, {
    headers: authHeader(),
  });
};

const chatService = {
  getAllChatRoom,
  getChatMessage,
  getChatRoomInfo,
  createChatRoom,
  addMessageToRoom,
};
export default chatService;
