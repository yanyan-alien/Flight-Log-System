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

export async function searchFlights(flight_id) {
    const [rows] = await flightpool.query("SELECT * FROM flights WHERE flight_id LIKE ?", [`${flight_id}%`])
    return rows
}

export async function createUser(req) {
    var result = 0
    const [[count]] = await userpool.query(
        `SELECT COUNT(*) AS count FROM users WHERE username = ?`, req.username)
    if (count.count === 0) {
        const [create_result] = await userpool.query(
            `INSERT INTO users(username, password)
            VALUES (?, ?)`, [req.username, req.password])
        result = 1
    }
    return result
}

export async function deleteUser(id) {
    const [result] = await userpool.query(
        `DELETE FROM users WHERE id=?`,[id])
    return result
}

export async function createFlight(data) {
    const durationInt = parseInt(data.duration, 10);
    const takeoffTimestamp = data.takeoff.replace('T', ' ');
    const landingTimestamp = data.landing.replace('T', ' ');
    const [result] = await flightpool.query(
        `INSERT INTO flights(flight_id, tailnumber, takeoff, landing, duration)
        VALUES (?, ?, ?, ?, ?)
        `,[data.flight_id, data.tailNumber, takeoffTimestamp, landingTimestamp, durationInt])
    if (result.affectedRows > 0) return 1
    else return 0
}

export async function deleteFlight(id) {
    const [result] = await flightpool.query(
        `DELETE FROM flights WHERE ID=?`,[id])
    return result
}

export async function updateFlight(data) {
    const durationInt = parseInt(data.duration, 10);
    const takeoffTimestamp = data.takeoff.replace('T', ' ');
    const landingTimestamp = data.landing.replace('T', ' ');
    const [result] = await flightpool.query(
        `UPDATE flights
        SET flight_id=?, tailNumber=?, takeoff=?, landing=?, duration=?, last_updated=CURRENT_TIMESTAMP
        WHERE id=?
        `,[data.flight_id, data.tailNumber, takeoffTimestamp, landingTimestamp, durationInt, data.id])
    return result
}