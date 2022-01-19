import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import Zoom from "@mui/material/Zoom";
import Fab from "@mui/material/Fab";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Divider from "@mui/material/Divider";
import AddIcon from "@mui/icons-material/Add";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
// import Tabs from "@mui/material/Tabs";
// import Tab from "@mui/material/Tab";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import avatarMale from "../../assets/icons/avatarMale.png";
import { useSelector, useDispatch } from "react-redux";
import { rowDirection, colDirection } from "../../utilities/flexBoxStyle";
import FriendList from "../../components/Chat/FriendList";
import ChatPanel from "../../components/Chat/ChatPanel";
import MySearchBox from "../../components/CustomizedMUIComponents/StyledSearchBox";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import {
  getChatRoomByAuthAccount,
  getAllAccount,
} from "../../stores/authSlice";
import {
  getQtyMemberInRoomID,
  createChatRoom,
} from "../../stores/chatRoomSlice";
import debounce from "lodash.debounce";
import SnackbarSuccess from "../../components/Snackbar/SnackbarSuccess";
import "./InternalChat.scss";

export default function InternalChat() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [value, setValue] = React.useState(0);
  const chatRooms = useSelector((state) => state.auth.chatRooms);
  const authAccountList = useSelector((state) => state.auth.authAccountList);
  const [searchQuery, setSearchQuery] = useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isSbSuccessOpen, setSbSuccessOpen] = useState(false);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleSbSuccessClose = () => {
    setSbSuccessOpen(false);
  };
  const dispatch = useDispatch();

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // const handleGetAllChatRoom = () => {
  //   dispatch(getChatRoomByAuthAccount({ id: user.id }));
  // };
  const handleGetQtyMemberInRoom = () => {
    dispatch(getQtyMemberInRoomID({ chatRoomId: value + 1 }));
  };

  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const debounceFetchAPI = useCallback(
    debounce((searchQuery) => {
      dispatch(
        getChatRoomByAuthAccount({ searchQuery: searchQuery, id: user.id })
      );
    }, 350),
    []
  );

  const handleCreateChatRoom = (userEmail, userID) => {
    dispatch(
      createChatRoom({
        name: userEmail,
        thatMemberID: userID,
        thisMemberID: user.id,
      })
    )
      .unwrap()
      .then(() => {
        console.log("line 94", searchQuery);
        setSbSuccessOpen(true);
        handleClose();
        dispatch(debounceFetchAPI(" "));
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    debounceFetchAPI(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    console.log("Get all room message");
    debounceFetchAPI(searchQuery);
    handleGetQtyMemberInRoom();
  }, [value]);
  useEffect(() => {
    dispatch(getAllAccount({ searchQuery: "" }));
  }, []);

  return (
    <div className="chatContainer">
      <SnackbarSuccess
        isOpen={isSbSuccessOpen}
        handleClose={handleSbSuccessClose}
        text={"Created new chatroom"}
      />
      <Tabs>
        <TabList>
          <div className="friendSearch">
            <MySearchBox
              placeholder="Search for chat..."
              handleSearchQueryChange={handleSearchQueryChange}
            />
          </div>
          {chatRooms.map((room, index) => (
            <Tab
              key={index}
              onClick={(e) => {
                handleChange(e, index);
              }}
            >
              <ListItem component={"div"}>
                <ListItemAvatar sx={{ alignSelf: "center" }}>
                  <Avatar
                    alt={room.name}
                    src={avatarMale}
                    sx={{ width: 50, height: 50, mr: 3 }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <React.Fragment>
                      <Typography variant="body1">{room.name}</Typography>
                    </React.Fragment>
                  }
                  secondary={
                    <React.Fragment>
                      {(typeof room.ChatMessages !== "undefined") &
                        (room.ChatMessages.length >= 1) && (
                        <Typography
                          component={"span"}
                          variant="body2"
                          sx={{ color: "#000000" }}
                        >
                          {room.ChatMessages.slice(-1)[0].sender === user.email
                            ? "You"
                            : room.ChatMessages.slice(-1)[0].sender}

                          {room.ChatMessages.slice(-1)[0].message.slice(-30)}
                        </Typography>
                      )}
                    </React.Fragment>
                  }
                />
              </ListItem>
            </Tab>
          ))}
          <div className="createChat">
            <Fab
              size="small"
              color="primary"
              aria-label="add"
              sx={{ alignSelft: "end" }}
              onClick={handleMenu}
            >
              <AddIcon />
            </Fab>
          </div>
        </TabList>

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
              minWidth: "18rem",
              maxWidth: "18rem",
            }}
          >
            <Typography variant="body1" sx={{ mt: 1, ml: 1 }}>
              Start conversation with
            </Typography>
            <Divider />
            <div>
              {authAccountList.map((account, index) => {
                if (account.email !== user.email) {
                  return (
                    <div key={index}>
                      <MenuItem
                        sx={{ pb: 1, minWidth: "18rem" }}
                        onClick={() =>
                          handleCreateChatRoom(account.email, account.id)
                        }
                      >
                        {account.email !== user.email && (
                          <Typography variant="body1">
                            {account.email}
                          </Typography>
                        )}
                      </MenuItem>
                      {index < authAccountList.length - 1 && <Divider />}
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </Menu>
        {chatRooms.map((room, index) => (
          <TabPanel key={index} value={value} index={index}>
            <ChatPanel
              chatRoomId={room.id}
              roomName={room.name}
              totalMember={3}
              roomMessages={room.ChatMessages}
              sx={{ m: 0, p: 0 }}
            />
          </TabPanel>
        ))}
      </Tabs>
    </div>
  );
}
