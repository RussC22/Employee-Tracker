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
  const answer = await inquirer.prompt([
    {
      type: "input",
      message: "What is the name of the role?",
      name: "role",
    },
  ]);
  const roles = await db.query("insert into role(name) values(?)", [
    answer.roles,
  ]);
  console.log("Role Added");
  app();
}
async function addEmployee() {
  const answer = await inquirer.prompt([
    {
      type: "input",
      message: "What is the name of the employee?",
      name: "employee",
    },
  ]);
  const employee = await db.query("insert into employee(name) values(?)", [
    answer.roles,
  ]);
  console.log("Employee Added");
  app();
}
