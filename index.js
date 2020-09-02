const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "employee_trackerDB"
});

connection.connect(function (err) {
  if (err) {
      throw err
  };
  console.log("connected as id " + connection.threadId);
  init();
  //connection.end();
});

function init() {
  inquirer.prompt(
    [
      {
        type: "rawlist",
        name: "artist",
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          "View All Employees By Department",
          "View All Employees by Manager",
          "Add Employee",
          "Remove Employee",
          "Update Employee Role",
          "Update Employee Manager",
          "View All Roles",
          "View All Departments",
          "Add Role",
          "Remove Role",
          "Exit"
        ]
      }
    ]).then(function(res) {
      if (res.artist === "View All Employees") {
        viewAllEmployees();
      } else if (res.artist === "View All Employees By Department") {
        //viewAllEmployeesByDepartment()
      } else if (res.artist === "View All Employees by Manager") {
        //viewAllEmployeesByManager()
      } else if (res.artist === "Add Employee") {
        addEmployee();
      } else if (res.artist === "Remove Employee") {
        removeEmployee();
      } else if (res.artist === "Update Employee Role") {
        //updateEmployeeRole()
      } else if (res.artist === "Update Employee Manager") {
        //updateEmployeeManager()
      } else if (res.artist === "View All Roles") {
        viewAllRoles();
      } else if (res.artist === "View All Departments") {
        viewAllDepartments();
      } else if (res.artist === "Add Role") {
        //addRole()
      } else if (res.artist === "Remove Role") {
        //removeRole()
      } else if (res.artist === "Exit") {
        connection.end();
      }
      //console.log(res);
    });
}

//let allEmployeesArray;

function viewAllEmployees() {
  const query1 = connection.query(`
  SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS 'department', role.salary
  FROM employee
  INNER JOIN role ON employee.role_id = role.id 
  INNER JOIN department ON role.department_id = department.id
  `,
    function (err, res) {
      if (err) {
        throw err;
      }
      let allEmployeesArray = res;

      const query2 = connection.query(`
      SELECT mgr.first_name, mgr.last_name
      FROM employee
      LEFT JOIN employee mgr ON employee.manager_id = mgr.id;`,
        function (err, res) {
          if (err) {
            throw err;
          }
          
          for (i = 0; i < allEmployeesArray.length; i++) {
            allEmployeesArray[i].manager = `${res[i].first_name} ${res[i].last_name}`
          }

          console.table(allEmployeesArray);

          init();
        }
      )
    }
  );
}

function viewAllEmployeesByDepartment() {
  // const query = connection.query("SELECT * FROM department",
  // function(err, res) {
  //   res.forEach(data => console.log(data.name));
  // })
  
  // inquirer.prompt(
  //   [
  //     {
  //       type: "rawlist",
  //       name: "department",
  //       message: "Select a department.",
  //       choices: [department.name]
  //     }
  //   ]).then(function(res) {
      
  //   });
  // const query = connection.query("SELECT * FROM employees WHERE ?"),
  // {
    
  // }
}

function viewAllEmployeesByManager() {
  
} 

function addEmployee() {
  const query = connection.query("SELECT employee.first_name, employee.last_name, role.title FROM employee INNER JOIN role ON employee.id=role.id;",
    function (err, res) {
      if (err) {
        throw err;
      }

      
      roleArray = [];
      employeeArray = ["NONE"];
      employeeIDs = [];

      const query1 = connection.query("SELECT * FROM role",
        function (err, res) {
          if (err) {
            throw err;
          }
          res.forEach(role => roleArray.push(role.title));
        });

      const query2 = connection.query("SELECT * FROM employee",
      function (err, res) {
        if (err) {
          throw err;
        }
        res.forEach(employeeId => employeeIDs.push(employeeId.id));
        res.forEach(employee => employeeArray.push(`${employee.first_name} ${employee.last_name}`));
      });
      
      

      inquirer.prompt(
        [
          {
            type: "input",
            name: "firstName",
            message: "What is the employee's first name?",
          },
          {
            type: "input",
            name: "lastName",
            message: "What is the employee's last name?",
          },
          {
            type: "rawlist",
            name: "role",
            message: "What is the employee's role?",
            choices: roleArray
          },
          {
            type: "rawlist",
            name: "manager",
            message: "Who is the employee's manager?",
            choices: employeeArray
          }
        ]
      ).then(function(answers) {
        let employeeIDIndex = employeeArray.indexOf(answers.manager) - 1;
        // if (employeeIDs.length <= 1) {
        //   employeeIDIndex = employeeArray.indexOf(answers.manager);
        // } else {
        //   employeeIDIndex = employeeArray.indexOf(answers.manager) - 1;
        // }
        connection.query("INSERT INTO employee SET ?",
        {
          first_name: answers.firstName,
          last_name: answers.lastName,
          role_id: roleArray.indexOf(answers.role) + 1,
          manager_id: employeeIDs[employeeIDIndex]
        },
        function (err, res) {
          if (err) {
            throw err;
          }
          init();
        }
      );
    });
  });
}


function removeEmployee() {
  const query = connection.query("SELECT * FROM employee",
    function (err, res) {
      const allEmployees = res;
      let allEmployeeNames = [];
      let employeeIds = [];
      allEmployees.forEach(employeeData => {
        allEmployeeNames.push(`${employeeData.first_name} ${employeeData.last_name}`);
        employeeIds.push(employeeData.id);
      });
      if (allEmployees.length > 0) {  
        inquirer.prompt(
          {
            type: "rawlist",
            name: "employee",
            message: "Which employee would you like to remove?",
            choices: allEmployeeNames
          }
        ).then(function(answers){  

          const query = connection.query("DELETE FROM employee WHERE ?",
            {
              id: employeeIds[allEmployeeNames.indexOf(answers.employee)]
            },
            function (err, res) {
              if (err) {
                throw err;
              }
              init();
          });
        });
      } else {
        init();
      }
  })
}
  

function updateEmployeeRole() {
  
}

function updateEmployeeManager() {

}

function viewAllRoles() {
  const query = connection.query(`SELECT role.id, role.title, role.salary FROM role`,
    function (err, res) {
      if (err) {
        throw err;
      }
      console.table(res);
      init();
    });
}

function viewAllDepartments() {
  const query = connection.query(`SELECT department.id, department.name FROM department`,
    function (err, res) {
      if (err) {
        throw err;
      }
      console.table(res);
      init();
    });
}

function addRole() {
  
}

function removeRole() {
  
}



