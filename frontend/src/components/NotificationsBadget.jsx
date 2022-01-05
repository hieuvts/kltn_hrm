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

import PropTypes from "prop-types";

export default function NotificationBadget({ notificationCount }) {
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
        <Link to="/" style={{ textDecoration: "none", color: "black" }}>
          <MenuItem
            onClick={() => {
              handleClose();
            }}
          >
            Show all
          </MenuItem>
        </Link>
      </Menu>
    </>
  );
}

NotificationBadget.propTypes = {
  notificationCount: PropTypes.number,
};
NotificationBadget.defaultProps = {
  notificationCount: 1,
};
