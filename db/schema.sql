DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS departments;

CREATE TABLE departments (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary INTEGER NOT NULL,
    department_id INTEGER,
    CONSTRAINT fk_departments FOREIGN KEY(department_id) REFERENCES departments(id) ON DELETE SET NULL
);

CREATE TABLE employees (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER, 
    CONSTRAINT fk_roles FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE SET NULL,
    manager_id INTEGER   
);



/*
SELECT e.id, e.first_name, e.last_name, roles.title, roles.salary, departments.department_name AS department, IFNULL(CONCAT(m.first_name, ' ', m.last_name), 'null') AS 'manager'
    -> FROM(((employees e
    -> LEFT JOIN roles ON e.role_id = roles.id)
    -> LEFT JOIN departments ON roles.department_id = departments.id)
    -> LEFT JOIN employees m ON e.manager_id = m.id)
    -> ORDER BY e.id;
*/

/* THIS DOESN'T WORK
INSERT INTO employees 
SET first_name = 'DJ', last_name = 'Peng', role_id = (SELECT id FROM roles WHERE title = 'Auror'), manager_id = (SELECT id FROM employees WHERE CONCAT(first_name, ' ', last_name) = 'Alastor Moody')
/*

/* THIS DOESN'T WORK
INSERT INTO employees 
SET first_name = 'DJ', last_name = 'Peng', role_id = (SELECT id FROM roles WHERE title = 'Auror'), manager_id = (SELECT id WHERE CONCAT(first_name, ' ', last_name) as 'Alastor Moody')
*/

/* THIS WORKS BUT MANAGER ID NULL
INSERT INTO employees 
SET first_name = 'DJ', last_name = 'Peng', role_id = (SELECT id FROM roles WHERE title = 'Potions Master'), manager_id = (SELECT employees.id WHERE CONCAT(first_name, ' ', last_name) = 'Albus Dumbledore')
*/
/*
  INSERT INTO employees SET first_name = 'poogeon', last_name = 'poopsypie', role_id = (SELECT id FROM roles WHERE title = 'DA Teacher'),
    -> manager_id = (SELECT employees.id WHERE employees.first_name = 'Rolanda' AND employees.last_name = 'Hooch');
    */