require("dotenv").config({ path: "./config/.env" });

const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const moment = require("moment");
const port = process.env.PORT || 8000;
const employeeRoute = require("./routes/employee.route");
// const departmentRoute = require("./routes/department.route");
// const feedbackFromEmployeeRoute = require("./routes/feedbackFromEmployee.route");
// const projectRoute = require("./routes/project.route");
// const taskRoute = require("./routes/task.route");
// const userRoute = require("./routes/user.route");
// const roleRoute = require("./routes/role.route");
const authRoute = require("./routes/auth.route");
const companyRoute = require("./routes/company.route");
// const chatRoom = require("./routes/chatRoom.route");

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
const db = require("./models");
db.sequelize.sync();
app.use((err, req, res, next) => {
  res.status(err.status || 404).json({
    message: "[ERROR] No such route exists!",
  });
});

// app.use("/api/department", departmentRoute);
app.use("/api/employee", employeeRoute);
// app.use("/api/feedbackfromemployee", feedbackFromEmployeeRoute);
// app.use("/api/task", taskRoute);
// app.use("/api/role", roleRoute);
// app.use("/api/project", projectRoute);
app.use("/api/auth", authRoute);
app.use("/api/company", companyRoute);
// app.use("/api/user", userRoute);
// app.use("/api/chat", chatRoom);
app.get("/testapi", (req, res) => {
  res.send("Hello World!!!");
});

http.listen(port, () => {
  console.log("Listening on localhost:", port);
});

module.exports = http;
