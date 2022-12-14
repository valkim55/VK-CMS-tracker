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

SELECT e.id, CONCAT_WS(' ', e.first_name, e.last_name) AS 'employee_name', roles.title, roles.salary, IFNULL(CONCAT(m.first_name, ' ', m.last_name), 'null') AS 'manager'
FROM (((employees e 
LEFT JOIN roles ON e.role_id = roles.id)
LEFT JOIN employees m ON e.manager_id = m.id)
LEFT JOIN departments ON roles.department_id = departments.id) 
WHERE department_name = 'Transfiguration'; 

 SELECT SUM(salary) AS 'Total employee compensation', departments.department_name FROM roles LEFT JOIN departments ON department_name = 'Care of Magical Creatures' WHERE roles.department_id = departments.id;


*/