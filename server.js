const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // TODO: Add MySQL password
      password: '',
      database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
  );
  
function getDepartments() {
    db.query("SELECT * FROM departments", (err, result) => {
        if (err) {
          console.log(err);
        }
        console.log(result);
      });
}

app.use((req, res) => {
    res.status(404).end();
  });
  
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});


module.exports = {
    getDepartments
}
