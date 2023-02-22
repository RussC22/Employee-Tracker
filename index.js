// Packages
const inquirer = require("inquirer");
require("console.table");
const db = require("./db/connecttion");
const utils = require("util");
const { getRandomValues } = require("crypto");
db.query = utils.promisify(db.query);
// async function to make the javaScript wait until data is pull
async function app() {
  const answer = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "What would you like to do?",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a department",
        "Add a role",
        "Add a employee",
        "Update a employees role",
        "Quit",
      ],
    },
  ]);
  //   Actions and answers for user
  switch (answer.action) {
    case "View all departments":
      viewDepartments();
      break;
    case "View all roles":
      viewRoles();
      break;
    case "View all employees":
      viewEmployees();
      break;
    case "Add a department":
      addDepartment();
      break;
    case "Add a role":
      addRole();
      break;
    case "Add a employee":
      addEmployee();
      break;
    case "Update a employees role":
      updateEmployeeRole();
      break;
    case "Quit":
      db.close();
      break;
  }
}
// calling the app to wait as data is retrieved from the department table
app();
async function viewDepartments() {
  const departments = await db.query("select * from department");
  console.table(departments);
  app();
}
async function viewRoles() {
  const roles = await db.query(
    "select role.title, role.id, role.salary,department.name from role join department on role.department_id=department.id"
  );
  console.table(roles);
  app();
}
async function viewEmployees() {
  const employees = await db.query(
    `SELECT employee.id, employee.first_name AS "first name", employee.last_name AS "last name", role.title, department.name AS department, role.salary, concat(manager.first_name, " ", manager.last_name) AS manager FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id JOIN employee manager ON manager.id = employee.manager_id`
  );
  console.table(employees);
  app();
}
// input function
async function addDepartment() {
  const answer = await inquirer.prompt([
    {
      type: "input",
      message: "What is the name of the new department?",
      name: "department",
    },
  ]);
  const department = await db.query("insert into department(name) values(?)", [
    answer.department,
  ]);
  console.log("Department Added");
  app();
}
async function addRole() {
  const answers = await inquirer.prompt([
    {
      type: "input",
      message: "What is the name of the new role?",
      name: "role",
    },
    {
      type: "input",
      message: "What is the salary of the role?",
      name: "salary",
    },
    {
      type: "input",
      message: "What is the department id that the role is associated with?",
      name: "department_id",
    },
  ]);
  const department = await db.query(
    "insert into role(title,salary,department_id) values(?,?,?)",
    [answers.role, answers.salary, answers.department_id]
  );
  console.log("Role & id");
  app();
}
async function addEmployee() {
  const answers = await inquirer.prompt([
    {
      type: "input",
      message: "What is the first name of the new employee?",
      name: "first_name",
    },
    {
      type: "input",
      message: "What is the last name of the new employee?",
      name: "last_name",
    },
    {
      type: "input",
      message: "What is the employees role?",
      name: "role_id",
    },
    {
      type: "input",
      message: "Who is the employees manager?",
      name: "manager_id",
    },
  ]);
  const department = await db.query(
    "insert into employee(first_name,last_name,role_id, manager_id) values(?,?,?,?)",
    [answers.first_name, answers.last_name, answers.role_id, answers.manager_id]
  );
  console.log("employee info & id");
  app();
}
async function updateEmployeeRole() {
  const update = await inquirer
    .prompt([
      {
        type: "input",
        message: "Which employee would you like to change?",
        name: "employee_id",
      },
      {
        type: "input",
        message: "Whats is the new role for the employee?",
        name: "role",
      },
    ])
    .then((data) => {
      db.query(
        `update employee set role_id = ? where id = ?`,
        [data.role, data.employee_id],
        (error, results) => {
          console.log("update happened");
        }
      );
    });
  const updateEmployee = await db.query(
    "insert into employee(first_name,last_name,role_id, manager_id) values(?,?,?,?)",
    [update.employee_id, update.last_name, update.role_id, update.manager_id]
  );
  console.log("update employee");
  app();
}
