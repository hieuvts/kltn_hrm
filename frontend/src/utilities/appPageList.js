import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Apartment from "@mui/icons-material/Apartment";
import Engineering from "@mui/icons-material/Engineering";
import Mode from "@mui/icons-material/Mode";
import Error from "@mui/icons-material/Error";
import SearchIcon from "@mui/icons-material/Search";
import { VscProject } from "react-icons/vsc";

export const pageList = [
  {
    title: "Dashboard",
    key: "dashboard",
    path: "/dashboard",
    icon: <DashboardIcon />,
    className: "nav-text",
  },
  {
    title: "Employee",
    key: "employee",
    path: "/employee",
    icon: <Engineering />,
    className: "nav-text",
  },
  {
    title: "Department",
    path: "/department",
    key: "department",
    icon: <Apartment />,
    className: "nav-text",
  },
  {
    title: "Project",
    path: "/workplace",
    key: "project",
    icon: <VscProject />,
    className: "nav-text",
  },
  {
    title: "Others",
    path: "/others",
    key: "others",
    icon: <Mode />,
    className: "nav-text",
  },
  {
    title: "404",
    path: "/404",
    key: "404",
    icon: <Error />,
    className: "nav-text",
  },
];
