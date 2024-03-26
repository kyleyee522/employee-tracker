const inquirer = require('inquirer');
const { databaseMethods } = require('./utils/index');

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
				return;
			} else {
				databaseMethods(data.task);
			}

			// promptUser();
		});
}

promptUser();
