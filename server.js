// Import dependencies
const express = require('express');
const mysql = require('mysql2')

const PORT = process.env.PORT || 3001;
const app = express()

// Express middleware
app.use(express.urlencoded({ extended: true}));
app.use(express.json())

// Connect to database 
const db = mysql.createConnection(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
)

// Query database
db.query('SELECT * FROM employees', function (err, results) {
    console.log(results);
  });
  
  // Default response for any other request (Not Found)
  app.use((req, res) => {
    res.status(404).end();
  });
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });