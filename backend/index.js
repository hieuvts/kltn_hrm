require("dotenv").config({ path: "./config/.env" });

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const moment = require("moment");

const chatRoomController = require("./controllers/chatRoom.controller");

const employeeRoute = require("./routes/employee.route");
const departmentRoute = require("./routes/department.route");
const feedbackFromEmployeeRoute = require("./routes/feedbackFromEmployee.route");
const projectRoute = require("./routes/project.route");
const taskRoute = require("./routes/task.route");
const userRoute = require("./routes/user.route");
const roleRoute = require("./routes/role.route");
const authRoute = require("./routes/auth.route");
const chatRoom = require("./routes/chatRoom.route");
const Role = require("./models/role.model");
const ChatRoom = require("./models/chatRoom.model");

const {
  addUser,
  getUser,
  getRoomUsers,
  userLeft,
} = require("./utilities/users");
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

const port = process.env.PORT || 8000;
const db_uri = process.env.DB_URI;
const jwtSecret = process.env.JWT_SECRET;

// Connect to MongooDB (Mongoo Atlas)
mongoose
  .connect(db_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
    initial();
  })
  .catch((err) => console.log("[ERROR] Can't connect to MongooDB ", err));
// A route will match any path that follows its path immediately with a “/”.
// For example: app.use('/apple', ...) will match “/apple” so on.
// Since path defaults to “/” middleware mounted without a path
// will be executed for every request to the app.
app.use((err, req, res, next) => {
  res.status(err.status || 404).json({
    message: "[ERROR] No such route exists!",
  });
});
function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      console.log("Not found any roles\n-->Adding to roles collection");
      new Role({
        name: "admin",
        roleLevel: 1,
      }).save((error) => {
        if (error) {
          console.log("[Initial][ERROR]", error);
        }
        console.log("[Initial][SUCCESS] Added 'admin' to roles collection");
      });
      new Role({
        name: "moderator",
        roleLevel: 2,
      }).save((error) => {
        if (error) {
          console.log("[Initial][ERROR]", error);
        }
        console.log("[Initial][SUCCESS] Added 'moderator' to roles collection");
      });
      new Role({
        name: "user",
        roleLevel: 3,
      }).save((error) => {
        if (error) {
          console.log("[Initial][ERROR]", error);
        }
        console.log("[Initial][SUCCESS] Added 'user' to roles collection");
      });
    }
  });
}

app.use("/api/department", departmentRoute);
app.use("/api/employee", employeeRoute);
app.use("/api/feedbackfromemployee", feedbackFromEmployeeRoute);
app.use("/api/task", taskRoute);
app.use("/api/role", roleRoute);
app.use("/api/project", projectRoute);
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/chat", chatRoom);
app.get("/testapi", (req, res) => {
  res.send("Hello World!!!");
});

io.use((socket, next) => {
  if (socket.handshake.auth && socket.handshake.auth.token) {
    jwt.verify(socket.handshake.auth.token, jwtSecret, (err, decoded) => {
      if (err) {
        console.log("Authentication failed ", err);
        return next(new Error("Unauthorized!"));
      }
      console.log("Authenticated, next()");
      socket.decoded = decoded;
      next();
    });
  } else {
    console.log("No token provided!");
    next(new Error("Unauthorized!"));
  }
}).on("connection", (socket) => {
  sessionsMessages = [];
  // console.log(`[NewClient]id=${socket.id} joint`);

  socket.on("joinRoom", ({ email, chatRoomId }) => {
    socket.join(chatRoomId);
    console.log("New user Join ", email, chatRoomId);
    io.to(socket.id).emit("message", {
      message: `${email} Connected to SocketIO server`,
      createdAt: new Date(),
      isBroadcast: true,
    });
    socket.broadcast.to(chatRoomId).emit("message", {
      message: `SYSTEM: ${email} has joint!`,
      createdAt: new Date(),
      isBroadcast: true,
    });
    // Listen new message
    socket.on("message", (body) => {
      body["email"] = email;
      body["createdAt"] = new Date();
      body["isBroadcast"] = false;
      console.log("messageBody ", body);
      sessionsMessages.push(body);
      io.to(chatRoomId).emit("message", body);
    });

    socket.on("disconnect", () => {
      // saveMessagesToDB(user.room, sessionsMessages);
      socket.broadcast.to(chatRoomId).emit("message", {
        message: `SYSTEM: ${email} has left the chat!`,
        createdAt: new Date(),
        isBroadcast: true,
      });
    });
  });
});

const saveMessagesToDB = (chatRoomId, messages) => {
  ChatRoom.findById(chatRoomId).exec((error, chatRoom) => {
    if (error || !chatRoom) {
      console.log(`Room ${chatRoomId} is not found`);
      res.status(404).json({
        message: "[ERROR] [Controller] Room not found!",
      });
      return;
    } else {
      console.log(moment().format("hh:mm:ss"), `Room ${chatRoomId} found!`);
      chatRoom.messages = { ...chatRooom.messages, messages: messages };
      chatRoom.save((error, result) => {
        if (error) {
          res.status(200).json({ chatrooms });
          console.log("[ERROR] saveMessagesToDB ", error);
        }
        console.log("[SUCCESS] saveMessagesToDB");
      });
    }
  });
};
http.listen(port, () => {
  console.log("Listening on localhost:", port);
});

module.exports = http;
