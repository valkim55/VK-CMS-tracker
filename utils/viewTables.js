
const mysql = require('mysql2/promise');
const con = require('../db/connection');
const cTable = require('console.table');


const getAllDeps = () => {
    return con.then((con) => {
        return con.query('SELECT * FROM departments')})
        .then(([rows]) => {
            console.table(`Hogwarts departments:`, rows)
    }).catch((err) => {
        console.log(`${err} error ocurred`)
    })
};

const getAllRoles = () => {
    return con.then((con) => {
        return con.query('SELECT roles.id, roles.title, roles.salary, departments.department_name AS department FROM roles LEFT JOIN departments ON roles.department_id = departments.id')})
        .then(([rows]) => {
            console.table(`Currently occupied positions in all departments: `, rows);
    }).catch((err) => { 
        console.log(`${err} error ocurred`);
    })
};

const getAllEmployees = () => {
    return con.then((con) => {
        return con.query("SELECT e.id, e.first_name, e.last_name, roles.title, roles.salary, departments.department_name AS department, IFNULL(CONCAT(m.first_name, ' ', m.last_name), 'null') AS 'manager' FROM(((employees e LEFT JOIN roles ON e.role_id = roles.id) LEFT JOIN departments ON roles.department_id = departments.id) LEFT JOIN employees m ON e.manager_id = m.id) ORDER BY e.id")})
        .then(([rows]) => {
            console.table(`Current Hogwarts staff:`, rows);
    }).catch((err) => {
        console.log(`${err} error ocurred`)
    })    
};





module.exports = {getAllDeps, getAllRoles, getAllEmployees};