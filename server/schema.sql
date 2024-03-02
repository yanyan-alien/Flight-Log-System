CREATE DATABASE users;
CREATE DATABASE flights;
USE users;

CREATE TABLE users(
    id integer PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(20) NOT NULL, 
    password VARCHAR(64) NOT NULL,
    created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO users(username, password)
VALUES('user1', '0a041b9462caa4a31bac3567e0b6e6fd9100787db2ab433d96f6d178cabfce90');

use flights;
CREATE TABLE flights(
    id integer PRIMARY KEY AUTO_INCREMENT,
    flight_id integer NOT NULL,
    tailNumber VARCHAR(10) NOT NULL, 
    takeoff VARCHAR(10) NOT NULL,
    landing VARCHAR(10) NOT NULL,
    duration VARCHAR(20) NOT NULL,
    created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    last_updated TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO flights(tailnumber, takeoff, landing, duration)
VALUES('mh370', 'london', 'singapore', '1000 hours');