import React from "react";
import Badge from "@mui/material/Badge";
import Stack from "@mui/material/Stack";
import MailIcon from "@mui/icons-material/Mail";
import PropTypes from "prop-types";

export default function NotificationBadget({ notificationCount }) {
  return (
    <>
      <Stack spacing={2} direction="row" sx={{ ml: 3, alignItems: "center" }}>
        <Badge badgeContent={notificationCount} color="secondary">
          <MailIcon color="white" />
        </Badge>
      </Stack>
    </>
  );
}

NotificationBadget.propTypes = {
  notificationCount: PropTypes.number,
};
NotificationBadget.defaultProps = {
  notificationCount: 1,
};
