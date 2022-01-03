require("dotenv").config({ path: "./config/.env" });

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const employeeRoute = require("./routes/employee.route");
const departmentRoute = require("./routes/department.route");
const feedbackFromEmployeeRoute = require("./routes/feedbackFromEmployee.route");
const projectRoute = require("./routes/project.route");
const taskRoute = require("./routes/task.route");
const userRoute = require("./routes/user.route");
const roleRoute = require("./routes/role.route");
const authRoute = require("./routes/auth.route");

const Role = require("./models/role.model");
const {
  setUser,
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
app.get("/testapi", (req, res) => {
  res.send("Hello World!!!");
});

io.on("connection", (socket) => {
  const { roomId } = socket.handshake.query;
  console.log(
    `New client id=${socket.id} joint roomId=${roomId} rooms=${socket.rooms}`
  );
  socket.on("joinRoom", ({ username, room }) => {
    console.log(`User ${username} room ${room}`);
    const user = setUser(username, room);
    socket.join(user.room);
    socket.broadcast.to(user.room).emit("message", {
      body: `${user.username} has joint!`,
      isBroadcast: true,
    });
    // Listen new message
    socket.on("message", (data) => {
      console.log("echo msg");
      io.to(user.room).emit("message", data);
    });

    // Leave room if user disconnect
    socket.on("disconnect", () => {
      const user = userLeft(socket.id);
      if (user) {
        socket.broadcast.to(user.room).emit("message", {
          body: `${user.username} has left the chat!`,
          isBroadcast: true,
        });
      }
    });
  });
});

http.listen(port, () => {
  console.log("Listening on localhost:", port);
});

module.exports = http;
