INSERT INTO department(name) VALUES
('Finance'),
('Engineering'),
('Sales');

INSERT INTO role(title, salary, department) VALUES 
('Accountant', 100200, 1),
('Salesperson', 80000, 3),
('Sales Lead', 100000, 3),
('Software Engineer', 90000, 2);

INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES 
('Betty', 'Desmond', 1, 1),
('John', 'Doe', 3, 2),
('Jane', 'Crow', 2, 1),
('Joe', 'Biden', 4, 1);