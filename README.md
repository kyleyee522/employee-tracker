# Employee Tracker

## Description

- This project allows the user to manage a company's employee database. Before running the program, the user must run the command "npm i" in order to install the necessary dependencies. Then the user must initialize the database. To do so, the user must run the command "psql -U postgres" and then run the command "\i db/schema.sql" (if they are in the main directory and not the db directory). If the user wants dummy data to be added, they could run the command "\i db/seeds.sql". Then the user must quit by typing either "exit" or "\q". The user is now ready to run the program. When the user runs the program, they are prompted on what they want to do. If the user chooses to "Add Employee", "Add Role", or "Add Department", then they will be asked to input the necessary information. Once they finish inputting the information, the database will update with the newly added information. Choosing any of the "View" prompts will output a table showing the relevant information. Once the user is done, pressing the "Quit" prompt option will exit out of the program.

- This project was created in order to utilize my SQL/PostgreSQL knowledge. The SQL language was used to create the database and JavaScript was used to create the prompts and to select, insert, and update values from/into the database. The "inquirer" and "pg" NPM packages were used to create the prompts and to interact with the database.

## Demonstration

Video Link: https://drive.google.com/file/d/1dolQueO-esFyZdtbpnQSQ9tSLW0mIiUV/view?usp=sharing
