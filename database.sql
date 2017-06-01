--Database name: ssg_registration

--create user table
CREATE TABLE "users" (
  "id" serial,
  "username" varchar(80) primary key not null,
  "password" varchar(120) not null,
  "role" varchar(20) not null,
  "email" varchar(80),
  "code" varchar(80),
  "expiration" date default CURRENT_DATE
);

--INSERTS username: ADMIN password: SSG
INSERT INTO users (username, password, role, email) VALUES
('ADMIN','$2a$10$gh.g4NFfLSVFFUxsLolS3OxJi0GgBTd2a86L/LKL.bp0WNH/5KEYS','ADMIN','simon.says.give.mail@gmail.com');

CREATE TABLE "json_volunteer" (
 ID serial NOT NULL PRIMARY KEY,
 info json NOT NULL
);

CREATE TABLE "volunteer" (
"id" serial not null,
"email" varchar(80) not null,
"first_name" varchar(80) not null,
"last_name" varchar(80) not null,
"address1" varchar(120),
"address2" varchar(120),
"city" varchar(80),
"state" varchar(2),
"zip" varchar(5),
"under_18" boolean DEFAULT TRUE,
"birthdate" date,
"has_signed_waiver" boolean DEFAULT FALSE,
"has_allowed_photos" boolean DEFAULT TRUE,
"parent_email" varchar(80),
"validation_required" boolean DEFAULT FALSE,
"school" varchar(80),
"employer" varchar(120),
"employer_match" boolean DEFAULT FALSE,
PRIMARY KEY(email, first_name, last_name));

CREATE TABLE "volunteer_hours" (
"id" serial not null,
"volunteer_id" integer not null,
"event_id" varchar(15),
"date" date,
"time_in" time,
"time_out" time,
"staff_name" varchar(35)
);

CREATE TABLE "waiver" (
"id" serial not null PRIMARY KEY,
"volunteer_id" integer not null,
"adult_lw_signature" varchar(80),
"adult_lw_date" date,
"minor_lw_signature" varchar(80),
"minor_lw_date" date,
"minor_lw_guardian_name" varchar(80),
"minor_lw_guardian_signature" varchar(80),
"pw_signature" varchar(80),
"pw_date" date,
"pw_guardian_signature" varchar(80)
);

CREATE TABLE "event" (
  "id" serial not null,
  "event_code" varchar(15) primary key,
  "event_name" varchar(80) not null,
  "event_team" varchar(2) not null,
  "event_description" varchar(120),
  "event_location" varchar(80),
  "event_date" date not null,
  "event_from_time" time not null,
  "event_until_time" time not null
);

INSERT INTO event (event_code, event_name, event_team, event_description, event_location, event_date, event_from_time, event_until_time) VALUES
('MOA2017','Birthday Celebration', 'MN', 'Biggest B-Day Celb', 'MOA', '2017-8-1','13:0','12:30'),
('HFS2017','High Five for supplies','MN','Packing Backpacks for Kids','St. Thomas Academy','2017-08-16','11:00','19:00');
