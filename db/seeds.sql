INSERT INTO departments (department_name) 
    VALUES
        ('Transfiguration'),
        ('Care of Magical Creatures'),
        ('Divination'),
        ('Potions'),
        ('Defence against the Dark Arts'),
        ('Quidditch Team'),
        ('Order Of Phoenix'),
        ('Office of Headmaster');
        

INSERT INTO roles (title, salary, department_id)
    VALUES 
       ('Hogwarts Headmaster', 200000, 8),
       ('Transfiguration Teacher', 100000, 1),
       ('Gamekeeper', 60000, 2),
       ('Magizoologist', 80000, 2),
       ('Divination Teacher', 70000, 3),
       ('Potions Master', 100000, 4),
       ('DA Teacher', 100000, 5),
       ('Quidditch Referee', 90000, 6),
       ('Gryffindor Quidditch Captain', 80000, 6),
       ('OOP Leader', 180000, 7),
       ('Auror', 150000, 7);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
    VALUES 
       ('Albus', 'Dumbledore', 1, NULL),
       ('Minerva', 'McGonagall', 2, 1),
       ('Rubeus', 'Hagrid', 3, 4),
       ('Newt', 'Scamander', 4, 1),
       ('Sybill', 'Trelawney', 5, 1),
       ('Horace', 'Slughorn', 6, 1),
       ('Severus', 'Snape', 6, 1),
       ('Gilderoy', 'Lockhart', 7, 1),
       ('Remus', 'Lupin', 7, 1),
       ('Rolanda', 'Hooch', 8, 1),
       ('Oliver', 'Wood', 9, 10),
       ('Alastor', 'Moody', 10, NULL),
       ('Nymphadora', 'Tonks', 11, 12);
     

/* writing alter table statement here because since manager_id is the second foreign key the table and it's values has to be defined first before it can be altered to self-reference*/
ALTER TABLE employees ADD CONSTRAINT sr_fk_emp_man FOREIGN KEY (manager_id) REFERENCES employees(id);