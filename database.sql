--Database name: ssg_registration

--create user table
CREATE TABLE "users" (
  "id" serial primary key,
  "username" varchar(80) not null,
  "password" varchar(120) not null
);

CREATE TABLE "json_volunteer" (
 ID serial NOT NULL PRIMARY KEY,
 info json NOT NULL
);
