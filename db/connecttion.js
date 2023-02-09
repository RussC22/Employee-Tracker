const mysql = require("mysql2");
require("dotenv").config();
const db = mysql.createConnection(
  {
    host: "localhost",
    // Your MySQL username,
    user: "root",
    // Your MySQL password
    password: process.env.db_pw,
    database: "employeeTracker",
  },
  console.log("Connected to the employee_tracker database.")
);

module.exports = db;
