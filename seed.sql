INSERT INTO department (department)
VALUES ("Engineering");
INSERT INTO department (department)
VALUES ("Sales");
INSERT INTO department (department)
VALUES ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES ("Software Engineer", 80000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("Lead Engineer", 100000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("Lawyer", 120000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Maxx", "Sanner", 1, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Smith", 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jack", "Douglas", 3, 1);

