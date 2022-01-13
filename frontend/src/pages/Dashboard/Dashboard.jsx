import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";

export default function Dashboard() {
  const [content, setContent] = useState("");

  return (
    <div>
      <Typography variant="h4">Dashboard page</Typography>
    </div>
  );
}
