import React from "react";
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
import { rowDirection, colDirection } from "../../../utilities/flexBoxStyle";

import gauge from "../../../assets/icons/gauge.png";
import { textAlign } from "@mui/system";

export default function EffecientLevel() {
  const employee = useSelector(
    (state) => state.employee.currentSelectedEmployee
  );
  
  return (
    <Paper
      elevation={3}
      sx={({ ...rowDirection }, { p: 3, textAlign: "center" })}
    >
      <Typography variant="h5" sx={{ textAlign: "left" }}>
        Effecient meter
      </Typography>
      <img src={gauge} width="200px" height="200px"></img>
    </Paper>
  );
}
