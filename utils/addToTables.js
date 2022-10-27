const mysql = require('mysql2/promise');
const con = require('../db/connection');
const cTable = require('console.table');



// this query takes user's input from the 'newDep' prompt as an argument and then passes it into the query as a VALUES parameter
const addDepartment = (newDep) => {
    return con.then((con) => {
        return con.query("INSERT INTO departments (department_name) VALUES (?)", newDep)
        .then(() => {
            console.table(`${newDep} was added to the database!`);
        })
    }).catch((err) => {
        console.log(`${err} error ocurred`)
    })
}

// this query requires multiple values, so I'm taking 'answers' object from inquirer and destructuring to extract the values to pass into the SQL query
const addRole = ({roleTitle, roleSalary, roleDep}) => {
    return con.then((con) => {
        //console.log(roleTitle, roleSalary, roleDep);
        // wrapped the SQl query into a string variable because con.query wasn't able to read a query and access destructured objects in one line
        let queryString = "INSERT INTO roles SET title = '" + roleTitle + "', salary = '" + roleSalary + "', department_id = (SELECT id FROM departments WHERE department_name = '" + roleDep + "')"
        return con.query(queryString)
        .then(() => {
            console.table(`${roleTitle} was added to the database!`);
        })
    }).catch((err) => {
        console.log(`${err} error ocurred`)
    })
}

const addEmployee = ({firstName, lastName, newEmpRole, newEmpMan}) => {
    return con.then((con) => {
        //console.log(`these are query values ${firstName}, ${lastName}, ${newEmpRole}, ${newEmpMan}`);
        let queryString = "INSERT INTO employees SET first_name = '" + firstName + "', last_name = '" + lastName + "', role_id = (SELECT id FROM roles WHERE title = '" + newEmpRole + "'), manager_id = (SELECT employees.id WHERE CONCAT_WS(' ', first_name, last_name) = '" + newEmpMan + "')"
        return con.query(queryString)
        .then(() => {
            console.table(`${firstName} ${lastName} was added to the database!`)
        })
    }).catch((err) => {
        console.log(`${err} error ocurred`);
    })
}



module.exports = {addDepartment, addRole, addEmployee};