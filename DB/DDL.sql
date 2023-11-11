create table operator
(

    id      integer primary key autoincrement,
    surname varchar(32) not null,
    name    varchar(32) not null,
    email   varchar(64) not null,
    pass    varchar(64) not null

);

create table package
(
    code        varchar(32) primary key,
    destination varchar(64) not null,
    weight      float       not null,
    volume      float       not null,
    id_c        INTEGER default null,

    CONSTRAINT FK_id FOREIGN KEY (id_c) REFERENCES courier (id)
);



create table courier
(
    id      integer primary key autoincrement,
    surname varchar(32) not null,
    name    varchar(32) not null,
    email   varchar(64) not null,
    pass    varchar(64) not null,
    KPI     double      null

);
