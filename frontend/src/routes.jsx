import React from "react";

function Dashboard() {
  return <h1>Dashboard</h1>;
}
function Employee() {
  return <h1>Employee</h1>;
}
function Department() {
  return <h1>Department</h1>;
}
function Others() {
  return <h1>Others</h1>;
}

const Routes = [
  {
    path: "/",
    sidebarName: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/",
    sidebarName: "Employee",
    component: Employee,
  },
  {
    path: "/",
    sidebarName: "Department",
    component: Department,
  },
  {
    path: "/",
    sidebarName: "Others",
    component: Others,
  },
];

export default Routes;
