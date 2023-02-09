const inquirer = require("inquirer");
require("console.table");
const db = require("./db/connecttion");
const utils = require("util");
db.query = utils.promisify(db.query);
