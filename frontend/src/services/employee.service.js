import http from "../utilities/axiosConfig";

class EmployeeDataService {
  getAll(search) {
    return http.get(`/employee/getAll?search=${search}`);
  }
}

export default new EmployeeDataService();
