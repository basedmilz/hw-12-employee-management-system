USE employee_trackerDB;

INSERT INTO department (name)
VALUES ("Clearance");
INSERT INTO department (name)
VALUES ("Electronics");
INSERT INTO department (name)
VALUES ("Jewelry");
INSERT INTO department (name)
VALUES ("Grocery");
INSERT INTO department (name)
VALUES ("Pharmacy");


INSERT INTO role (title, salary, department_id)
VALUES ("Clearance Clerk", 20000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("Electronics Supervisor", 40000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Jewelry Associate", 15000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ("Grocery Manager", 50000, 4);
INSERT INTO role (title, salary, department_id)
VALUES ("Pharmacy Aide", 35000, 5);


 INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Michaels", 1, NULL); 
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Susan", "Lyles", 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Billy", "Smolden", 3, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Ebony", "Turner", 4, 6);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Vaticia", "Bullcok", 5, 4); 



