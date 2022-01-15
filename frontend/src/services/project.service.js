import axios from "axios";
import authHeader from "./authHeader";
import { apiBaseUrl } from "../config/apiBaseUrl";

const API_URL = `${apiBaseUrl}/project/`;

const getAllProject = (searchQuery) => {
  return axios.get(API_URL + "get?search=" + searchQuery, {
    headers: authHeader(),
  });
};
const addProject = (project) => {
  return axios.post(API_URL + "create", project, {
    headers: authHeader(),
  });
};

const updateProject = (projectId, project) => {
  return axios.put(API_URL + "/update/?id=" + projectId, project, {
    headers: authHeader(),
  });
};
const deleteProject = (projectId) => {
  return axios.delete(API_URL + "/delete/?id=" + projectId, {
    headers: authHeader(),
  });
};

const projectService = {
  getAllProject,
  addProject,
  updateProject,
  deleteProject,
};
export default projectService;
