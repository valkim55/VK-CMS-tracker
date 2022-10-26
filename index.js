const mysql = require('mysql2');
const con = require('./db/connection');
const cTable = require('console.table');
const inquirer = require('inquirer');

const {getAllDeps, getAllRoles, getAllEmployees, addDepartment, addRole} = require('./utils/mysqlQueries')


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
    
    })
};


function makeChanges() {
    return inquirer.prompt([    
        {
            type: 'list',
            name: 'action',
            message: 'What changes would you like to make?',
            choices: ['Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Exit']
        }   
    ]).then((answers) => {
        if(answers.action === 'Add a department') {
            console.log('adding a new department!')
            return inquirer.prompt([    
                {
                    type: 'input',
                    name: 'newDep',
                    message: 'Please enter new department name: ',
                    validate: newDepInput => {
                        if(newDepInput) {
                            addDepartment(newDepInput);                            
                            return true;
                        } else {
                            console.log("You have to provide department name");
                            return false;
                        }
                    } 
                } 
            ]).then(() => getAllDeps()).then(() => firstPrompt());

        } else if(answers.action === 'Add a role') {
            console.log('adding a new role!')
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
                            console.log("You have to provide a salary");
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
            ]).then(({answers}) => addRole({answers})).then(() => firstPrompt());

        } else if(answers.action === 'Add an employee') {
            return console.log('adding a new employee!')
        } else if(answers.action === 'Update an employee role') {
            return console.log('updating records!')
        } else if(answers.action === 'Exit') {
            return;
        }
    })
    
}





firstPrompt()
    .then(() => {
        console.log('hi');
    })