// Import and require mysql2
const mysql = require('mysql2');
const bluebird = require('bluebird');


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
  
function getDepartments(cb) {
    return db.query("SELECT * FROM departments", function(err, results, fields) {
        cb(results);
    });
}

function getRoles(cb) {
	return db.query(`SELECT roles.id, roles.title, departments.name, roles.salary 
	FROM roles JOIN departments 
	ON roles.department_id = departments.id`, function(err, results, fields) {
		if (err) {
			console.log(err);
		}
		// console.log(results);
		// console.log(fields);
		cb(results);
	});
}

function getEmployees(cb) {
	return db.query(`SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name, roles.salary, employees.manager_id
	FROM departments JOIN roles ON departments.id = roles.department_id JOIN employees ON roles.id = employees.role_id
	ORDER BY employees.id ASC`, function(err, results, fields) {
		if (err) {
			console.log(err);
		}
		console.log(results);
		// console.log(fields);
		cb(results);
	});
}

function addDept(name, cb) {
	return db.query(`INSERT INTO departments(name) VALUES ('${name}');`, function(err, results, fields) {
        if (err) {
			console.log(err);
		}
		console.log(results);
		// console.log(fields);
		cb(results);
    });
}

function addRole (title, salary, department_id, cb) {
	return db.query(`INSERT INTO roles(title, salary, department_id) VALUES ('${title}', ${salary}, ${department_id});`, function(err, results, fields) {
        if (err) {
			console.log(err);
		}
		console.log(results);
		// console.log(fields);
		cb(results);
    });
}

module.exports = {
    getDepartments,
	getRoles,
	getEmployees,
	addDept,
	addRole
}
