import axios from "axios";
import authHeader from "./authHeader";
import { apiBaseUrl } from "../config/apiBaseUrl";

const API_URL = `${apiBaseUrl}/company/`;

const getAllCompany = (searchQuery) => {
  return axios.get(API_URL + "get?search=" + searchQuery, {
    headers: authHeader(),
  });
};
const addCompany = (Company) => {
  return axios.post(API_URL + "create", Company, {
    headers: authHeader(),
  });
};

const updateCompany = (CompanyId, Company) => {
  return axios.put(API_URL + "/update/?id=" + CompanyId, Company, {
    headers: authHeader(),
  });
};
const deleteCompany = (CompanyId) => {
  return axios.delete(API_URL + "/delete/?id=" + CompanyId, {
    headers: authHeader(),
  });
};

const companyService = {
  getAllCompany,
  addCompany,
  updateCompany,
  deleteCompany,
};
export default companyService;
