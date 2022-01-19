import axios from "axios";
import { apiBaseUrl } from "../config/apiBaseUrl";
import authHeader from "./authHeader";
const API_URL = `${apiBaseUrl}/auth/`;

const signUp = (email, password, privilege, companyID) => {
  return axios.post(API_URL + "signup", {
    email,
    password,
    privilege,
    companyID,
  });
};

const login = (email, password) => {
  return axios.post(API_URL + "login", { email, password }).then((res) => {
    if (res.data.accessToken) {
      localStorage.setItem("user", JSON.stringify(res.data));
    }
    return res.data;
  });
};

const logout = () => {
  localStorage.removeItem("user");
};
const changePassword = (body) => {
  return axios.post(API_URL + "changePwd", body, { headers: authHeader() });
};

const getChatRoomByAuthAccount = (authAccountID, searchQuery) => {
  return axios.get(
    API_URL + "getChatRooms?id=" + authAccountID + "&search=" + searchQuery
  );
};

const getAllAccount = (searchQuery) => {
  return axios.get(API_URL + "getAllAccount?search=" + searchQuery);
};
const getAccountInfoByID = (authAccountID) => {
  return axios.get(API_URL + "getAccountInfoByID?id=" + authAccountID);
};
const deleteAccount = (authAccountID) => {
  return axios.delete(API_URL + "delete?id=" + authAccountID);
};
const authService = {
  signUp,
  login,
  logout,
  getChatRoomByAuthAccount,
  getAccountInfoByID,
  getAllAccount,
  deleteAccount,
  changePassword,
};

export default authService;
