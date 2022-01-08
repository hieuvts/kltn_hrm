// Testing authorization services
import React, { useState } from "react";
import {
  Typography,
  Button,
  Box,
  Link,
  Grid,
} from "@mui/material";
import MyBreadcrumbs from "../../components/CustomizedMUIComponents/MyBreadcrumbs";
import { rowDirection, colDirection } from "../../utilities/flexBoxStyle";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import DialogDeleteCompany from "../../components/Company/DialogDeleteCompany";
import DialogUpdateCompany from "../../components/Company/DialogUpdateCompany";

export default function Company() {
  // const user = useSelector((state) => state.auth);
  // const currentUser = user.currentUser;
  const [isDialogDelCompanyOpen, setDialogDelCompanyOpen] = useState(false);
  const [isDialogUpdateCompanyOpen, setDialogUpdateCompanyOpen] =
    useState(false);
  const handleDialogDelCompanyClose = () => {
    setDialogDelCompanyOpen(false);
  };
  const handleDialogUpdateCompanyClose = () => {
    setDialogUpdateCompanyOpen(false);
  };
  const { user: currentUser } = useSelector((state) => state.auth);

  if (!currentUser.email) {
    console.log("!currentUser", currentUser);
    return <Navigate to="/login" />;
  } else {
    console.log("currentUser", currentUser);
  }
  const pathnames = location.pathname.split("/").filter((x) => x);
  return (
    <>
      <DialogDeleteCompany
        isDialogOpen={isDialogDelCompanyOpen}
        handleCloseDialog={handleDialogDelCompanyClose}
      />
      <DialogUpdateCompany
        isDialogOpen={isDialogUpdateCompanyOpen}
        handleCloseDialog={handleDialogUpdateCompanyClose}
      />
      <MyBreadcrumbs pathnames={pathnames} />
      
      <Grid
        container
        justifyContent="space-between"
        textAlign="center"
        padding={{ sm: 5, md: 0 }}
        rowSpacing={3}
        columnSpacing={3}
        sx={{ alignItems: "center" }}
      >
        <Grid item xs={12}>
          Company banner
        </Grid>
        <Grid item sm={12} md={6} sx={{ alignSelf: "start" }}>
          <Box sx={colDirection}>
            <Box sx={rowDirection}>
              <Typography>Company name:</Typography>
              <Typography>HRM</Typography>
            </Box>
            <Box sx={rowDirection}>
              <Typography>Established date:</Typography>
              <Typography>01/01/2021</Typography>
            </Box>
            <Box sx={rowDirection}>
              <Typography>Type:</Typography>
              <Typography>Joint-stock companies</Typography>
            </Box>
            <Box sx={rowDirection}>
              <Typography>Owners:</Typography>
              <Typography>Joint-stock companies</Typography>
            </Box>
            <Box sx={rowDirection}>
              <Typography>Main business lines:</Typography>
              <Typography>Computer Development</Typography>
            </Box>
            <Box sx={rowDirection}>
              <Typography>Tax code:</Typography>
              <Typography>1234567890</Typography>
            </Box>
          </Box>
        </Grid>

        <Grid item sm={12} md={6} sx={{ alignSelf: "start" }}>
          <Box sx={colDirection}>
            <Box sx={rowDirection}>
              <Typography>Phone number:</Typography>
              <Typography>0359545405</Typography>
            </Box>
            <Box sx={rowDirection}>
              <Typography>Fax:</Typography>
              <Typography>0359545405</Typography>
            </Box>
            <Box sx={rowDirection}>
              <Typography>Address 1:</Typography>
              <Typography>Dong Nai, Viet Nam</Typography>
            </Box>
            <Box sx={rowDirection}>
              <Typography>Address 2:</Typography>
              <Typography></Typography>
            </Box>
            <Box sx={rowDirection}>
              <Typography>Email:</Typography>
              <Typography>a@a.com</Typography>
            </Box>
            <Box sx={rowDirection}>
              <Typography>Website:</Typography>
              <Typography>aa.com</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Box sx={{ width: "100%", textAlign: "right", mt: 5 }}>
        <Button
          variant="contained"
          onClick={() => setDialogUpdateCompanyOpen(true)}
          sx={{ mx: 3 }}
        >
          Update
        </Button>
        <Button
          color="warning"
          variant="outlined"
          onClick={() => setDialogDelCompanyOpen(true)}
        >
          Delete
        </Button>
      </Box>
    </>
  );
}
