const mysql = require("mysql");
const inquirer = require("inquirer");
const consTable = require("console.table");

const connection = mysql.createConnection({
  host: 'localhost',

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: 'root',

  // Be sure to update with your own MySQL password!
  password: '',
  database: 'employee_trackerDB',
});

connection.connect((err) => {
  if (err) throw err;
  console.log("connected")
});


inquirer
  .prompt(
    {
      name: 'choice',
      type: 'list',
      message: 'Choose one of these options',
      choices: [{
        name: 'View all employees',
        value: 'All_employees',

      },
      {

        name: 'View all departments',
        value: 'All_departments'
      },
      {

        name: 'View all employees roles ',
        value: 'Employee_role'
      },
      {

        name: 'View employees by departments',
        value: 'Employee_departments'
      },
      {

        name: 'Add employee',
        value: 'Add_employee'
      },
      {

        name: 'Add department',
        value: 'Add_departments'
      },
      {

        name: 'Add role',
        value: 'Add_role'
      },
      {

        name: 'Exit',
        value: 'Exit'
      }

      ]
    }

  ).then((data) => {
    switch (data.choice) {
      case 'View all employees':
        allEmployees();
        break;
      case 'View all departments':
        allDepartments();
        break;
      case 'View all employees roles ':
        employeesRoles();
        break;
      case 'View employees by departments':
        employeesDep();
        break;
      case 'Add employee':
        addEmployees();
        break;
      case 'Add department':
        addDep();
        break;
      case 'Add role':
        addRole();
        break;
      case 'Exit':
        exit();
        break;


    }
  })

// Functions for selection

const allEmployees = () => {
  console.log('Selecting all employees...\n');
  connection.query('SELECT * FROM employee', (err, res) => {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.table(res);
    prompt();
  });
};