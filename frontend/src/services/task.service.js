import axios from "axios";
import authHeader from "./authHeader";
import { apiBaseUrl } from "../config/apiBaseUrl";

const API_URL = `${apiBaseUrl}/task/`;

const getAllTask = (searchQuery) => {
  return axios.get(API_URL + "getAll?search=" + searchQuery, {
    headers: authHeader(),
  });
};
const addTask = (task) => {
  return axios.post(API_URL + "create", task, {
    headers: authHeader(),
  });
};

const updateTask = (taskId, task) => {
  return axios.put(API_URL + taskId + "/update", task, {
    headers: authHeader(),
  });
};
const deleteTask = (taskId) => {
  return axios.delete(
    API_URL + taskId + "/delete",
    { _id: taskId },
    {
      headers: authHeader(),
    }
  );
};

const taskService = {
  getAllTask,
  addTask,
  updateTask,
  deleteTask,
};
export default taskService;
