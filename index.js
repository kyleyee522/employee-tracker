const inquirer = require('inquirer');

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
				'View All Employees',
			],
		},
	])
	.then((data) => {
		console.log(data.task);
	});
