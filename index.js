const mysql = require('mysql2');
const con = require('./db/connection');
const cTable = require('console.table');

/*

con.query('SELECT * FROM departments', (err, rows) => {
    if(err) throw err;
    console.table('View all departments', rows);
});

con.query('SELECT roles.id, roles.title, roles.salary, departments.department_name AS department FROM roles LEFT JOIN departments ON roles.department_id = departments.id', (err, rows) => {
    if(err) throw err;
    console.table('View all roles', rows);
});


*/







con.query("SELECT e.id, e.first_name, e.last_name, roles.title, roles.salary, departments.department_name AS department, IFNULL(CONCAT(m.first_name, ' ', m.last_name), 'null') AS 'manager' FROM(((employees e LEFT JOIN roles ON e.role_id = roles.id) LEFT JOIN departments ON roles.department_id = departments.id) LEFT JOIN employees m ON e.manager_id = m.id) ORDER BY e.id", 
    (err, rows) => {
        if(err) throw err;
        console.table('View all employees', rows);
});







con.connect(err => {
    if(err) throw err;
    console.log(`connected to assignment12 database!`);
});