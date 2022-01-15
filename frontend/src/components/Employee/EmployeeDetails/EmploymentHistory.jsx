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
  const employee = useSelector(
    (state) => state.employee.currentSelectedEmployee
  );
  const [isDialogUpdateEmployeeOpen, setDialogUpdateEmployee] = useState(false);

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
          {employee.EmploymentHistories.map((data, index) => {
            return (
              <TimelineItem key={index}>
                <TimelineOppositeContent
                  sx={{ m: "auto 0" }}
                  align="right"
                  variant="body2"
                  color="text.secondary"
                >
                  {moment(data.date).format("DD/MM/YYYY")}
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
                    Placeholder
                  </Typography>
                  <Typography>{data.event}</Typography>
                </TimelineContent>
              </TimelineItem>
            );
          })}
        </Timeline>
      </Box>
    </Paper>
  );
}
