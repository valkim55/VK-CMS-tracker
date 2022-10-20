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
        ('Transfiguration Teacher', 100.000, 1),
        ('Gamekeeper', 60.000, 2),
        ('Magizoologist', 80.000, 2),
        ('Divination Teacher', 70.000, 3),
        ('Potions Master', 100.000, 4),
        ('DA Teacher', 100.000, 5),
        ('Referee', 90.000, 6),
        ('Gryffindor Quidditch Captain', 80.000, 6),
        ('Slytherin Quidditch Captain', 80.000, 6),
        ('Hufflepuff Quidditch Captain', 80.000, 6),
        ('Ravenclaw Quidditch Captain', 80.000, 6),
        ('Gryffindor Quidditch Chaser', 80.000, 6),
        ('Ravenclaw Quidditch Seeker', 80.000, 6),
        ('OOP Leader', 180.000, 7),
        ('OOP Member', 130.000, 7),
        ('Auror', 150.000, 7),
        ('Hogwarts Headmaster', 200.000, 8);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
    VALUES 
        ('Albus', 'Dumbledore', 17, NULL),
        ('Minerva', 'McGonagall', 1, 1),
        ('Rubeus', 'Hagrid', 2, 4),
        ('Newt', 'Scamander', 3, 1),
        ('Sybill', 'Trelawney', 4, 1),
        ('Horace', 'Slughorn', 5, 1),
        ('Severus', 'Snape', 5, 1),
        ('Quirinus', 'Quirrell', 6, 1),
        ('Gilderoy', 'Lockhart', 6, 1),
        ('Remus', 'Lupin', 6, 1),
        ('Rolanda', 'Hooch', 7, 1),
        ('Oliver', 'Wood', 8, 11),
        ('Marcus', 'Flint', 9, 11),
        ('Cedric', 'Diggory', 10, 11),
        ('Roger', 'Davies', 11, 11),
        ('Angelina', 'Johnson', 12, 11),
        ('Cho', 'Chang', 13, 11),
        ('Alastor', 'Moody', 14, NULL),
        ('Bill', 'Weasley', 15, 18),
        ('Nymphadora', 'Tonks', 16, 18),
        ('Sirius', 'Black', 15, 18),
        ('Kingsley', 'Shacklebolt', 16, NULL);