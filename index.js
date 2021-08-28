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
connection.connect(function (err) {
    if (err) throw err;
    console.log("mySQL connected");

    start();
});
function start() {
    inquirer.prompt([
        {
        type: 'list',
        name: 'selection',
        message: 'What would you like to do?',
        choices: [
            "View",
            "Add",
            "Update",
            "Exit"
        ]
    }

    ]).then(function (res) {
        switch (res.start) {
            case "View":
                view();
                break;
            case "Add":
                add();
                break;
            case "Update":
                updateEmployee();
                break;
            case "Exit":
                console.log("All done")
                break;
            default:
                console.log("default");
                break;
        }
    })
}

function view(){
    inquirer.prompt([
        {
            type: "list",
            name: "view",
            message: "Please select one of the following",
            choices: ["All employees", "By department", "By role"]

        }
    ]).then(function(res){
        switch (res.view) {
            case "All employees":
                viewAllEmployees();
                
                break;
                case "By department":
                    viewAllEmployees();
                    
                    break;
                case "By role":
                    viewByRole();
        
            default:
                console.log("default");

        }
    });
}