import React, { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";
import RepeatIcon from "@mui/icons-material/Repeat";
import BadgeIcon from "@mui/icons-material/Badge";
import ReportIcon from "@mui/icons-material/Report";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import gauge from "../../../assets/icons/gauge.png";
import { rowDirection, colDirection } from "../../../utilities/flexBoxStyle";
import FastfoodIcon from "@mui/icons-material/Fastfood";
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
        {employee.EmploymentHistories.length > 0 ? (
          <Timeline position="right">
            {employee.EmploymentHistories.map((data, index) => {
              return (
                <TimelineItem key={index}>
                  <TimelineOppositeContent
                    sx={{ m: "auto 0" }}
                    style={{ flex: 0.1 }}
                    align="right"
                    variant="body2"
                    color="text.secondary"
                  >
                    {moment(data.date).format("DD/MM/YYYY")}
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineConnector />
                    <TimelineDot color="primary">
                      {data.eventType === "Department changed" ? (
                        <RepeatIcon />
                      ) : data.eventType === "Position changed" ? (
                        <StarOutlineIcon />
                      ) : (
                        <ModeEditIcon />
                      )}
                    </TimelineDot>
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent sx={{ py: "12px", px: 2 }}>
                    <Typography variant="h6" component="span">
                      {data.eventType}
                    </Typography>
                    <Typography>{data.event}</Typography>
                  </TimelineContent>
                </TimelineItem>
              );
            })}
          </Timeline>
        ) : (
          <Typography variant="h6">Not found any data!!!</Typography>
        )}
      </Box>
    </Paper>
  );
}
