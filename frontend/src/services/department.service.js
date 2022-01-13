import axios from "axios";
import authHeader from "./authHeader";
import { apiBaseUrl } from "../config/apiBaseUrl";

const API_URL = `${apiBaseUrl}/department/`;

const getAllDepartment = () => {
  return axios.get(API_URL + "get", {
    headers: authHeader(),
  });
};
const addDepartment = (department) => {
  return axios.post(API_URL + "create", department, {
    headers: authHeader(),
  });
};

const updateDepartment = (departmentId, department) => {
  return axios.put(API_URL + "/update?id=" + departmentId, department, {
    headers: authHeader(),
  });
};
const deleteDepartment = (departmentId) => {
  return axios.delete(API_URL + "/delete?id=" + departmentId, {
    headers: authHeader(),
  });
};

const departmentService = {
  getAllDepartment,
  addDepartment,
  updateDepartment,
  deleteDepartment,
};
export default departmentService;
