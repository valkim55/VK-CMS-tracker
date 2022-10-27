const mysql = require('mysql2/promise');
const con = require('../db/connection');
const cTable = require('console.table');


// this query returns all employees from a selected department, their id, titles, salaries, managers
const findByDepartment = ({chooseDep}) => {
    return con.then((con) => {
        //console.log(`${chooseDep}`);
        let queryString = "SELECT e.id, CONCAT_WS(' ', e.first_name, e.last_name) AS 'employee_name', roles.title, roles.salary, IFNULL(CONCAT(m.first_name, ' ', m.last_name), 'null') AS 'manager' FROM (((employees e LEFT JOIN roles ON e.role_id = roles.id) LEFT JOIN employees m ON e.manager_id = m.id) LEFT JOIN departments ON roles.department_id = departments.id) WHERE department_name = '" + chooseDep + "'"
        return con.query(queryString)
        .then(([rows]) => {
            console.table(`Full information about ${chooseDep} department`, rows);
        })
    }).catch((err) => {
        console.log(`${err} error ocurred`)
    })
}

// this query deletes selected role from the table and all associated rows become null
const deleteRole = ({roleDelete}) => {
    return con.then((con) => {
        //console.log(`${roleDelete}`);
        let queryString = "DELETE FROM roles WHERE title = '" + roleDelete + "'"
        return con.query(queryString)
        .then(() => {
            console.table(`Role ${roleDelete} deleted`);
        })
    }).catch((err) => {
        console.log(`${err} error ocurred`)
    })
}

// this query returns a total sum of employee salaries from selected department
const viewCompByDep = ({chooseComp}) => {
    return con.then((con) => {
        console.log(`${chooseComp}`);
        let queryString = "SELECT SUM(salary) AS 'Total employee compensation', departments.department_name FROM roles LEFT JOIN departments ON department_name = '" + chooseComp + "' WHERE roles.department_id = departments.id"
        return con.query(queryString)
        .then(([rows]) => {
            console.table(`Total compensation expenses at ${chooseComp} department`, rows);
        })
    }).catch((err) => {
        console.log(`${err} error ocurred`)
    })
}


module.exports = {findByDepartment, deleteRole, viewCompByDep}