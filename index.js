const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

// console.table([
//   {
//     name: 'foo',
//     age: 10
//   }, {
//     name: 'bar',
//     age: 20
//   }
// ]);

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
  connection.end();
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
          "Remove Role"
        ]
      }
    ]).then(function(res) {
      if (res.artist === "View All Employees") {
        //viewAllEmployees()
      } else if (res.artist === "View All Employees By Department") {
        //viewAllEmployeesByDepartment()
      } else if (res.artist === "View All Employees by Manager") {
        //viewAllEmployeesByManager()
      } else if (res.artist === "Add Employee") {
        //addEmployee()
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
      }
      //console.log(res);
    });
}

function viewAllEmployees() {

}

function viewAllEmployeesByDepartment() {
  
}

function viewAllEmployeesByManager() {
  
}

function addEmployee() {

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



