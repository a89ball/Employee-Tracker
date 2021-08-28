DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE role(
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT
    PRIMARY KEY (id)
);

CREATE TABLE employee(
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id VARCHAR(30),
    manager_id INT,
    PRIMARY KEY (id)
);

INSTERT INTO department(name)
VALUES("HR"), ("Tech"), ("Admin"), ("Management");

INSERT INTO role(title, salary, department_id)
VALUES ("Director", 5700, 1), ("Manager", 4000, 2) ("Web Dev", 3000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES("John", "Smith", "Manager", 1) ("Daniel" "James", "Web Dev", 2)