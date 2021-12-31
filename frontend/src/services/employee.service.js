import axios from "axios";
import authHeader from "./authHeader";
import { apiBaseUrl } from "../config/apiBaseUrl";

const API_URL = `${apiBaseUrl}/employee/`;

const getAllEmployee = (searchQuery) => {
  return axios.get(API_URL + "getAll?search=" + searchQuery, {
    headers: authHeader(),
  });
};
const addEmployee = (employee) => {
  return axios.post(API_URL + "create", employee, {
    headers: authHeader(),
  });
};

const updateEmployee = (employeeId, employee) => {
  return axios.patch(API_URL + employeeId + "/update", employee, {
    headers: authHeader(),
  });
};
const deleteEmployee = (employeeId) => {
  return axios.delete(
    API_URL + employeeId + "/delete",
    { _id: employeeId },
    {
      headers: authHeader(),
    }
  );
};

const employeeService = {
  getAllEmployee,
  addEmployee,
  updateEmployee,
  deleteEmployee,
};
export default employeeService;
