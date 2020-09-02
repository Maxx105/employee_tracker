DROP DATABASE IF EXISTS employee_trackerDB;
CREATE DATABASE employee_trackerDB;
USE employee_trackerDB;

CREATE TABLE department (
	id INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(30),
    PRIMARY KEY (id)
);

CREATE TABLE role (
	id INT NOT NULL AUTO_INCREMENT,
	title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
	-- FOREIGN KEY (department_id) REFERENCES department(id),
    PRIMARY KEY (id)
);

CREATE TABLE employee (
	id INT NOT NULL AUTO_INCREMENT,
	first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT NULL,
    -- FOREIGN KEY (manager_id) REFERENCES employee(id), 
    -- FOREIGN KEY (role_id) REFERENCES role(id),
    PRIMARY KEY (id)
);

SELECT * FROM employee;
SELECT * FROM role;
SELECT * FROM department;

SELECT * FROM role INNER JOIN employee ON role.id=employee.role_id;

SELECT employee.first_name, employee.last_name, role.title 
FROM employee
INNER JOIN role ON employee.id=role.id;

SELECT employee.id, employee.first_name, employee.last_name, role.title, department.department, role.salary
  FROM employee
  INNER JOIN role ON employee.role_id = role.id 
  INNER JOIN department ON role.department_id = department.id