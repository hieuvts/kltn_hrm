import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";

import Rating from "@mui/material/Rating";
import DialogTitle from "@mui/material/DialogTitle";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Divider from "@mui/material/Divider";

import { useSelector, useDispatch } from "react-redux";
import { getEmployeeAsync } from "../../../stores/employeeSlice";
import { getProjectAsync } from "../../../stores/projectSlice";
import DialogUpdateEmploee from "../DialogUpdateEmployee";

import moment from "moment";

export default function EmpTaskList() {
  const employee = useSelector(
    (state) => state.employee.currentSelectedEmployee
  );
  const departments = useSelector((state) => state.department.departmentList);
  const projects = useSelector((state) => state.project.projectList);
  const dispatch = useDispatch();
  const [isDialogUpdateEmployeeOpen, setDialogUpdateEmployee] = useState(false);
  const handleCloseDialogUpdateEmployee = () => {
    setDialogUpdateEmployee(false);
  };
  useEffect(() => {
    dispatch(getEmployeeAsync());
    dispatch(getProjectAsync());
  }, []);
  return (
    <>
      <DialogUpdateEmploee
        isDialogOpen={isDialogUpdateEmployeeOpen}
        handleCloseDialog={handleCloseDialogUpdateEmployee}
      />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="task table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Project</TableCell>
              <TableCell align="left">Task</TableCell>
              <TableCell align="left">Priority</TableCell>
              <TableCell align="left">Status</TableCell>
              <TableCell align="left">Due date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employee.Tasks.map((task, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left">
                  {projects.map((proj) => {
                    if (proj.id == task.projectID) {
                      return proj.name;
                    }
                  })}
                </TableCell>
                <TableCell align="left">{task.name}</TableCell>
                <TableCell align="left">
                  <Rating
                    name="task-priority"
                    value={task.priority}
                    readOnly
                    size="small"
                  />
                </TableCell>
                <TableCell align="left">
                  {task.status === "Finish" ? (
                    <Chip
                      label={task.status}
                      variant="contained"
                      color="success"
                    />
                  ) : task.status === "Pending" ? (
                    <Chip
                      label={task.status}
                      variant="outlined"
                      color="error"
                    />
                  ) : (
                    <Chip
                      label={task.status}
                      variant="outlined"
                      color="primary"
                    />
                  )}
                </TableCell>
                <TableCell align="left">
                  {moment(task.dueDate).format("DD-MM-YYYY")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
