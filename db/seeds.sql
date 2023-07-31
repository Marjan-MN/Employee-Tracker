INSERT INTO department (id, name) 
VALUES 
(001, "Sales"),
(002, "Engineering"), 
(003, "Legal"), 
(004, "Finance");
​
INSERT INTO role (id, title, salary, department_id)
VALUES 
(001, "Sales Lead", 10000, 1),
(002, "Salesperson", 80000, 1),
(003, "Lead Engineer", 150000, 2),
(004, "Software Engineer", 120000, 2),
(005, "Legal Team Lead", 250000, 3),
(006, "Lawyer", 190000, 3),
(007, "Accountant", 125000, 4);
​
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES 
(001, "Kaidan", "Alenko", 1, null),
(002, "Liara", "Tsoni", 3, null),
(003, "Tali", "Zorah", 4, 2),
(004, "Urdnot", "Wrex", 6, null),
(005, "Garrus", "Vakarian", 2, 1),
(006, "Miranda", "Lawson", 2, 1);