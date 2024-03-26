const { Pool } = require('pg');
const inquirer = require('inquirer');

function databaseMethods(data) {
	const pool = new Pool(
		{
			user: 'postgres',
			password: 'password',
			host: 'localhost',
			database: 'company_db',
		},
		console.log(`Connected to the company_db database.`)
	);

	pool.connect();

	if (data === 'View All Employees') {
		console.log('IT MATCHES');
		pool.query(
			`SELECT employee.id, employee.first_name, employee.last_name, title, name as department, salary, NULLIF((CONCAT(e2.first_name, ' ', e2.last_name)), ' ') AS manager_name
            FROM employee
            LEFT JOIN role ON role_id = role.id
            LEFT JOIN department ON department.id = role.id
            LEFT JOIN employee e2 on employee.manager_id = e2.id;`,
			function (err, { rows }) {
				console.log({ rows });
			}
		);
	}

	if (data === 'Add Employee') {
		let employeeRole = [];
		let employeeNames = [];
		pool.query(`SELECT title FROM role`, function (err, { rows }) {
			// console.log({ rows });
			for (let i = 0; i < rows.length; i++) {
				// console.log(rows[i].title);
				employeeRole.push(rows[i].title);
			}
			// console.log(employeeRole);

			pool.query(
				`SELECT CONCAT(first_name, ' ', last_name) as name FROM employee`,
				function (err, { rows }) {
					for (let i = 0; i < rows.length; i++) {
						employeeNames.push(rows[i].name);
					}
					// console.log(employeeNames);
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
							console.log(data.firstName);
							console.log(data.lastName);
							console.log(data.role);
							console.log(data.manager);
						});
				}
			);
			// pool.query(`SELECT name FROM department`, function (err, { rows }) {
			// 	for (let i = 0; i < rows.length; i++) {
			// 		// console.log(rows[i].title);
			// 		departments.push(rows[i].name);
			// 	}
			// 	// console.log(departments);
			// 	inquirer.createPromptModule([
			// 		{
			// 			type: 'input',
			// 			message: "What is the employee's first name",
			// 			name: 'firstName',
			// 		},
			// 		{
			// 			type: 'input',
			// 			message: "What is the employee's last name",
			// 			name: 'lastName',
			// 		},
			// 		{
			// 			type: 'list',
			// 			message: `What is the employee's role?`,
			// 			name: 'role',
			// 			choices: employeeRole,
			// 		},
			// 		{
			// 			type: 'list',
			// 			message: `What is the employee's role?`,
			// 			name: 'role',
			// 			choices: employeeRole,
			// 		},
			// 	]);
			// });
		});
	}
	if (data === 'Update Employee Role') {
	}
	if (data === 'View All Roles') {
		pool.query(
			`SELECT role.id, title, name as department, salary FROM role LEFT JOIN department ON department = department.id`,
			function (err, { rows }) {
				console.log({ rows });
			}
		);
	}
	if (data === 'Add Role') {
		let departments = [];
		pool.query(`SELECT name FROM department`, function (err, { rows }) {
			for (let i = 0; i < rows.length; i++) {
				// console.log(rows[i].title);
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
					console.log(data.roleName);
					console.log(data.roleSalary);
					console.log(data.roleDepartment);
				});
		});
	}
	if (data === 'View All Departments') {
		pool.query(`SELECT * FROM department`, function (err, { rows }) {
			console.log({ rows });
		});
	}
	if (data === 'Add Department') {
		inquirer
			.prompt([
				{
					type: 'input',
					message: 'What is the name of the department?',
					name: 'department',
				},
			])
			.then((data) => {
				console.log(data);
			});
	}
}

module.exports = { databaseMethods };
