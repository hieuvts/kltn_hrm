import React from "react";
import { useGetEmployeeQuery } from "../stores/employeeSlice_RTK";

export default function Others() {
  const { data, error, isLoading } = useGetEmployeeQuery("hieu pham");
  return (
    <div>
      <h1>Others page</h1>
    </div>
  );
}
