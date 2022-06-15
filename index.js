const inquirer = require('inquirer');
const cTable = require('console.table');
const mysql = require('mysql2');
const api = require('./queries');
const res = require('express/lib/response');

/* WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role */
function optionPrompt() {
    inquirer
    .prompt([
        /* Pass your questions in here */
        {
            type: 'list',
            name: 'menu',
            message: "What would you like to do?",
            choices: ["View All Departments", "View All Roles", "View All Employees", "Add a Department", "Add a Role", "Add an Employee", "Update an Employee Role", "Quit"]
        }

    ])
    .then((data) => {
        switch(data.menu) {
            case "View All Departments":
                viewDepartments();
                break;
            case "View All Roles":
                viewRoles();
                break;
            case "View All Employees":
                viewEmployees();
                break;
            case "Add a Department":
                addDepartmentInq();
                break;
            case "Add a Role":
                addRoleInq();
                break;
            case "Add an Employee":
                addEmployeeInq();
                break;
            case "Update an Employee Role":
                updateEmployeeRole();
                break;
            case "Quit":
                // close connection
                console.log("Goodbye");
                process.exit();
                break;
        }
    });
}

/* WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids */
function viewDepartments() {
    api.getDepartments((results) => {
        console.table(results);
        optionPrompt();
    });
}

/* WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role */
function viewRoles() {
    api.getRoles((results) => {
        console.table(results);
        optionPrompt();
    });
}

/* WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to */
function viewEmployees() {
    api.getEmployees((results) => {
        console.table(results);
        optionPrompt();
    });
}

/* WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database */
function addDepartmentInq() {
    inquirer
    .prompt([
        /* Pass your questions in here */
        {
            type: 'input',
            name: 'department',
            message: "What is the name of the department?",
        }

    ])
    .then((data) => {
        api.addDept(data.department, (results) => {
            optionPrompt();
        });
    });
}

/* WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database */
function addRoleInq() {
    api.getDepartments((results) => {
        const depNames = results.map(department => department.name)
        inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: "What is the name of the role?",
            },
            {
                type: 'input',
                name: 'salary',
                message: "What is the salary of the role?",
            },
            // (must get a list of departments)
            {
                type: 'list',
                name: 'department',
                message: "What department does the Role belong to? ",
                choices: depNames
            }

        ])
        .then((data) => {
            let chosenDepartment = null;
            for(let i=0; i < results.length; i++) {
                if (results[i].name == data.department) {
                    chosenDepartment = results[i].id;
                }
            }
            api.addRole(data.name, data.salary, chosenDepartment, (results) => {
                optionPrompt();
            });
        });
    });
}

/* WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database */
function addEmployeeInq() {
    api.getRoles((roles_results) => {
        const roleNames = roles_results.map(role => role.title);
        api.getEmployees((emp_results) => {
            const emp_names = emp_results.map(employee => employee.Name);
            emp_names.unshift("None");
            inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'fn',
                    message: "What is the employee's first name?",
                },
                {
                    type: 'input',
                    name: 'ln',
                    message: "What is the employee's last name?",
                },
                {
                    type: 'list',
                    name: 'role',
                    message: "What is the employee's role?",
                    choices: roleNames
                },
                {
                    type: 'list',
                    name: 'manager',
                    message: "Who is the employee's manager?",
                    choices: emp_names
                }
    
            ])
            .then((data) => {
                let chosenRole = null;
                for(let i=0; i < roles_results.length; i++) {
                    if (roles_results[i].title == data.role) {
                        chosenRole = roles_results[i].id;
                    }
                }
                let chosenManager = null;
                if (data.manager != "None") {
                    for (let i=0; i < emp_results.length; i++) {
                        if(data.manager == emp_results[i].Name) {
                            chosenManager = emp_results[i].id;
                        }
                    }
                }
                api.addEmployee(data.fn, data.ln, chosenRole, chosenManager, (results) => {
                    optionPrompt();
                });
            });
        });
    });
}

/* WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database */
function updateEmployeeRole() {
    api.getEmployees((emp_results) => {
        const emp_names = emp_results.map(employee => employee.Name);
        api.getRoles((roles_results) => {
            const roleNames = roles_results.map(role => role.title);
            inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'employee',
                    message: "Which employee's role do you want to update?",
                    choices: emp_names
                },
                {
                    type: 'list',
                    name: 'role',
                    message: "Which role do you want to assign the selected employee?",
                    choices: roleNames
                }
    
            ])
            .then((data) => {
                let chosenEmp = null;
                for (let i=0; i < emp_results.length; i++) {
                    if(data.employee == emp_results[i].Name) {
                        chosenEmp = emp_results[i].id;
                    }
                }
                let chosenRole = null;
                for(let i=0; i < roles_results.length; i++) {
                    if (roles_results[i].title == data.role) {
                        chosenRole = roles_results[i].id;
                    }
                }
                api.updateRole(chosenEmp, chosenRole,(results) => {
                    optionPrompt();
                });
            });
        });
    });
}

function init() {
    // output employee manager thing
    optionPrompt();
}
  
// Function call to initialize app
init();