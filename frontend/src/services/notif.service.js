import axios from "axios";
import authHeader from "./authHeader";
import { apiBaseUrl } from "../config/apiBaseUrl";

const API_URL = `${apiBaseUrl}/notif/`;

const getNotif = (authAccountID) => {
  return axios.get(API_URL + "get?id=" + authAccountID, {
    headers: authHeader(),
  });
};

const markNotifAsRead = (notifID) => {
  return axios.put(
    API_URL + "/update/?id=" + notifID,
    { isRead: true },
    {
      headers: authHeader(),
    }
  );
};
const deleteNotif = (notifId) => {
  return axios.delete(API_URL + "/delete/?id=" + notifId, {
    headers: authHeader(),
  });
};
// delete all notif of specified account
const deleteAllNotif = (authAccountID) => {
  return axios.delete(API_URL + "/deleteAll/?id=" + authAccountID, {
    headers: authHeader(),
  });
};

const notifService = {
  getNotif,
  markNotifAsRead,
  deleteNotif,
  deleteAllNotif,
};
export default notifService;
