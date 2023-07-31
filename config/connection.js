require('dotenv').config();
const mysql = require('mysql2')

// Connect to database 

const db = mysql.createConnection(
  // process.env.DB_NAME,
  // process.env.DB_USER,
  // process.env.DB_PASSWORD,
  {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Mojgan1987Mocha@$@",
    database: "employee_db"
}
)

module.exports = db;