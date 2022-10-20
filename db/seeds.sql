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
        ('Hogwarts Headmaster', 200.000, 8),
        ('Transfiguration Teacher', 100.000, 1),
        ('Gamekeeper', 60.000, 2),
        ('Magizoologist', 80.000, 2),
        ('Divination Teacher', 70.000, 3),
        ('Potions Master', 100.000, 4),
        ('DA Teacher', 100.000, 5),
        ('Quidditch Referee', 90.000, 6),
        ('Gryffindor Quidditch Captain', 80.000, 6),
        ('Slytherin Quidditch Captain', 80.000, 6),
        ('Hufflepuff Quidditch Captain', 80.000, 6),
        ('Ravenclaw Quidditch Captain', 80.000, 6),
        ('Gryffindor Quidditch Chaser', 80.000, 6),
        ('Ravenclaw Quidditch Seeker', 80.000, 6),
        ('OOP Leader', 180.000, 7),
        ('OOP Member', 130.000, 7),
        ('Auror', 150.000, 7);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
    VALUES 
        ('Albus', 'Dumbledore', 1, NULL),
        ('Minerva', 'McGonagall', 2, 1),
        ('Rubeus', 'Hagrid', 3, 4),
        ('Newt', 'Scamander', 4, 1),
        ('Sybill', 'Trelawney', 5, 1),
        ('Horace', 'Slughorn', 6, 1),
        ('Severus', 'Snape', 6, 1),
        ('Quirinus', 'Quirrell', 7, 1),
        ('Gilderoy', 'Lockhart', 7, 1),
        ('Remus', 'Lupin', 7, 1),
        ('Rolanda', 'Hooch', 8, 1),
        ('Oliver', 'Wood', 9, 11),
        ('Marcus', 'Flint', 10, 11),
        ('Cedric', 'Diggory', 11, 11),
        ('Roger', 'Davies', 12, 11),
        ('Angelina', 'Johnson', 13, 11),
        ('Cho', 'Chang', 14, 11),
        ('Alastor', 'Moody', 15, NULL),
        ('Bill', 'Weasley', 16, 18),
        ('Nymphadora', 'Tonks', 17, 18),
        ('Sirius', 'Black', 16, 18),
        ('Kingsley', 'Shacklebolt', 17, NULL);


/* writin alter table statement here because since manager_id is the second foreign key the table and it's values has to be defined first before it can be altered to self-reference*/
ALTER TABLE employees ADD CONSTRAINT sr_fk_emp_man FOREIGN KEY (manager_id) REFERENCES employees(id);