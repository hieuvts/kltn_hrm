import axios from "axios";
import authHeader from "./authHeader";
import { apiBaseUrl } from "../config/apiBaseUrl";

const API_URL = `${apiBaseUrl}/chatRoomDetails/`;

const getQtyMemberInRoomID = (chatRoomId) => {
  return axios.get(API_URL + "getQty?id=" + chatRoomId, {
    headers: authHeader(),
  });
};
const chatRoomDetailsService = {
  getQtyMemberInRoomID,
};
export default chatRoomDetailsService;
