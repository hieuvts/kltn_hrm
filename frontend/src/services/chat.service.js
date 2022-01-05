import axios from "axios";
import authHeader from "./authHeader";
import { apiBaseUrl } from "../config/apiBaseUrl";

const API_URL = `${apiBaseUrl}/chat/`;

const getAllMessage = (searchQuery) => {
  return axios.get(API_URL + "getAll?search=" + searchQuery, {
    headers: authHeader(),
  });
};
const addMessage = (employee) => {
  return axios.post(API_URL + "create", employee, {
    headers: authHeader(),
  });
};

const updateMessage = (employeeId, employee) => {
  return axios.put(API_URL + employeeId + "/update", employee, {
    headers: authHeader(),
  });
};
const deleteMessage = (employeeId) => {
  return axios.delete(
    API_URL + employeeId + "/delete",
    { _id: employeeId },
    {
      headers: authHeader(),
    }
  );
};

const chatService = {
  getAllMessage,
  addMessage,
  updateMessage,
  deleteMessage,
};
export default chatService;
