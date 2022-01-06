import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Apartment from "@mui/icons-material/Apartment";
import Engineering from "@mui/icons-material/Engineering";
import Mode from "@mui/icons-material/Mode";
import ChatIcon from '@mui/icons-material/Chat';
import Error from "@mui/icons-material/Error";
import AssignmentIcon from '@mui/icons-material/Assignment';
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
    path: "/project",
    key: "project",
    icon: <VscProject />,
    className: "nav-text",
  },
  {
    title: "Task",
    path: "/workplace",
    key: "workplace",
    icon: <AssignmentIcon />,
    className: "nav-text",
  },
  {
    title: "Internal Chat",
    path: "/chat",
    key: "chat",
    icon: <ChatIcon />,
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
