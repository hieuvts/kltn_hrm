require("dotenv").config({ path: "./config/.env" });
// Khai bao thu vien
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const employeeRoute = require("./routes/employee.route");
const departmentRoute = require("./routes/department.route");
const feedbackfromemployeeRoute = require("./routes/feedbackfromemployee.route");
const projectRoute = require("./routes/project.route");
const taskRoute = require("./routes/task.route");
const userRoute = require("./routes/user.route");
const roleRoute = require("./routes/role.route");
const app = express();
app.use(cors());
// Parses incoming requests with JSON payloads and is based on body-parser
app.use(express.json());
// Parses incoming requests with urlencoded payloads and is based on body-parser
app.use(express.urlencoded({ extended: false }));

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
  })
  .catch((err) => console.log("[ERROR] [DB], ", err));
// A route will match any path that follows its path immediately with a “/”.
// For example: app.use('/apple', ...) will match “/apple” so on.
// Since path defaults to “/” middleware mounted without a path
// will be executed for every request to the app.
app.use((err, req, res, next) => {
  res.status(err.status || 404).json({
    message: "[ERROR] No such route exists!",
  });
});

app.use("/api/department",departmentRoute)
app.use("/api/employee", employeeRoute);
app.use("/api/feedbackfromemployee",feedbackfromemployeeRoute)
app.use("/api/task", taskRoute);
app.use("/api/role",roleRoute)
app.use("/api/project", projectRoute);
app.use("/api/user", userRoute);
app.get("/testapi", (req, res) => {
  res.send("Hello World!!!");
});

app.listen(port, () => {
  console.log("Listening on localhost:", port);
});

module.exports = app;
