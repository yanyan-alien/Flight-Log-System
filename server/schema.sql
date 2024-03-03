CREATE DATABASE users;
CREATE DATABASE flights;

USE users;
CREATE TABLE users(
    id integer PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(20) NOT NULL, 
    password VARCHAR(64) NOT NULL,
    created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

use flights;
CREATE TABLE flights(
    id integer PRIMARY KEY AUTO_INCREMENT,
    flight_id VARCHAR(10) NOT NULL,
    tailNumber VARCHAR(10) NOT NULL, 
    takeoff TIMESTAMP NOT NULL,
    landing TIMESTAMP NOT NULL,
    duration integer NOT NULL,
    created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    last_updated TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO flights(flight_id, tailnumber, takeoff, landing, duration)
VALUES('mh370', 'boeing-777', '2021-12-01 14:30:15', '2021-12-02 14:30:15', '24');