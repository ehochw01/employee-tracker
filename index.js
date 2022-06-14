const inquirer = require('inquirer');
const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');

/* WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role */
function optionPrompt() {
    inquirer
    .prompt([
        /* Pass your questions in here */
        {
            type: 'list',
            name: 'menu',
            message: "How would you like to proceed?",
            choices: ["View All Departments", "View All Roles", "View All Employees", "Add a Department", "Add a Role", "Add an Employee", "Update an Employee Role", "Quit"];
        }

    ])
    .then((answers) => {
        switch(DataTransfer.menu) {
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
                break;
        }
    });
}

/* WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids */
function viewDepartments() {
    console.log("viewDepartments()");
    optionPrompt();
}

/* WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role */
function viewRoles() {
    console.log("viewRoles()");
    optionPrompt();
}

/* WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to */
function viewEmployees() {
    console.log("viewEmployees()");
    optionPrompt();
}

/* WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database */
function addDepartmentInq() {
    console.log("addDepartmentInq()");
    //  What is the name of the department?
    optionPrompt();
}

/* WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database */
function addRoleInq() {
    console.log("addRoleInq()");
    // What is the name of the role?
    // What is the salary of the role?
    // What department does the Role belong to? (must get a list of departments)
    optionPrompt();
}

/* WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database */
function addEmployeeInq() {
    console.log("addEmployeeInq()");
    // What is the employee's first name?
    // What is the employee's last name?
    // What is the employee's role? Must get a list of roles
    // Who is the employee's manager? Must get a list of Employees
    optionPrompt();
}

/* WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database */
function updateEmployeeRole() {
    console.log("updateEmployeeRole()");
    // Which employee's role do you want to update? Must get a list of employees
    // Which role do you want to assign the selected employee? Must get a list of roles.
    optionPrompt();
}

function init() {
    // output employee manager thing
    optionPrompt();
}
  
// Function call to initialize app
init();