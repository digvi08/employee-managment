const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const connection = require('./db'); // Import MySQL connection

const app = express();
const port = 3001;

// Middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Routes

// Route to render homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Route to render register employee form
app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'register.html'));
});

// Route to handle employee registration form submission
app.post('/register', (req, res) => {
  const { name, email, department, salary } = req.body;

  // SQL query to insert employee data
  const query = 'INSERT INTO employees (name, email, department, salary) VALUES (?, ?, ?, ?)';
  connection.execute(query, [name, email, department, salary], (err, results) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).send('Internal Server Error');
    }
    res.redirect('/viewEmployees'); // Redirect to view employee list
  });
});

// Route to view all employees
app.get('/viewEmployees', (req, res) => {
  const query = 'SELECT * FROM employees';
  
  connection.execute(query, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      return res.status(500).send('Internal Server Error');
    }
    res.render('viewEmployees.html', { employees: results }); // Render employee list
  });
});

// Route to render update employee form
app.get('/updateEmployee/:id', (req, res) => {
  const employeeId = req.params.id;
  const query = 'SELECT * FROM employees WHERE id = ?';
  
  connection.execute(query, [employeeId], (err, results) => {
    if (err || results.length === 0) {
      console.error('Error fetching data:', err);
      return res.status(500).send('Internal Server Error');
    }
    res.render('updateEmployee.html', { employee: results[0] });
  });
});

// Route to update employee details
app.post('/updateEmployee/:id', (req, res) => {
  const employeeId = req.params.id;
  const { name, email, department, salary } = req.body;

  const query = 'UPDATE employees SET name = ?, email = ?, department = ?, salary = ? WHERE id = ?';
  
  connection.execute(query, [name, email, department, salary, employeeId], (err, results) => {
    if (err) {
      console.error('Error updating data:', err);
      return res.status(500).send('Internal Server Error');
    }
    res.redirect('/viewEmployees'); // Redirect after update
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
