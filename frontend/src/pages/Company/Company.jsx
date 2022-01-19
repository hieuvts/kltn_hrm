// Testing authorization services
import React, { useState, useEffect } from "react";
import { Typography, Button, Box, Link, Grid } from "@mui/material";
import MyBreadcrumbs from "../../components/CustomizedMUIComponents/MyBreadcrumbs";
import { rowDirection, colDirection } from "../../utilities/flexBoxStyle";
import { Navigate } from "react-router-dom";
import DialogDeleteCompany from "../../components/Company/DialogDeleteCompany";
import DialogUpdateCompany from "../../components/Company/DialogUpdateCompany";
import {
  getCompanyAsync,
  setCurrentSelectedCompany,
} from "../../stores/companySlice";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

export default function Company() {
  // const user = useSelector((state) => state.auth);
  const currentUserLocal = JSON.parse(localStorage.getItem("user"));
  const [isDialogDelCompanyOpen, setDialogDelCompanyOpen] = useState(false);
  const [isDialogUpdateCompanyOpen, setDialogUpdateCompanyOpen] =
    useState(false);
  const [selectedComp, setSelectedComp] = useState({});
  const dispatch = useDispatch();
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
  const company = useSelector((state) => state.company);
  useEffect(() => {
    dispatch(getCompanyAsync({ id: currentUserLocal.companyID }));
  }, []);
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
        <Grid item sm={12} md={6} sx={{ alignSelf: "start" }}>
          <Box sx={colDirection}>
            <Box sx={rowDirection}>
              <Typography>Company name</Typography>
              <Typography>{company.name}</Typography>
            </Box>
            <Box sx={rowDirection}>
              <Typography>Established date</Typography>
              <Typography>
                {moment(company.establishedDate).format("DD-MM-YYYY")}
              </Typography>
            </Box>
            <Box sx={rowDirection}>
              <Typography>Type</Typography>
              <Typography>{company.typeOfCompany}</Typography>
            </Box>
            <Box sx={rowDirection}>
              <Typography>Main business line</Typography>
              <Typography>{company.mainBusinessLines}</Typography>
            </Box>

            <Box sx={rowDirection}>
              <Typography>Tax code</Typography>
              <Typography>{company.taxCode}</Typography>
            </Box>
          </Box>
        </Grid>

        <Grid item sm={12} md={6} sx={{ alignSelf: "start", pr: 5 }}>
          <Box sx={colDirection}>
            <Box sx={rowDirection}>
              <Typography>Phone number</Typography>
              <Typography>{company.phoneNumber}</Typography>
            </Box>
            <Box sx={rowDirection}>
              <Typography>Fax</Typography>
              <Typography>{company.fax}</Typography>
            </Box>
            <Box sx={rowDirection}>
              <Typography>Address 1</Typography>
              <Typography>{company.address}</Typography>
            </Box>
            <Box sx={rowDirection}>
              <Typography>Address 2</Typography>
              <Typography>{company.address2}</Typography>
            </Box>
            <Box sx={rowDirection}>
              <Typography>Email</Typography>
              <Typography>{company.email}</Typography>
            </Box>
            <Box sx={rowDirection}>
              <Typography>Website</Typography>
              <Typography>{company.website}</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Box sx={{ width: "100%", textAlign: "right", mt: 5, pr: 5 }}>
        <Button
          variant="contained"
          onClick={() => {
            dispatch(setCurrentSelectedCompany(company));
            setDialogUpdateCompanyOpen(true);
          }}
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
