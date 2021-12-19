import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import employeeSlice from "./employeeSlice";

export const employeeApi = createApi({
  reducerPath: "employeeApi",

  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api/employee" }),
  endpoints: (builder) => ({
    getAllEmployee: builder.query({
      query: (name) => `/getAll/${name}`,
    }),
  }),
});

export const { useGetEmployeeQuery } = employeeApi;
