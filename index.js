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

//View functions list

function view() {
    inquirer.prompt([
        {
            type: "list",
            name: "view",
            message: "Please select one of the following",
            choices: ["All employees", "By department", "By role"]

        }
    ]).then(function (res) {
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

function viewAllEmployees() {

    connection.query("Select e.id AS ID, e.first_name AS first, e.last_name AS last, e.role_id AS role, r.salary AS Salary, m.last name AS Manager, d.name LEFT JOIN role r ON e.role_id = r.title LEFT JOIN department d ON r. department_id = d.id",
        function (err, results) {
            if (err) throw err;
            console.table(results);
            start()
        })
};

function viewByDepartment() {

    connection.query(
        "SELECT id, name AS department FROM department", function (err, results) {
            if (err) throw err;

            inquirer.prompt([
                {
                    name: "choice",
                    type: "rawlist",
                    choices: function () {
                        let choiceArr = []
                        for (i=0; i < array.length; i++){
                            choiceArr.push(results[i].name);
                        }
                        return choiceArr;
                    },
                    message: "Select department"

                }
            ]).then(function (answer) {
                connection.query(
                    "Select e.id AS ID, e.first_name AS first, e.last_name AS Last, e.role_id AS role, r.salary AS Salary, m.last name AS Manager, d.name AS Department FROM employee e LEFT JOIN employee m ON e.manager id= m.id LEFT JOIN role r ON e.role_id = r.title LEFT JOIN department d ON r.department_id = d.id WHERE d.name=?",
                    function (err, res) {
                        if (err) throw err;
                        console.table(res);
                        start()

                    }
                )
            });

        });

}



function viewByRole() {
    connection.query(
        "SELECT title FROM role", function (err, results) {
            if (err) throw err;

            inquirer.prompt([
                {
                    name: "choice",
                    type: "rawlist",
                    choices: function () {
                        let choiceArr = []
                        for (i = 0; i < array.length; i++) {
                            choiceArr.push(results[i].name);
                        }
                        return choiceArr;
                    },
                    message: "Select role"

                }
            ]).then(function (answer) {
                connection.query(
                    "Select e.id AS ID, e.first_name AS first, e.last_name AS Last, e.role_id AS Role, r.salary AS Salary, m.last_name AS Manager, d.name AS Department FROM employee e LEFT JOIN employee m ON e.manager_id =m.id role r ON e.role_id = r.title LEFT JOIN department d ON r. department_id = d.id WHERE e.role_id =?",
                    [answer.choice],
                    function (err, results) {
                        if (err) throw err;
                        console.table(results);
                        start();
                    }
                )
            });


        });
}

    function add(){
        inquirer.prompt([
            {
                type: "list",
                name: "add",
                message:"What would you like to add?",
                choices: ["Department", "Employee role", "Employee"]
            
            }
        ]).then(function(res){
            switch (res.add) {
                case "Department":
                    addDepartment();
                    
                    break;
                case "Employee role":
                    addEmployeerole();
                    break;
                case "Employee":
                    addEmployeerole();

                    break;
           
                default:
                    console.log("default");
            }
        })
    }

    function addDepartment(){
        inquirer.prompt([
            {
                name: "department",
                type: "input",
                message: "What is the name of the department?"
    
            }
        ]).then(function(answer){
            connection.query(
                "INSERT INTO department VALUES (DEFAULT, ?)",
                [answer.department],
                function(err){
                    if(err) throw err;
                    console.log("Department name is now" + answer.department);

                    start();
                }
            )
        })

    }