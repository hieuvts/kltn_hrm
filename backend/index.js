require("dotenv").config({ path: "./config/.env" });

const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const moment = require("moment");
const port = process.env.PORT || 8000;
const employeeRoute = require("./routes/employee.route");
const departmentRoute = require("./routes/department.route");
const projectRoute = require("./routes/project.route");
const taskRoute = require("./routes/task.route");
const authRoute = require("./routes/auth.route");
const companyRoute = require("./routes/company.route");
const chatRoomDetailsRoute = require("./routes/chatRoomDetails.route");
const chatRoom = require("./routes/chatRoom.route");
const db = require("./models");
const ChatMessage = db.ChatMessage;

const app = express();
app.use(cors({ credentials: true, origin: true }));
// Parses incoming requests with JSON payloads and is based on body-parser
app.use(express.json());
// Parses incoming requests with urlencoded payloads and is based on body-parser
app.use(express.urlencoded({ extended: false }));
const http = require("http").Server(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});

db.sequelize.sync();

app.use((err, req, res, next) => {
  res.status(err.status || 404).json({
    message: "[ERROR] No such route exists!",
  });
});

app.use("/api/department", departmentRoute);
app.use("/api/employee", employeeRoute);
app.use("/api/task", taskRoute);
app.use("/api/project", projectRoute);
app.use("/api/auth", authRoute);
app.use("/api/company", companyRoute);
app.use("/api/chatRoomDetails", chatRoomDetailsRoute);
app.use("/api/chat", chatRoom);
app.get("/testapi", (req, res) => {
  res.send("Hello World!!!");
});

// begin socketio
io.use((socket, next) => {
  // if (socket.handshake.auth && socket.handshake.auth.token) {
  //   jwt.verify(socket.handshake.auth.token, jwtSecret, (err, decoded) => {
  //     if (err) {
  //       console.log("Authentication failed ", err);
  //       return next(new Error("Unauthorized!"));
  //     }
  //     console.log("Authenticated, next()");
  //     socket.decoded = decoded;
  //     next();
  //   });
  // } else {
  //   console.log("No token provided!");
  //   next(new Error("Unauthorized!"));
  // }
  next();
}).on("connection", (socket) => {
  console.log(`[NewClient]id=${socket.id} joint`);

  socket.on("joinRoom", ({ senderEmail, chatRoomId }) => {
    socket.join(chatRoomId);
    console.log("New user Join ", senderEmail, chatRoomId);
    // io.to(socket.id).emit("message", {
    //   message: `${email} Connected to SocketIO server`,
    //   createdAt: new Date(),
    //   isBroadcast: true,
    // });
    socket.broadcast.to(chatRoomId).emit("message", {
      message: `SYSTEM: ${senderEmail} has joint!`,
      createdAt: new Date(),
      isBroadcast: true,
    });
    // Listen new message
    socket.on("message", (body) => {
      body["senderEmail"] = senderEmail;
      body["createdAt"] = new Date();
      body["isBroadcast"] = false;
      body["chatRoomId"] = chatRoomId;
      console.log("messageBody ", body);
      saveMessagesToDB(body);
      io.to(chatRoomId).emit("message", body);
    });

    socket.on("disconnect", () => {
      socket.leave(chatRoomId);
      console.log("disconnected");
      socket.broadcast.to(chatRoomId).emit("message", {
        message: `SYSTEM: ${senderEmail} has left the chat!`,
        createdAt: new Date(),
        isBroadcast: true,
      });
    });
  });
});

const saveMessagesToDB = (messages) => {
  ChatMessage.create(messages)
    .then((message) => {
      if (message) {
        console.log("add msg ok", message);
      }
    })
    .catch((error) => {
      console.log(moment().format("hh:mm:ss"), "[ERROR] addMsg");
    });
};

// end socketio
http.listen(port, () => {
  console.log("Listening on localhost:", port);
});

module.exports = http;
