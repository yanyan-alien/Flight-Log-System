# Flight Log Management System

## Technology Used
Built using the following
- ReactJS (Frontend)
    - react-router-dom
    - react-bootstrap
- Node.js + Express.js (Backend)
- MySQL (Database)
- App deployed on AWS EC2 instance - Ubuntu (cloud hosting platform)

## Run Locally
These instructions are for ubuntu machines.
1. Install all the dependencies
```bash
sudo install mysql-server;
mv .env_input .env
npm install;
cd client; npm install;
cd ../server; npm install;
```
2. Find your mysql database username and password and input into .env
```bash
sudo cat /etc/mysql/debian.cnf
```
3. Run the server and client concurrently 
```bash
npm run
```

## Website 
http://54.80.82.88/

## Credentials
username: user1

password: user1

## Features
1. Users able to log in via a login page with username and password
2. Users able to retrieve and display all flight log entries
3. Users able to create flight log entries with the following fields:
    1. tailNumber
    2. flightID
    3. takeoff
    4. landing
    5. Duration
4. Users able to update existing flight log
5. Users able to delete flight log
7. Create and delete users
8. Authenticate users
9. Search using parameters: flightID to display all flight logs pertaining to flightID
10. Deploy your app to any cloud hosting platform (heroku, firebase, aws etc.)

## References
1. https://www.sammeechward.com/deploying-full-stack-js-to-aws-ec2
2. https://www.sammeechward.com/connect-to-mysql-from-node