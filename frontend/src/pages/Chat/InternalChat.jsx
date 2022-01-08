import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
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
import { getUser } from "../../stores/userSlice";
import { getAllChatRoom } from "../../stores/chatRoomSlice";
import StyledSearchBox from "../../components/CustomizedMUIComponents/StyledSearchBox";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "./internalChat.scss";

export default function InternalChat() {
  const user = JSON.parse(localStorage.getItem("user"));
  const currentUser = useSelector((state) => state.user.currentUser);
  const [value, setValue] = React.useState(0);
  const chatRoom = useSelector((state) => state.chatRoom);
  const [selectedTab, setSelectedTab] = useState(0);
  const dispatch = useDispatch();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleGetAllChatRoom = () => {
    dispatch(getAllChatRoom());
  };
  useEffect(() => {
    console.log("Get all room message");
    handleGetAllChatRoom();
    dispatch(getUser({ userId: user.id }));
  }, [value, setSelectedTab]);
  // useEffect(() => {}, []);
  return (
    <div className="chatContainer">
      <Tabs>
        <TabList>
          <div className="friendSearch">
            <StyledSearchBox placeholder="Search for chat..." />
          </div>
          {currentUser.chatRooms.map((room, index) => (
            <Tab key={index} onClick={() => setSelectedTab(index)}>
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
                      {(typeof room.messages !== "undefined") &
                        (room.messages.length >= 1) && (
                        <Typography component={"span"} variant="body2">
                          {room.messages.slice(-1)[0].sender === user.email
                            ? "You"
                            : room.messages.slice(-1)[0].sender}
                          {": "}
                          {room.messages.slice(-1)[0].message.slice(-30)}
                        </Typography>
                      )}
                    </React.Fragment>
                  }
                />
              </ListItem>
            </Tab>
          ))}
        </TabList>

        {currentUser.chatRooms.map((room, index) => (
          <TabPanel key={index} value={value} index={index}>
            <ChatPanel
              chatRoomId={room._id}
              roomName={room.name}
              totalMember={room.members.length}
              roomMessages={room.messages}
              sx={{ m: 0, p: 0 }}
            />
          </TabPanel>
        ))}
      </Tabs>
    </div>
  );
}
