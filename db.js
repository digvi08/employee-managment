const mysql = require('mysql2');

// Create MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',      // Your MySQL username
  password: 'geek', // Your MySQL password
  database: 'db2' // Name of your database
});

// Check connection
connection.connect((err) => {
  if (err) {
    console.error('Could not connect to MySQL:', err.message);
  } else {
    console.log('Connected to MySQL database');
  }
});

module.exports = connection;
