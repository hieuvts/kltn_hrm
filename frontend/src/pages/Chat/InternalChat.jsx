import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import Zoom from "@mui/material/Zoom";
import Fab from "@mui/material/Fab";
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
import { getChatRoomByAuthAccount } from "../../stores/authSlice";
import { getQtyMemberInRoomID } from "../../stores/chatRoomSlice";
import debounce from "lodash.debounce";

import "./InternalChat.scss";

export default function InternalChat() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [value, setValue] = React.useState(0);
  const chatRooms = useSelector((state) => state.auth.chatRooms);
  const [searchQuery, setSearchQuery] = useState("");

  const dispatch = useDispatch();
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
  useEffect(() => {
    debounceFetchAPI(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    console.log("Get all room message");
    debounceFetchAPI(searchQuery);
    handleGetQtyMemberInRoom();
  }, [value]);

  return (
    <div className="chatContainer">
      <Tabs>
        <TabList>
          <div className="friendSearch">
            <MySearchBox
              placeholder="Search for employee..."
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
            >
              <AddIcon />
            </Fab>
          </div>
        </TabList>

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
