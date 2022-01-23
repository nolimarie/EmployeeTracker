const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const fs = require('fs');
var figlet = require('figlet');

// Connect to database
const db = mysql.createConnection(
    {
        host: "localhost",
        // Your MySQL username,
        user: "root",
        // Your MySQL password
        password: "4Coding!",
        database: "employeetracker_db",
    },
    console.log("Connected to the employeetracker database.")
);

figlet("Employee \n Tracker!", function (err, data) {
    if (err) {
        console.log("Something went wrong...");
        console.dir(err);
        return;
    }
});

const promptUser = () => {
    return inquirer.prompt([
            {
                type: "list",
                name: "start",
                message: "What would you like to do?",
                choices: [
                    "View all departments",
                    "View all roles",
                    "View all employees",
                    "Add a department",
                    "Add a role",
                    "Add an employee",
                    "Update an employee role",
                    "Quit"
                ],
            },
        ])
        .then((result) => {
            switch (result.start) {
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

                case "Add an employee":
                    addEmployee();
                    break;

                case "Update an employee role":
                    updateEmployee();
                    break;

                case "Quit":
                    db.exit();
                    break;
                
                default:
                    break;
            }
        });
};

const viewDepartments = () => {
    db.query("SELECT * FROM departments", (err, res) => {
        if (err) throw err;
        console.table(res);
        promptUser();
    });
};

const viewRoles = () => {
    db.query("SELECT * FROM roles", (err, res) => {
        if (err) throw err;
        console.table(res);
        promptUser();
    });
};

const viewEmployees = () => {
    db.query("SELECT * FROM employees", (err, res) => {
        if (err) throw err;
        console.table(res);
        promptUser();
    });
};

const addDepartment = () => {
    return inquirer.prompt([
            {
                type: "input",
                name: "dFirst",
                message: "What is the department name?",
                validate: (dFirstInput) => {
                    if (dFirstInput) {
                        return true;
                    } else {
                        console.log("Please enter the department name.");
                        return false;
                    }
                },
            },
        ])
        .then((result) => {
            db.query(
                "INSERT INTO departments SET ?",
                {
                    name: `${result.dFirst}`,
                },
                (err, res) => {
                    if (err) throw err;
                    console.log(`
          =========================
          Department has been added
          =========================
          `);
                    promptUser();
                }
            );
        });
};

const addRole = () => {
    return inquirer.prompt([
            {
                type: "input",
                name: "rFirst",
                message: "What is the title?",
                validate: (rFirstInput) => {
                    if (rFirstInput) {
                        return true;
                    } else {
                        console.log("Please enter the title.");
                        return false;
                    }
                },
            },
            {
                type: "input",
                name: "rSecond",
                message: "What is the salary?",
                validate: (rSecondInput) => {
                    if (rSecondInput) {
                        return true;
                    } else {
                        console.log("Please enter the salary.");
                        return false;
                    }
                },
            },
            {
                type: "input",
                name: "rThird",
                message: "What is the department ID?",
                validate: (rThirdInput) => {
                    if (rThirdInput) {
                        return true;
                    } else {
                        console.log("Please enter the department ID.");
                        return false;
                    }
                },
            },
        ])
        .then((result) => {
            db.query(
                "INSERT INTO roles SET ?",
                {
                    title: `${result.rFirst}`,
                    salary: `${result.rSecond}`,
                    department_id: `${result.rThird}`,
                },
                (err, res) => {
                    if (err) throw err;
                    console.log(`
          ===================
          Role has been added
          ===================
          `);
                    promptUser();
                }
            );
        });
};

const addEmployee = () => {
    return inquirer.prompt([
            {
                type: "input",
                name: "eFirst",
                message: "What is the First Name?",
                validate: (eFirstInput) => {
                    if (eFirstInput) {
                        return true;
                    } else {
                        console.log("Please enter the First Name.");
                        return false;
                    }
                },
            },
            {
                type: "input",
                name: "eSecond",
                message: "What is the Last Name?",
                validate: (eSecondInput) => {
                    if (eSecondInput) {
                        return true;
                    } else {
                        console.log("Please enter the Last Name.");
                        return false;
                    }
                },
            },
            {
                type: "input",
                name: "eThird",
                message: "What is the role ID?",
                validate: (eThirdInput) => {
                    if (eThirdInput) {
                        return true;
                    } else {
                        console.log("Please enter the role ID.");
                        return false;
                    }
                },
            },
            {
                type: "input",
                name: "eFourth",
                message: "What is the manager ID?",
                validate: (eFourthInput) => {
                    if (eFourthInput) {
                        return true;
                    } else {
                        console.log("Please enter the manager ID.");
                        return false;
                    }
                },
            },
        ])
        .then((result) => {
            db.query(
                "INSERT INTO employees SET ?",
                {
                    first_name: `${result.eFirst}`,
                    last_name: `${result.eSecond}`,
                    role_id: `${result.eThird}`,
                    manager_id: `${result.eFourth}`,
                },
                (err, res) => {
                    if (err) throw err;
                    console.log(`
            =======================
            Employee has been added
            =======================
            `);
                    promptUser();
                }
            );
        });
};

const updateEmployee = () => {
    return inquirer.prompt([{
                type: "input",
                name: "uFirst",
                message: "What is the ID of the employee you would like to update?",
                validate: (uFirstInput) => {
                    if (uFirstInput) {
                        return true;
                    } else {
                        console.log("Please enter the employee ID.");
                        return false;
                    }
                },
            },
            {
                type: "input",
                name: "uSecond",
                message: "What is their new role ID?",
                validate: (uSecondInput) => {
                    if (uSecondInput) {
                        return true;
                    } else {
                        console.log("Please enter the role ID.");
                        return false;
                    }
                },
            },
        ])
        .then((result) => {
            db.query(
                "UPDATE employees SET ? WHERE ?",
                [{
                    role_id: `${result.uSecond}`,
                },
                {
                    id: `${result.uFirst}`,
                },
                ],
                (err, res) => {
                    if (err) throw err;
                    console.log(`
            =========================
            Employee has been updated
            =========================
            `);
                    promptUser();
                }
            );
        });
};

function exit() {
    connection.end();
};

promptUser().catch((err) => {
    console.log(err);
});