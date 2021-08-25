//Defining dependencies
const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");

//Connection for SQL DB
const connection = mysql.createConnection({
    host: "localhost",
    
    //Port
    port: 3306,
    //Username
    user: "root",
    //Password
    password: "Babazoolay11",
    database: "Employee_Tracker.db",
});
//Connect to server and db
connection.connect(function(err){
    if(err) throw err;
    console.log("mySQL connected");

    start();
});

const menu = () =>
  inquirer.prompt({
    type: 'list',
    name: 'selection',
    message: 'What would you like to do?',
    choices: [
      'View employees',
      'View employees by manager',
      'Add employee',
      'Update employee manager',
      'Update employee role',
      'Delete employee',
      'View roles',
      'Add role',
      'Delete role',
      'View departments',
      'View department budget',
      'Add department',
      'Delete department',
      'Exit',
    ],
  });
