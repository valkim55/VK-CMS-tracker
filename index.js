const mysql = require('mysql2');
const con = require('./db/connection');
const cTable = require('console.table');
const inquirer = require('inquirer');

const {getAllDeps, getAllRoles, getAllEmployees} = require('./utils/mysqlQueries')

con.connect(err => {
    if(err) throw err;
    //console.log(`connected to assignment12 database!`);
});



const actionPrompt = {
    type: 'list',
    name: 'action',
    message: 'Where would you like to start?',
    choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role']
};

const nextPrompt = {
    type: 'list',
    name: 'action',
    message: 'What would you like to do next?',
    choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role']
}



function loadHogwartsData() {
    console.log('Welcome to Hogwarts, Mr. Fudge!');
    viewAll();
}


function viewAll() {
    inquirer.prompt(actionPrompt).then((answers) => {
       
        if(answers.action === 'View all departments') {
            
            getAllDeps();
            

        } else if(answers.action === 'View all roles') {
            getAllRoles();
            startOver();

        } else if(answers.action === 'View all employees') {
            getAllEmployees();
            startOver();
        } else {
            makeChanges();
        }
    });
};


function makeChanges() {
    inquirer.prompt(actionPrompt).then((answers) => {
        if(answers.firstAction === 'Add a department') {

        } else if(answers.firstAction === 'Add a role') {

        } else if(answers.firstAction === 'Add an employee') {

        } else if(answers.firstAction === 'Update an employee role') {

        } else {
            return;
        }
    })
}


function startOver() {
    inquirer.prompt(nextPrompt).then((answers) => {
        viewAll(answers);

    })
}

loadHogwartsData();