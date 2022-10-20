const mysql = require('mysql2');
const con = require('./db/connection');

con.query('SELECT * FROM departments', (err, rows) => {
    if(err) throw err;
    console.log(rows);
});

con.query('SELECT * FROM roles', (err, rows) => {
    if(err) throw err;
    console.log(rows);
});

con.query('SELECT * FROM employees', (err, rows) => {
    if(err) throw err;
    console.log(rows);
});

con.connect(err => {
    if(err) throw err;
    console.log(`connected to assignment12 database!`);
});