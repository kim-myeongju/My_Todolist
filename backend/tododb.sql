show databases;

create table todos (
	id int auto_increment primary key,
    content varchar(255) not null,
    isDone TINYINT(1) NOT NULL DEFAULT 0,
    createdDate datetime not null default current_timestamp
);

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '12345';
FLUSH PRIVILEGES;

select * from todos;
DESCRIBE todos;
insert into todos values (1, "Hello Todolist", false, current_time());

drop table if exists todos;