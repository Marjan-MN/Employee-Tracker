# Employee-Tracker

## Description
Employee Tracker is a command-line application from scratch to manage a company's employee database, using Node.js, Inquirer, and MySQL.


  * [Installation](#install)
  * [Usage](#usage)
  * [Mock-Up](#mock-up)

## Criteria
```md
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database
```

## Install

Clone project.
Run the following line of code in your terminal to install all the needed packages: 
```
npm i
```


## Usage

Once all the packages have been installed, open terminal and run the following code in command line : 
```
node server.js
```
This will run the server where you can find the page on localhost:3001. To end your server in your terminal type: control + c


## Mock-Up

[![A video thumbnail shows the command-line employee management application with a play button overlaying the view.](./assets/Untitled_%20Aug%203,%202023%204_59%20PM.gif)]
[![ScreenShots of the app.](./assets/Screenshot%202023-08-01%20221650.jpg)]
[![ScreenShots of the app.](./assets/Screenshot%202023-08-03%20171503.jpg)]
[![ScreenShots of the app.](./assets/Screenshot%202023-08-03%20171529.jpg)]
[![ScreenShots of the app.](./assets/Screenshot%202023-08-03%20171553.jpg)]