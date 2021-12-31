import React, { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import "./EmploymentHistory.css";
import gauge from "../../../assets/icons/gauge.png";
import { rowDirection, colDirection } from "../../../utilities/flexBoxStyle";

export default function EmploymentHistory() {
  const dispatch = useDispatch();
  const [isDialogUpdateEmployeeOpen, setDialogUpdateEmployee] = useState(false);

  var employee = (employee = useSelector(
    (state) => state.employee.currentSelectedEmployee
  ));

  const handleCloseDialogUpdateEmployee = () => {
    setDialogUpdateEmployee(false);
  };

  //   useEffect(() => {
  //     dispatch(getEmployeeAsync());
  //   }, []);

  const testData = [
    {
      role: "Staff",
      date: "20/12/2021",
      describe:
        "lorem ipsum dolor sit amet, consectertur adisplaing elit, spduedo a euismod tepor",
    },
    {
      role: "Manager",
      date: "01/01/2019",
      describe:
        "lorem ipsum dolor sit amet, consectertur adisplaing elit, spduedo a euismod tepor",
    },
    {
      role: "CEO",
      date: "01/01/2019",
      describe:
        "lorem ipsum dolor sit amet, consectertur adisplaing elit, spduedo a euismod tepor",
    },
    {
      role: "CEO",
      date: "01/01/2019",
      describe:
        "lorem ipsum dolor sit amet, consectertur adisplaing elit, spduedo a euismod tepor",
    },
  ];
  let joinedDate = moment(testData[0].date, "DD-MM-YYYY");
  let currentDate = moment(new Date());
  console.log("joinedDate ", joinedDate);
  console.log("currentDate ", currentDate);
  console.log(
    "duration: ",
    Math.ceil(moment.duration(currentDate.diff(joinedDate)).asDays())
  );
  return (
    <Paper elevation={3} sx={({ ...rowDirection }, { p: 3 })}>
      <Typography variant="h6" sx={{ alignSelf: "center" }}>
        Employment history
      </Typography>
      <Box sx={{ pt: 3 }}>
        <ul className="my_ul">
          {testData.map((data, index) => {
            return (
              <li className="my_li" key={index}>
                {data.role}
                <ul>
                  <li className="my_li_date">{data.date}</li>
                  <li className="my_li_detail">{data.describe}</li>
                </ul>
              </li>
            );
          })}
        </ul>
      </Box>
    </Paper>
  );
}
