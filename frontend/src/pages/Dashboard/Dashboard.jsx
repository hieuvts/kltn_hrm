import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import UserService from "../../services/user.service";

export default function Dashboard() {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getAdminContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  return (
    <div>
      <Typography variant="h4">Dashboard page</Typography>
      <Typography variant="h4">Role: {content}</Typography>
    </div>
  );
}
