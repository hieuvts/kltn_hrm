import React, { useState, useEffect,useCallback } from "react";
import Typography from "@mui/material/Typography";
import { useDispatch } from "react-redux";
import debounce from "lodash.debounce";
import { getChatRoomByAuthAccount } from "../../stores/authSlice";
import { getEmployeeKpiCluster } from "../../stores/employeeKpiClusterSlice";
import {getDepartmentAsync} from "../../stores/departmentSlice";
import EmployeeKpiClusterList from "../../components/Employee/EmployeeKpiCluster/EmployeKpiClusterList"; 
export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("get chat with user.id ", user.id);
    dispatch(getChatRoomByAuthAccount({ id: user.id }));
  }, []);
  useEffect(() => {
    dispatch(getDepartmentAsync());
  }, []);
  const debounceFetchAPI = useCallback(
    debounce((searchQuery) => {
      dispatch(getEmployeeKpiCluster());
    }, 350),
    []
  );
  useEffect(() => {
    debounceFetchAPI();
  });

  return (
    <div>
      <Typography variant="h4">Dashboard page</Typography>
      <EmployeeKpiClusterList/ >
    </div>
  );
}
