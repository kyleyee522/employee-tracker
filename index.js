const inquirer = require('inquirer');
const { databaseMethods } = require('./utils/index');
const { Pool } = require('pg');
// const inquirer = require('inquirer');
// const { promptUser } = require('../index.js');

const pool = new Pool(
	{
		user: 'postgres',
		password: 'password',
		host: 'localhost',
		database: 'company_db',
	}
	// console.log(`Connected to the company_db database.`)
);

function promptUser() {
	inquirer
		.prompt([
			{
				type: 'list',
				message: 'What would you like to do?',
				name: 'task',
				choices: [
					'View All Employees',
					'Add Employee',
					'Update Employee Role',
					'View All Roles',
					'Add Role',
					'View All Departments',
					'Add Department',
					'Quit',
				],
			},
		])
		.then((data) => {
			// console.log(data.task);
			if (data.task === 'Quit') {
				process.exit();
			}
			if (data.task === 'View All Employees') {
				console.log('IT MATCHES');
				pool.query(
					`SELECT employee.id, employee.first_name, employee.last_name, title, name as department, salary, NULLIF((CONCAT(e2.first_name, ' ', e2.last_name)), ' ') AS manager_name
					FROM employee
					LEFT JOIN role ON role_id = role.id
					LEFT JOIN department ON department.id = role.id
					LEFT JOIN employee e2 on employee.manager_id = e2.id;`,
					function (err, { rows }) {
						console.log({ rows });
						promptUser();
					}
				);
			}

			if (data.task === 'Add Employee') {
				let employeeRole = [];
				let employeeNames = ['None'];
				pool.query(`SELECT title FROM role`, function (err, { rows }) {
					for (let i = 0; i < rows.length; i++) {
						employeeRole.push(rows[i].title);
					}

					pool.query(
						`SELECT CONCAT(first_name, ' ', last_name) as name FROM employee`,
						function (err, { rows }) {
							for (let i = 0; i < rows.length; i++) {
								employeeNames.push(rows[i].name);
							}
							inquirer
								.prompt([
									{
										type: 'input',
										message: "What is the employee's first name",
										name: 'firstName',
									},
									{
										type: 'input',
										message: "What is the employee's last name",
										name: 'lastName',
									},
									{
										type: 'list',
										message: `What is the employee's role?`,
										name: 'role',
										choices: employeeRole,
									},
									{
										type: 'list',
										message: `Who is the employee's manager?`,
										name: 'manager',
										choices: employeeNames,
									},
								])
								.then((data) => {
									let employeeIndex;
									if (data.employeeNames === 'None') {
										employeeIndex = null;
									} else {
										employeeIndex = employeeNames.indexOf(data.manager) + 1;
									}
									const roleIndex = employeeRole.indexOf(data.role) + 1;
									pool.query(
										`INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES($1, $2, $3, $4)`,
										[data.firstName, data.lastName, roleIndex, employeeIndex],
										(err, { rows }) => {
											if (err) {
												console.log(err);
												promptUser();
											}
										}
									);
								});
						}
					);
				});
			}
			if (data.task === 'Update Employee Role') {
			}
			if (data.task === 'View All Roles') {
				pool.query(
					`SELECT role.id, title, name as department, salary FROM role LEFT JOIN department ON department = department.id`,
					function (err, { rows }) {
						console.log({ rows });
						promptUser();
					}
				);
			}
			if (data.task === 'Add Role') {
				let departments = [];
				pool.query(`SELECT name FROM department`, function (err, { rows }) {
					for (let i = 0; i < rows.length; i++) {
						departments.push(rows[i].name);
					}
					inquirer
						.prompt([
							{
								type: 'input',
								message: 'What is the name of the role?',
								name: 'roleName',
							},
							{
								type: 'input',
								message: 'What is the salary of the role?',
								name: 'roleSalary',
							},
							{
								type: 'list',
								message: 'Which department does the role belong to?',
								name: 'roleDepartment',
								choices: departments,
							},
						])
						.then((data) => {
							const departmentIndex =
								departments.indexOf(data.roleDepartment) + 1;
							pool.query(
								`INSERT INTO role(title, salary, department) VALUES($1, $2, $3)`,
								[data.roleName, data.roleSalary, departmentIndex],
								(err, { rows }) => {
									if (err) {
										console.log(err);
										promptUser();
									}
								}
							);
						});
				});
			}
			if (data.task === 'View All Departments') {
				pool.query(`SELECT * FROM department`, function (err, { rows }) {
					console.log({ rows });
					promptUser();
				});
			}
			if (data.task === 'Add Department') {
				inquirer
					.prompt([
						{
							type: 'input',
							message: 'What is the name of the department?',
							name: 'department',
						},
					])
					.then((data) => {
						pool.query(
							`INSERT INTO department(name) VALUES($1)`,
							[data.department],
							(err, { rows }) => {
								if (err) {
									console.log(err);
									promptUser();
								}
							}
						);
					});
			}
			// } else {
			// 	databaseMethods(data.task);
			// 	// promptUser();
			// }

			// promptUser();
		});
}

promptUser();

// module.exports = { promptUser };
