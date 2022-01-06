import axios from "axios";
import authHeader from "./authHeader";
import { apiBaseUrl } from "../config/apiBaseUrl";

const API_URL = `${apiBaseUrl}/user/`;

// Main purpose

const getAllUser = () => {
  return axios.get(API_URL + "getAll", { headers: authHeader() });
};
const getUser = (userId) => {
  return axios.get(API_URL + userId, { headers: authHeader() });
};
const changePassword = (userId) => {
  return axios.get(API_URL + userId + "/changePwd", { headers: authHeader() });
};
// const deleteUser = (userId) => {
//   return axios.get(API_URL + userId, { headers: authHeader() });
// };

// For testing auth services
const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getUserContent = () => {
  return axios.get(API_URL + "test/user", { headers: authHeader() });
};

const getModeratorContent = () => {
  return axios.get(API_URL + "test/mod", { headers: authHeader() });
};

const getAdminContent = () => {
  return axios.get(API_URL + "test/admin", { headers: authHeader() });
};

const userService = {
  getAllUser,
  getUser,
  changePassword,
  getPublicContent,
  getUserContent,
  getModeratorContent,
  getAdminContent,
};
export default userService;
