import React, { useState } from "react";
import Badge from "@mui/material/Badge";
import Stack from "@mui/material/Stack";
import MailIcon from "@mui/icons-material/Mail";
import { Link } from "react-router-dom";

import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import PropTypes from "prop-types";
import { Typography } from "@mui/material";

export default function NotificationBadget({
  notificationCount,
  notificationList,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Stack spacing={2} direction="row" sx={{ ml: 3, alignItems: "center" }}>
        <Badge
          badgeContent={notificationCount}
          color="secondary"
          onClick={handleMenu}
        >
          <MailIcon color="white" />
        </Badge>
      </Stack>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {notificationList.map((notif, index) => {
          return (
            <>
              <MenuItem
                key={index}
                onClick={() => {
                  handleClose();
                }}
                sx={{ pb: 1 }}
              >
                <Typography variant="body1">{notif.event}</Typography>
              </MenuItem>
              {index < notificationList.length - 1 && <Divider />}
            </>
          );
        })}
        <Box sx={{ display: "flex", justifyContent: "end", mt: 1 }}>
          <Button variant="link" sx={{ fontSize: "0.6rem" }}>
            Mark all as read
          </Button>
        </Box>
      </Menu>
    </>
  );
}

NotificationBadget.propTypes = {
  notificationCount: PropTypes.number,
  notificationList: PropTypes.arr,
};
NotificationBadget.defaultProps = {
  notificationCount: 1,
};
