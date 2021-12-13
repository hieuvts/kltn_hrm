import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import BackgroundImg from "../assets/images/404NotFoundBanner.jpg";

import "./404NotFound.css";

const styles = {
  paperContainer: {
    height: "100vh",
    backgroundImage: `url(${BackgroundImg})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
  },
};
export default function NotFound() {
  return (
    <div style={styles.paperContainer}>
      <Button
        sx={{ mt: "30%", ml: "5%" }}
        component="a"
        startIcon={<ArrowBackIcon fontSize="small" />}
        variant="contained"
        href="/"
      >
        Go back to Dashboard
      </Button>
    </div>
  );
}
