import axios from "axios";
import { apiBaseUrl } from "../config/apiBaseUrl";
import authHeader from "./authHeader";
const API_URL = `${apiBaseUrl}/auth/`;

const signUp = (email, password) => {
  return axios.post(API_URL + "signup", {
    email,
    password,
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
const authService = {
  signUp,
  login,
  logout,
  changePassword,
};

export default authService;
