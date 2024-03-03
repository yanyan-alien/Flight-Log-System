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
    const [rows] = await userpool.query("SELECT id, username, created FROM users")
    return rows
}
export async function getFlights() {
    const [rows] = await flightpool.query("SELECT * FROM flights")
    return rows
}
export async function createUser(req) {
    // console.log(req)
    var result = 0
    const [[count]] = await userpool.query(
        `SELECT COUNT(*) AS count FROM users WHERE username = ?`, req[0])
    // console.log(count, count.count, 'count')
    if (count.count === 0) {
        const [create_result] = await userpool.query(
            `INSERT INTO users(username, password)
            VALUES (?, ?)`, req)
        result = 1
    }
    return result
}

export async function deleteUser(id) {
    console.log(id, 'within database funciton')
    const [result] = await userpool.query(
        `DELETE FROM users WHERE id=?`,[id])
    return result
}

export async function createFlight() {
    const [result] = await flightpool.query(
        `INSERT INTO flights()
        VALUES (?, ?)
        `,[uname, pw])
    return result
}

export async function deleteFlight(id) {
    const [result] = await flightpool.query(
        `DELETE FROM flights WHERE ID=?`,[id])
    return result
}

export async function updateFlights(data) {
    const [result] = await flightpool.query(
        `UPDATE flights
        SET flight_id=?, tailNumber=?, takeoff=?, landing=?, duration=?, last_updated=CURRENT_TIMESTAMP
        WHERE id=?
        `,[data.flight_id, data.tailNumber, data.takeoff, data.landing, data.duration, data.id])
    return result
}