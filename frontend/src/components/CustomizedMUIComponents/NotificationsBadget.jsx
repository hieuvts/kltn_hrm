import React, { useState } from "react";
import Badge from "@mui/material/Badge";
import Stack from "@mui/material/Stack";
import MailIcon from "@mui/icons-material/Mail";
import { Link } from "react-router-dom";

import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import {
  markNotifAsRead,
  deleteAllNotif,
  getNotif,
} from "../../stores/notifSlice";
import PropTypes from "prop-types";
import { Typography } from "@mui/material";
import "./customNotifBadget.scss";

export default function NotificationBadget({
  notificationCount,
  notificationList,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMarkAllAsRead = () => {
    dispatch();
  };
  const handleMarkOneAsRead = (notifID) => {
    dispatch(markNotifAsRead({ id: notifID }));
  };
  const handleDeleteAllNotif = () => {
    dispatch(deleteAllNotif({ authAccountID: currentUser.id }))
      .unwrap()
      .then(() => dispatch(getNotif({ authAccountID: currentUser.id })));
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
        <div
          style={{
            maxHeight: "20rem",
            minWidth: "25rem",
            maxWidth: "25rem",
          }}
        >
          <Typography variant="body1" sx={{ mt: 1, ml: 1 }}>
            Notification
          </Typography>
          <Divider />
          <div>
            {notificationList.map((notif, index) => {
              return (
                <div key={index}>
                  <MenuItem
                    onClick={() => {
                      handleMarkOneAsRead(notif.id);
                    }}
                    sx={{ pb: 1, minWidth: "25rem" }}
                  >
                    <Typography
                      variant="body1"
                      className={`${notif.isRead && "readNotif"}`}
                    >
                      {notif.event}
                    </Typography>
                  </MenuItem>
                  {index < notificationList.length - 1 && <Divider />}
                </div>
              );
            })}
          </div>
          <Box sx={{ display: "flex", justifyContent: "end", mt: "auto" }}>
            <Button
              variant="link"
              sx={{ fontSize: "0.6rem" }}
              onClick={handleDeleteAllNotif}
            >
              <ClearAllIcon />
            </Button>
          </Box>
        </div>
      </Menu>
    </>
  );
}

NotificationBadget.propTypes = {
  notificationCount: PropTypes.number,
  notificationList: PropTypes.array,
};
NotificationBadget.defaultProps = {
  notificationCount: 1,
};
