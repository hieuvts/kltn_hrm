import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";

export default function CurrentClock() {
  const [currentTime, setCurrentTime] = useState(new Date());

  const clockTick = () => {
    setCurrentTime(new Date());
  };
  useEffect(() => {
    const timer = setInterval(clockTick, 1000);
    return function cleanUp() {
      clearInterval(timer);
    };
  }, []);
  return (
    <Typography variant="h5" sx={{ alignSelf: "center", mx: 5 }}>
      {currentTime.toLocaleTimeString("en-GB")}
    </Typography>
  );
}
