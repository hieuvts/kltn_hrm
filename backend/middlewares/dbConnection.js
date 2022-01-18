require("dotenv").config({ path: "../config/.env" });

const mysql = require("mysql2");

const port = process.env.PORT || 8000;
const mysql_host = process.env.MYSQL_HOST;
const mysql_user = process.env.MYSQL_USER;
const mysql_password = process.env.MYSQL_PASSWORD;
const mysql_database = process.env.MYSQL_DATABASE;

var con = mysql.createConnection({
  host: mysql_host,
  user: mysql_user,
  password: mysql_password,
  database: mysql_database,
  timeout: 60000,
});

con.connect((error) => {
  if (error) {
    throw error;
  } else {
    console.log("Connect to mysql server on ", mysql_host);
  }
});
module.exports = con;
