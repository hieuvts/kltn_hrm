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
import StyledSearchBox from "../../components/StyledSearchBox";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "./tabStyles.scss";
import "./InternalChat.scss";
// function TabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`vertical-tabpanel-${index}`}
//       aria-labelledby={`vertical-tab-${index}`}
//       {...other}
//     >
//       {value === index && <div>{children}</div>}
//     </div>
//   );
// }

// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.number.isRequired,
//   value: PropTypes.number.isRequired,
// };

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function InternalChat() {
  const user = JSON.parse(localStorage.getItem("user"));
  const currentUser = useSelector((state) => state.user.currentUser);
  const [value, setValue] = React.useState(0);
  const chatRoom = useSelector((state) => state.chatRoom);
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
  }, [value]);

  return (
    // <div className="chatContainer">
    //   <div className="chatSideBar">
    //     <div className="friendSearch">col1 row1</div>
    //     <div className="chatRoomList">
    //       <div className="chatRoom">chatRoom 1</div>
    //       <div className="chatRoom">chatRoom 2</div>
    //     </div>
    //   </div>
    //   <div className="chatPanel">
    //     <div className="chatPanelTitle">
    //       <div className="chatRoomName">KLTN</div>
    //       <div className="totalMember">4 members</div>
    //     </div>
    //     <div className="chatPanelContent">col2 row2</div>
    //   </div>
    // </div>
    <div className="chatContainer">
      <Tabs>
        <TabList>
          <div className="friendSearch">
            <StyledSearchBox placeholder="Search for chat..." />
          </div>
          {currentUser.chatRooms.map((room, index) => (
            <Tab key={index}>
              <ListItem alignItems="start" >
                <ListItemAvatar sx={{ alignSelf: "center" }}>
                  <Avatar
                    alt={room.name}
                    src={avatarMale}
                    sx={{ width: 50, height: 50, mr: 3 }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={<Typography variant="body1">{room.name}</Typography>}
                  secondary={
                    <React.Fragment>
                      <Typography
                        variant="body2"
                        sx={{ textTransform: "none" }}
                      >
                        {(typeof room.messages !== "undefined") &
                          (room.messages.length >= 1) && (
                          <Typography variant="body2">
                            {room.messages.slice(-1)[0].sender === user.email
                              ? "You"
                              : room.messages.slice(-1)[0].sender}
                            {": "}
                            {room.messages.slice(-1)[0].message.slice(-30)}
                          </Typography>
                        )}
                      </Typography>
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

    // <Grid
    //   container
    //   direction="row"
    //   style={{ minHeight: `calc(100vh - 128px)` }}
    // >
    //   <Grid item xs={3} direction="column" sx={{ height: "100%" }}>
    //     <Grid item xs={2} sx={{ mb: 1 }}>
    //       <Paper sx={{ minHeight: 80 }}>
    //         <StyledSearchBox placeholder="Search…" />
    //       </Paper>
    //     </Grid>
    //     <Grid item xs={10}>
    //       <Paper>
    //         <Tabs
    //           orientation="vertical"
    //           variant="scrollable"
    //           value={value}
    //           onChange={handleChange}
    //           aria-label="Vertical tabs example"
    //           TabIndicatorProps={{
    //             sx: {
    //               backgroundColor: "primary",
    //             },
    //           }}
    //           sx={{ borderRight: 1, borderColor: "divider" }}
    //         >
    //           {currentUser.chatRooms.map((room, index) => (
    //             <Tab
    //               key={index}
    //               label={
    //                 <ListItem alignItems="flex-start">
    //                   <ListItemAvatar sx={{ alignSelf: "center" }}>
    //                     <Avatar
    //                       alt={room.name}
    //                       src={avatarMale}
    //                       sx={{ width: 50, height: 50, mr: 3 }}
    //                     />
    //                   </ListItemAvatar>
    //                   <ListItemText
    //                     primary={room.name}
    //                     secondary={
    //                       <React.Fragment>
    //                         <Typography
    //                           variant="caption"
    //                           sx={{ textTransform: "none" }}
    //                         >
    //                           {(typeof room.messages !== "undefined") &
    //                             (room.messages.length >= 1) && (
    //                             <Typography variant="body1">
    //                               {room.messages.slice(-1)[0].sender ===
    //                               user.email
    //                                 ? "You"
    //                                 : room.messages.slice(-1)[0].sender}
    //                               {": "}
    //                               {room.messages
    //                                 .slice(-1)[0]
    //                                 .message.slice(-30)}
    //                             </Typography>
    //                           )}
    //                         </Typography>
    //                       </React.Fragment>
    //                     }
    //                   />
    //                 </ListItem>
    //               }
    //               {...a11yProps(index)}
    //             />
    //           ))}
    //         </Tabs>
    //       </Paper>
    //     </Grid>
    //   </Grid>
    //   <Grid item xs={9}>
    //     {currentUser.chatRooms.map((room, index) => (
    //       <TabPanel key={index} value={value} index={index}>
    //         <ChatPanel
    //           chatRoomId={room._id}
    //           roomName={room.name}
    //           totalMember={room.members.length}
    //           roomMessages={room.messages}
    //           sx={{ m: 0, p: 0 }}
    //         />
    //       </TabPanel>
    //     ))}
    //   </Grid>
    // </Grid>
  );
}
