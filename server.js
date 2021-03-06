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
      choices: [
        'View all employees',
        'View all departments',
        'View all employees roles ',
        'Update role',
        'Add employee',
        'Add department',
        'Add role',
        'Exit',
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
      case 'Update role':
        updateRole();
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

  });
  startPrompt()
};
const employeesRoles = () => {
  console.log('Selecting all roles...\n');
  connection.query('SELECT * FROM role', (err, res) => {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.table(res);

  });
  startPrompt()
};
const allDepartments = () => {
  console.log('Selecting all departments...\n');
  connection.query('SELECT * FROM department', (err, res) => {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.table(res);

  });
  startPrompt()
};

const addRole = () => {
  connection.query('SELECT * FROM role', (err, res) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          type: "input",
          name: "roleTitle",
          message: "Title of new role?"
        },
        {
          type: "input",
          name: "salary",
          message: "New role salary?"
        },
        {
          type: "input",
          name: "department",
          message: "The department assigned to?"
        }
      ])
      .then((data) => {
        connection.query(`INSERT INTO ROLE SET ? `,
          {
            title: data.roleTitle,
            salary: data.salary,
            department_id: data.department
          },
          (err) => {
            if (err) throw err
            console.table('Successfully added your role!')
          }
        )
        startPrompt()
      }) 
    }
    )
    
}
const addDep = () => {
  connection.query('SELECT * FROM department', (err, res) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          type: "input",
          name: "departmentName",
          message: "Title of new department?"
        }

      ])
      .then((data) => {
        connection.query('INSERT INTO DEPARTMENT SET ? ',
          {
            name: data.departmentName

          },
          (err) => {
            if (err) throw err
            console.table('Successfully added your department!')
          }
        )
        startPrompt()
      })
  }
  )

}
const addEmployees = () => {
  connection.query('SELECT * FROM employee', (err, res) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          type: "input",
          name: "firstName",
          message: "New Employee First Name?"
        },
        {
          type: "input",
          name: "lastName",
          message: "New Employee Last Name?"
        },
        {
          type: "input",
          name: "roleid",
          message: "New Employee Role Id?"
        },
        {
          type: "input",
          name: "managerid",
          message: "New Employee Manager Id?"
        }

      ])
      .then((data) => {
        connection.query('INSERT INTO EMPLOYEE SET ? ',
          {
            first_name: data.firstName,
            last_name: data.lastName,
            role_id: data.roleid,
            manager_id: data.managerid


          },
          (err) => {
            if (err) throw err
            console.table('Successfully added your new employee!')
          }
        )
        startPrompt()
      })
  }
  )

}

const updateRole = () => {
  connection.query('SELECT * FROM employee', (err, res) => {
    if (err) throw err;
    console.log("this is my update role", res)
    let choicesEmp = res.map((employee) => {
      return { value: employee.id, name: employee.first_name + " " + employee.last_name }
    })
    // console.log(choicesEmp)
    inquirer
      .prompt([
        {
          type: "list",
          name: 'updatedEmployee',
          message: "Choose which employee to update.",
          choices: choicesEmp
        }
      ]).then((choicesEmp) => {
        console.log(choicesEmp.updatedEmployee)
        connection.query('SELECT * FROM role', (err, res) => {
          if (err) throw err;
          // console.log(res)
        })
        let choicesRole = res.map((data) => {
          return { value: data.id, name: data.title }
        })
        // console.log(choicesRole)
        // inquirer
        // .prompt([
        //   {
        //     type: "list",
        //     name: 'updatedRole',
        //     message: "Choose which employee to update.",
        //     choices: choicesRole
        //   }]).then((updateRole) => {
        //     connection.query(
        //       `UPDATE employee SET role_id = ? WHERE role_id = ?`,
        //       [updateRole.values(answer), updateRole.values(employee)],
        //       (err, res) => {
        //         if (err) throw err;
        //         // console.log("this is" , updateRole)
        //         startPrompt();
        //   })

        startPrompt()
      })
  })
}

const startPrompt = () => {
  inquirer
    .prompt(
      {
        name: 'choice',
        type: 'list',
        message: 'Choose one of these options',
        choices: [
          'View all employees',
          'View all departments',
          'View all employees roles ',
          'Update role',
          'Add employee',
          'Add department',
          'Add role',
          'Exit',
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
        case 'Update role':
          updateRole();
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

}
