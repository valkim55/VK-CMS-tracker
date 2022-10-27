const mysql = require('mysql2');
const con = require('./db/connection');
const cTable = require('console.table');
const inquirer = require('inquirer');

// import the query functions
const { getAllDeps, getAllRoles, getAllEmployees } = require('./utils/viewTables');
const { addDepartment, addRole, addEmployee } = require('./utils/addToTables');
const { findByDepartment, findByManager, viewCompByDep } = require('./utils/sortTables');

// create departments, roles and employee arrays for 2 reasons: 
// 1 - so user can dynamically access newly added rows as well and, 2 - to sort which roles could be added to and which employees can be assigned as managers
let depsArray = [];
let rolesArray = ['Transfiguration Teacher', 'Gamekeeper', 'Magizoologist', 'Divination Teacher', 'Potions Master', 'DA Teacher', 'Quidditch Referee', 'Gryffindor Quidditch Captain', 
                    'Gryffindor Quidditch Chaser', 'Ravenclaw Quidditch Seeker', 'OOP Member', 'Auror'];
let empArray =  ['Albus Dumbledore', 'Newt Scamander', 'Rolanda Hooch', 'Alastor Moody']; 


// this is where the application starts running 
//this part is designated to display data (SELECT * FROM ... ), prompts for the queries that meant to alter the tables were separated into makeChanges() function
const firstPrompt = () => {
    return inquirer.prompt([    
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Make changes']
        }   
    ]).then((answers) => {
        
        if(answers.action === 'View all departments') {
           return getAllDeps()
            .then(() => {
                return firstPrompt();
            });
        } else if(answers.action === 'View all roles') {
            return getAllRoles()
            .then(() => {
                return firstPrompt();
            });
        } else if(answers.action === 'View all employees') {
            return getAllEmployees()
            .then(() => {
                return firstPrompt();
            })
        } else {
            return makeChanges();
        }
    });
};

// if a user chooses to 'Make changes' this series of prompts will run
function makeChanges() {
    return inquirer.prompt([    
        {
            type: 'list',
            name: 'action',
            message: 'What changes would you like to make?',
            choices: ['Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'More filters', 'Exit']
        }   
    ]).then((answers) => {
        if(answers.action === 'Add a department') {
            //console.log('adding a new department!')
            return inquirer.prompt([    
                {
                    type: 'input',
                    name: 'newDep',
                    message: 'Please enter new department name: ',
                    validate: newDepInput => {
                        if(newDepInput) {
                            addDepartment(newDepInput);
                            depsArray.push(newDep);
                            //console.log(depsArray);
                            return true;
                        } else {
                            console.log("You have to provide department name");
                            return false;
                        }
                    } 
                } 
            ]).then(() => getAllDeps()).then(() => firstPrompt());

        } else if(answers.action === 'Add a role') {
            //console.log('adding a new role!')
            return inquirer.prompt([
                {
                    type: 'input',
                    name: 'roleTitle',
                    message: 'Please enter new role title: ',
                    validate: roleTitleInput => {
                        if(roleTitleInput) {                           
                            return true;
                        } else {
                            console.log("You have to provide a new title");
                            return false;
                        }
                    } 
                },
                {
                    type: 'input',
                    name: 'roleSalary',
                    message: 'What is the salary for this role? ',
                    validate: roleSalaryInput => {
                        if(roleSalaryInput) {                           
                            return true;
                        } else {
                            console.log("You have to provide a salary value");
                            return false;
                        }
                    } 
                },
                {
                    type: 'input',
                    name: 'roleDep',
                    message: 'Which department does this role belong to?',
                    validate: roleDepInput => {
                        if(roleDepInput) {                           
                            return true;
                        } else {
                            console.log("You have to provide a name of the corresponding department");
                            return false;
                        }
                    } 
                }
            ])
            .then((answers) => {
                rolesArray.push(answers.roleTitle);
                //console.log(rolesArray);
                return addRole(answers);
            }).then(() => firstPrompt());

        } else if(answers.action === 'Add an employee') {
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'firstName',
                    message: "What is new employee's first name?",
                    validate: firstNameInput => {
                        if(firstNameInput) {
                            return true;
                        }
                        console.log("Please provide a valid first name");
                        return false;
                    }
                },
                {
                    type: 'input',
                    name: 'lastName',
                    message: "What is new employee's last name?",
                    validate: lastNameInput => {
                        if(lastNameInput) {
                            return true;
                        }
                        console.log("Please provide a valid last name");
                        return false;
                    }
                },
                {
                    type: 'list',
                    name: 'newEmpRole',
                    message: "What is employee's role?",
                    choices: rolesArray
                },
                {
                    type: 'list',
                    name: 'newEmpMan',
                    message: "Who is employee's manager?",
                    choices: empArray
                }
            ])
            .then((answers) => {
                empArray.push(answers.newEmpRole);
                //console.log(empArray);
                return addEmployee(answers);
            }).then(() => firstPrompt());
            
        } else if(answers.action === 'More filters') {
            return otherActions();
        } else {
            return;
        }
    });
};

// extra features such as, find by manager, find by department, total expenses 
function otherActions() {
    return inquirer.prompt([    
        {
            type: 'list',
            name: 'chooseNext',
            message: 'What else would you like to do?',
            choices: ['Filter by department', 'Total compensation by department', 'Delete a role', 'Exit']
        },
        {

        }   
    ]).then((answers) => {
        if(answers.chooseNext === 'Filter by department') {
            return;
    
        
        } else if(answers.chooseNext === 'Total compensation by department') {
            return;
        
        

        } else if(answers.chooseNext === 'Delete a role') {
            
        
        } else {
            return;
        }
    });
};


firstPrompt();
   