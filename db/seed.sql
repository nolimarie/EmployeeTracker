USE employeetracker_db;

INSERT INTO departments (name)
VALUES
    ('Management'),
    ('Engineering'),
    ('Finance'),
    ('Legal'),
    ('Sales');


INSERT INTO roles (title, salary, department_id)
VALUES
('Manager', 150000, 1),
('Engineer', 130000, 2),
('Accountant', 100000, 3),
('Lawyer', 175000, 4),
('Sales', 120000, 5);


INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
('John', 'Doe', 1, 123),
('Jane', 'Smith', 2, 456),
('Joe', 'Schmoe', 3, 789),
('Peter', 'Piper', 4, 147),
('Sally', 'Seashells', 5, 258);

SELECT * FROM departments;
SELECT * FROM roles;
SELECT * FROM employees;