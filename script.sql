ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'UserPassword01';

CREATE DATABASE if not exists users;
USE users;

CREATE TABLE account(
	id INT NOT NULL,
    user varchar(45) default null unique,
    name varchar(45) default null,
    password varchar(256) default null,
    primary key(id)
);

CREATE TABLE session(
	id int auto_increment,
	flag int not null,
    user varchar(45),
    foreign key (id) references account(id),
    primary key (id)
);

alter table session ADD foreign key (user) references account(user);

insert into session values (null, 1, 'testuser');
UPDATE account SET user='testuser', name='test', password='hola' WHERE id =1253;