// Import packages
const inquirer = require('inquirer')
const mysql = require('mysql2')
const db = require('./config/connection')
const { table } = require('table')
const logo = require("asciiart-logo");

console.log(
  logo({
      name: 'EMPLOYEE TRACKER',
      font: 'Fender',
      lineChars: 10,
      padding: 3,
      margin: 2,
      borderColor: 'cyan',
      logoColor: 'yellow',
      textColor: 'magenta',
  })
      .emptyLine()
      .right("© onomatopoetica")
      .emptyLine()
      .render()
);


// Start ===============================

function start() {
  inquirer
      .prompt([
          {
              type: 'list',
              message: 'What would you like to do?',
              name: 'action',
              choices: [
                  'Add department',
                  'Add employee',
                  'Add role',
                  'View by department',
                  'View roles',
                  'View employees',
                  'Update employee roles',
                  'Exit'
              ]
          }
      ]).then((answer) => {
          switch (answer.action) {
              case 'Add department':
                  addDepartment();
                  break;
              case 'Add employee':
                  addEmployee();
                  break;
              case 'Add role':
                  addRole();
                  break;
              case 'View by department':
                  viewByDepartment();
                  break;
              case 'View roles':
                  viewRoles();
                  break;
              case 'View employees':
                  viewEmployees();
                  break;
              case 'Update employee roles':
                  updateEmpRoles();
                  break;
              default:
                  db.end();
                  break;
          }
      })
};


// Add department function =============
function addDepartment() {
  inquirer
      .prompt({
          name: 'name',
          type: 'input',
          message: 'Enter name of new department'
      }).then(({ name }) => {
          const query = 'insert into department (name) values (?)';
          db.query(query, name, (err, res) => {
              if (err) throw err;
              start();
          })
      })
}
// View employees function
function addEmployee(){
db.query('SELECT * FROM employee', (err, empRes) => {
      console.log(empRes);
      const employees = empRes.map(employee => {
        return {name: employee.first_name + ' ' + employee.last_name, value:employee.id};
    });
     employees.push({name:"No manager" , value:null})
     console.log(employees)
    db.query(
        'SELECT * FROM role', (err, roleRes) => {
            const roles = roleRes.map(role => {
                return {name: role.title,value:role.id};
            });

            inquirer
                .prompt([{
                    name: 'first_name',
                    type: 'input',
                    message: 'Enter the new employees first name: '
                },
                {
                    name: 'last_name',
                    type: 'input',
                    message: 'Enter the new employees last name: '
                },
                {
                    name: 'role_id',
                    type: 'list',
                    message: 'Choose the new employees role: ',
                    choices: roles
                },
                {
                    name: 'manager_id',
                    type: 'list',
                    message: 'Choose the new employees manager',
                    choices: employees
                }
                ]).then((res) => {
                    console.log(res)
                    const { first_name, last_name,manager_id ,role_id} = res;
                  
                    db.query('INSERT INTO employee SET ?', 
                    {
                        first_name, last_name, role_id, manager_id
                    },
                    (err, result) => {
                        if (err) throw err;
                        start();
                    })
        })
})
})};

// Add role function ===================
function addRole() {
  db.query(
      'SELECT * FROM department', (err, result) => {
          if (err) throw err;
          const departments = result.map(department => ({name:department.name, value:department.id }));
        //   departments.push({name:"no department", value:null})
          console.log("depatment", departments)
          inquirer
              .prompt([
                  {
                      name: 'title',
                      type: 'input',
                      message: 'Enter title of new role: '
                  },
                  {
                      name: 'salary',
                      type: 'input',
                      message: 'Enter the salary of the new role: ',
                  },
                  {
                      name: 'department',
                      type: 'list',
                      message: 'What department is it in?',
                      choices: departments
                  }
              ]).then((res) => {
                console.log("res", res)
                  const { title } = res;
                  const salary = res.salary;
                  const department_id = res.department;
                  db.query(
                      'insert into role set ?',
                      {
                          title, salary, department_id
                      },
                      (err, result) => {
                          if (err) throw err;
                          start();
                      }
                  )
              });

      }
  )
}

// View department function ============
function viewByDepartment() {
  const query = 'SELECT * FROM department';
  db.query(query, (err, res) => {
      if (err) throw err;
      console.log(table(toTableFormat(res)));
      start();
  });
};

// View roles function =================
function viewRoles() {
  const query = 'SELECT * FROM role';
  db.query(query, (err, res) => {
      if (err) throw err;
      console.log(table(toTableFormat(res)));
      start();
  });
};
// =====================================

// View employees function =============
function viewEmployees() {
  const query = 'SELECT * FROM employee';
  db.query(query, (err, res) => {
      if (err) throw err;
      console.log(table(toTableFormat(res)));
      start();
  });
};

// Update employee roles ===============
function updateEmpRoles() {
  const query = 'SELECT * FROM employee';
  db.query(query, (err, res) => {
      const employees = res.map(employee => {
          return employee.first_name + ' ' + employee.last_name;
      });
      db.query('SELECT * FROM role', (err, result) => {
          const roles = result.map(role => {
              return role.title;
          });
          inquirer
              .prompt([
                  {
                      type: 'list',
                      name: 'employee',
                      message: 'Which employee\'s role do you want to update?',
                      choices: employees
                  },
                  {
                      type: 'list',
                      name: 'role',
                      message: 'What\'s the employee\'s new role?',
                      choices: roles
                  }
              ]).then((answer) => {
                  const id = result.filter(employee => {
                      return employee.first_name + ' ' + employee.last_name === answer.employee;
                  })
            
                  db.query(
                    'UPDATE employee SET role_id = ? WHERE id = ?',
                    [
                        answer.role_id,
                        answer.id,
                    ],
                    (err, result) => {
                          if (err) throw err;
                          start();
                      }
                  )
              })
      })
  })
}

// =====================================

function toTableFormat(arr) {
  const header = Object.keys(arr[0]);
  const rows = arr.map(obj => Object.values(obj));
  return [header, ...rows];
}

start();