const mysql = require('mysql2/promise');

const con = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "KittyM2wm@w2023",
        database: "assignment12"
    }
);


module.exports = con;