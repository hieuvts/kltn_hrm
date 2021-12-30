import axios from "axios";
import { apiBaseUrl } from "../config/apiBaseUrl";
const API_URL = `${apiBaseUrl}/auth/`;

const register = (username, email, password) => {
  return axios.post(API_URL + "signup", {
    email,
    password,
  });
};

const login = (email, password) => {
  return axios
    .post(API_URL + "login", { email, password })
    .then((res) => {
      if (res.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(res.data.accessToken));
      }
      return res.data;
    })
    .catch((error) => console.log("auth.service ", error));
};

const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
