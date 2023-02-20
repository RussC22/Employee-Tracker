-- database for sql
drop database if exists employeeTracker;
Create database employeeTracker;
use employeeTracker;
-- tables that fill the database
Create table department
(
    id integer
    auto_increment primary key,
    name VARCHAR
    (30)
);
    Create table role
    (
        id integer
        auto_increment primary key,
    title VARCHAR
        (30),
    salary Decimal
        (8,0),
    department_id integer
);
        Create table employee
        (
            id integer
            auto_increment primary key,
    first_name VARCHAR
            (30),
    last_name VARCHAR
            (30),
    role_id integer,
    manager_id integer
 );
