import axios from "axios";
import authHeader from "./authHeader";
import { apiBaseUrl } from "../config/apiBaseUrl";

const API_URL = `${apiBaseUrl}/empKpiCluster/`;


const importCSVData = () => {
    return axios.post(API_URL + "importCSV", {
        headers: authHeader(),
      });
}

const employeeKpiClusterService = {
    importCSVData,
};
export default employeeKpiClusterService;
