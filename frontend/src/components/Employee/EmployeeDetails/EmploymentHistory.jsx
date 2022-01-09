import React, { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import gauge from "../../../assets/icons/gauge.png";
import { rowDirection, colDirection } from "../../../utilities/flexBoxStyle";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import BadgeIcon from "@mui/icons-material/Badge";
import PersonIcon from "@mui/icons-material/Person";
export default function EmploymentHistory() {
  const [isDialogUpdateEmployeeOpen, setDialogUpdateEmployee] = useState(false);

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
      <Box
        sx={{
          pt: 3,
          alignItems: "start",
          alignContent: "start",
          alignSelf: "start",
          textAlign: "left",
        }}
      >
        <Timeline position="right">
          {testData.map((data, index) => {
            return (
              <TimelineItem key={index}>
                <TimelineOppositeContent
                  sx={{ m: "auto 0" }}
                  align="right"
                  variant="body2"
                  color="text.secondary"
                >
                  {data.date}
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineConnector />
                  <TimelineDot color="primary" variant="outlined">
                    <PersonIcon />
                  </TimelineDot>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent sx={{ py: "12px", px: 2 }}>
                  <Typography variant="h6" component="span">
                    {data.role}
                  </Typography>
                  <Typography>{data.describe}</Typography>
                </TimelineContent>
              </TimelineItem>
            );
          })}
        </Timeline>
      </Box>
    </Paper>
  );
}
