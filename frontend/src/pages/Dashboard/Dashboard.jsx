import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import { useDispatch } from "react-redux";
import { getChatRoomByAuthAccount } from "../../stores/authSlice";
export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();

  return (
    <div>
      <Typography variant="h4">Dashboard page</Typography>
    </div>
  );
}
