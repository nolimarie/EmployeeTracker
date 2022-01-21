USE employeetracker_db;

--add department
INSERT INTO department (department_name, department_id)
VALUES
    ('Management', 1),
    ('Engineering', 2),
    ('Finance', 3),
    ('Legal', 4),
    ('Sales', 5);

-- add role
INSERT INTO role (title, salary, department_id)
VALUES
('Manager', 150000.00, 1),
('Engineer', 130000, 2),
('Accountant', 100000, 3),
('Lawyer', 175000, 4),
('Sales', 120000, 5);

--add employee
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('John', 'Doe', 1, 123),
('Jane', 'Smith', 2, 456),
('Joe', 'Schmoe', 3, 789),
('Peter', 'Piper', 4, 147),
('Sally', 'Seashells', 5, 258);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;
