-- It may be helpful to drop and reinstantilize the table when doing
-- the tests in case you delete users/cars the tests are expecting to see
-- DROP TABLE IF EXISTS users;
CREATE TABLE users
(
id SERIAL,
firstname VARCHAR(40),
lastname VARCHAR(40),
email VARCHAR(40)
);
INSERT INTO users (firstname, lastname, email) VALUES ( 'John', 'Smith', 'John@Smith.com');
INSERT INTO users (firstname, lastname, email) VALUES ( 'Dave', 'Davis', 'Dave@Davis.com');
INSERT INTO users (firstname, lastname, email) VALUES ( 'Jane', 'Janis', 'Jane@Janis.com');
