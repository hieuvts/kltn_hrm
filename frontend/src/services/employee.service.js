import axios from "axios";
import authHeader from "./authHeader";
import { apiBaseUrl } from "../config/apiBaseUrl";

const API_URL = `${apiBaseUrl}/employee/`;

const getAllEmployee = (searchQuery) => {
  return axios.get(API_URL + "get?search=" + searchQuery, {
    headers: authHeader(),
  });
};
const addEmployee = (employee) => {
  return axios.post(API_URL + "create", employee, {
    headers: authHeader(),
  });
};

const updateEmployee = (employeeId, employee) => {
  delete employee.id;
  return axios.put(API_URL + "/update?id=" + employeeId, employee, {
    headers: authHeader(),
  });
};
const deleteEmployee = (employeeId) => {
  return axios.delete(API_URL + "/delete?id=" + employeeId, {
    headers: authHeader(),
  });
};
const addMultipleEmploye = (employees) => {
  return axios.post(API_URL + "importFromExcel"  ,employees, {
    headers: authHeader(),
  });
}

const employeeService = {
  getAllEmployee,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  addMultipleEmploye
};
export default employeeService;
