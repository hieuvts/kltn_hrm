import axios from "axios";
import authHeader from "./authHeader";
import { apiBaseUrl } from "../config/apiBaseUrl";

const API_URL = `${apiBaseUrl}/empAchv/`;

const addEmployeeAchievement = (employee) => {
  return axios.post(API_URL + "create", employee, {
    headers: authHeader(),
  });
};

const updateEmployeeAchievement = (employeeId, employee) => {
  delete employee.id;
  return axios.put(API_URL + "/update?id=" + employeeId, employee, {
    headers: authHeader(),
  });
};
const deleteEmployeeAchievement = (employeeId) => {
  return axios.delete(API_URL + "/delete?id=" + employeeId, {
    headers: authHeader(),
  });
};

const employeeAchievementService = {
  addEmployeeAchievement,
  updateEmployeeAchievement,
  deleteEmployeeAchievement,
};
export default employeeAchievementService;
