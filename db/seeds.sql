
INSERT INTO department(name) VALUES
('Tech'),
('Business');

INSERT INTO role(title, salary, department) VALUES 
('Senior', 20.50, 1),
('Junior', 10.50, 2);

INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES 
('Betty', 'Des', 1, 1),
('John', 'Doe', 2, 2),
('Jane', 'Crow', 2, 1),
('Bane', 'Bat', 2, 1),
('Sad', 'Boi', 2, NULL);

SELECT employee.id, employee.first_name, employee.last_name, title, name, salary, NULLIF((CONCAT(e2.first_name, ' ', e2.last_name)), ' ') AS manager_name
FROM employee
LEFT JOIN role ON role_id = role.id
LEFT JOIN department ON department.id = role.id
LEFT JOIN employee e2 on employee.manager_id = e2.id;

-- SELECT * FROM employee
-- JOIN role ON manager_id = role.id
-- JOIN department ON department.id = role.id

-- SELECT *, CONCAT(e2.first_name, ' ', e2.last_name) AS manager_name
-- FROM employee e1
-- LEFT JOIN employee e2 ON e1.manager_id = e2.id;

-- SELECT IFNULL(
--     SELECT CONCAT(e2.first_name, ' ', e2.last_name) AS manager_name
--     FROM employee e1
--     LEFT JOIN employee e2 ON e1.manager_id = e2.id, null);

-- SELECT e1.id, e1.first_name, e1.last_name, e1.role_id,
--        COALESCE(CONCAT(e2.first_name, ' ', e2.last_name), NULL) AS manager_name
-- FROM employee e1
-- LEFT JOIN employee e2 ON e1.manager_id = e2.id;