import mysql from "mysql2"
import dotenv from 'dotenv'

dotenv.config()
const userpool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.USERS_DATABASE,
}).promise()

const flightpool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.FLIGHTS_DATABASE,
}).promise()


const [flight_result] = await flightpool.query("SELECT * FROM flights")
const [user_result] = await userpool.query("SELECT * FROM users")
// console.log(user_result, flight_result)
export async function getUser(req) {
    const [rows] = await userpool.query("SELECT * FROM users WHERE username = ? AND password = ?", req)
    return rows[0]
}

export async function getUsers() {
    const [rows] = await userpool.query("SELECT * FROM users")
    return rows
}
export async function getFlights() {
    const [rows] = await flightpool.query("SELECT * FROM flights")
    return rows
}
export async function createUsers(uname, pw) {
    const [result] = await userpool.query(
        `INSERT INTO users(username, password)
        VALUES (?, ?)
        `,[uname, pw])
    return result
}
export async function createFlights() {
    const [result] = await flightpool.query(
        `INSERT INTO flights()
        VALUES (?, ?)
        `,[uname, pw])
    return result
}
