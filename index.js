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
        //removeEmployee()
      } else if (res.artist === "Update Employee Role") {
        //updateEmployeeRole()
      } else if (res.artist === "Update Employee Manager") {
        //updateEmployeeManager()
      } else if (res.artist === "View All Roles") {
        //viewAllRoles()
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

let allEmployeesArray;

function viewAllEmployees() {
  const query1 = connection.query(`
  SELECT employee.id, employee.first_name, employee.last_name, role.title, department.department, role.salary
  FROM employee
  INNER JOIN role ON employee.role_id = role.id 
  INNER JOIN department ON role.department_id = department.id
  `,
    function (err, res) {
      if (err) {
        throw err;
      }
      allEmployeesArray = res;
      console.log(allEmployeesArray);

      const query2 = connection.query(`
      SELECT mgr.first_name, mgr.last_name
      FROM employee AS emp
      LEFT JOIN employee mgr ON emp.manager_id = mgr.id;`,
        function (err, res) {
          if (err) {
            throw err;
          }

          //console.log(allEmployeesArray);
          //console.log(res);

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
    employeeArray = [];
    roleArray = [];
    res.forEach(role => roleArray.push(role.title));
    res.forEach(employee => employeeArray.push(`${employee.first_name} ${employee.last_name}`));
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
    ).then(function(res) {
        let answers = res;
        // console.log(res);
        connection.query("SELECT * FROM role INNER JOIN employee ON role.id=employee.role_id;",
        function (err, res) {
          if (err) {
            throw err;
          }
          // console.log(res);

          //console.log(allRolesArray);

          let roleId = res[res.length-1].id;

          // allRolesArray.forEach((roleData, i) => {
          //   //roleId = roleData.id;
          //   if (roleData.title === answers.role) {
          //     roleId = i + 1;
          //     // console.log(roleId);
          //     // console.log(roleData);
          //   }
          // });

          connection.query("INSERT INTO employee SET ?",
            {
              first_name: answers.firstName,
              last_name: answers.lastName,
              role_id: roleId,
              manager_id: 1
            },
            function (err, res) {
              if (err) {
                throw err;
              }
              // console.log(allEmployeesArray)
              // console.log(`${res.affectedRows} item added!`);
              init();
            }
          );




          // console.log(allEmployeesArray)
          // console.log(`${res.affectedRows} item added!`);
          // init();
        }
      );
    });
  }
)
  

  // const query = 
}

function removeEmployee() {
  
}

function updateEmployeeRole() {
  
}

function updateEmployeeManager() {

}

function viewAllRoles() {
  
}

function addRole() {
  
}

function removeRole() {
  
}



