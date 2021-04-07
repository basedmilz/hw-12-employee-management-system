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
        choices: [ {
          name: 'View all employees',
          value: 'All_employees',

        }, 
        {
          
          name: 'View all departments',
          value:'All_departments'
        }

        ]
      }
      
    ).then (data => {
      console.log(data)
    } ) 
  