// Testing authorization services
import React, { useState, useEffect } from "react";
import {
  Typography,
  Button,
  Box,
  Breadcrumbs,
  Link,
  Grid,
  Divider,
  Paper,
} from "@mui/material";
import { rowDirection, colDirection } from "../../utilities/flexBoxStyle";
import MyBreadcrumbs from "../../components/CustomizedMUIComponents/MyBreadcrumbs";
import { useSelector, useDispatch } from "react-redux";
import DialogChangeUserPwd from "../../components/UserProfile/DialogChangeUserPwd";
import DialogUpdateEmployee from "../../components/Employee/DialogUpdateEmployee";
import { setCurrentSelectedEmployee } from "../../stores/employeeSlice";
import { getAccountInfoByID } from "../../stores/authSlice";
import { getDepartmentAsync } from "../../stores/departmentSlice";

export default function UserProfile() {
  const [isDialogChangeUserPwdOpen, setDialogChangeUserPwd] = useState(false);
  const [isDialogUpdateEmployeeOpen, setDialogUpdateEmployee] = useState(false);


  const handleDialogChangeUserPwdClose = () => {
    setDialogChangeUserPwd(false);
  };
  const handleDialogUpdateEmployeeClose = () => {
    setDialogUpdateEmployee(false);
  };
  const dispatch = useDispatch();
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const user = useSelector((state) => state.auth.user);
  const departments = useSelector((state) => state.department.departmentList);

  useEffect(() => {
    dispatch(getAccountInfoByID({ id: currentUser.id }));
    dispatch(getDepartmentAsync());
  }, []);

  const pathnames = location.pathname.split("/").filter((x) => x);
  return (
    <>
      <DialogChangeUserPwd
        isDialogOpen={isDialogChangeUserPwdOpen}
        handleCloseDialog={handleDialogChangeUserPwdClose}
      />
      <DialogUpdateEmployee
        isDialogOpen={isDialogUpdateEmployeeOpen}
        handleCloseDialog={handleDialogUpdateEmployeeClose}
      />
      <MyBreadcrumbs pathnames={pathnames} />
      <Grid
        container
        justifyContent="space-between"
        textAlign="center"
        padding={{ sm: 5, md: 0 }}
        rowSpacing={3}
        columnSpacing={3}
        sx={{ alignItems: "center", mt: 3 }}
      >
        <Grid item sm={12} md={6} sx={{ alignSelf: "start" }}>
          <Box sx={colDirection}>
            <Paper elevation={2} sx={{ m: 1, p: 3 }}>
              <Typography variant="h5" sx={{ textAlign: "left" }}>
                User profile
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Box sx={rowDirection}>
                <Typography variant="h6">Email</Typography>
                <Typography>{user.email}</Typography>
              </Box>
              <Box sx={rowDirection}>
                <Typography variant="h6">Privilege</Typography>
                {user.privilege}
              </Box>
              <Box sx={{ mt: 3, textAlign: "right" }}>
                <Button
                  variant="contained"
                  onClick={() => setDialogChangeUserPwd(true)}
                >
                  Change Password
                </Button>
              </Box>
            </Paper>
          </Box>
        </Grid>

        <Grid item sm={12} md={6} sx={{ alignSelf: "start" }}>
          <Paper elevation={2} sx={{ m: 1, p: 3 }}>
            <Typography variant="h5" sx={{ textAlign: "left" }}>
              Employee information
            </Typography>
            <Divider sx={{ my: 1 }} />
            <Box sx={rowDirection}>
              <Typography variant="h6">Full name </Typography>
              <Typography>
                {user.employee.fname} {user.employee.lname}
              </Typography>
            </Box>
            <Box sx={rowDirection}>
              <Typography variant="h6">Gender </Typography>
              <Typography>{user.employee.gender}</Typography>
            </Box>
            <Box sx={rowDirection}>
              <Typography variant="h6">Departments </Typography>

              <Typography>
                {departments.map((department) => {
                  if (department.id === user.employee.departmentID) {
                    return department.name;
                  }
                })}
              </Typography>
            </Box>

            <Box sx={{ mt: 3, textAlign: "right" }}>
              <Button
                variant="contained"
                onClick={() => {
                  dispatch(
                    setCurrentSelectedEmployee({
                      currentSelectedEmployee: user.employee,
                    })
                  );
                  setDialogUpdateEmployee(true);
                }}
              >
                Update
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
