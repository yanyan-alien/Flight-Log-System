import mysql from "mysql2"
import dotenv from 'dotenv'

dotenv.config()
const pool = mysql.createPool({
    host: '127.0.0.1',
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: 'flightsystem',
}).promise()


export async function getUser(req) {
    const [rows] = await pool.query("SELECT * FROM users WHERE username = ? AND password = ?", req)
    return rows[0]
}

export async function getUsers() {
    const [rows] = await pool.query("SELECT id, username, created FROM users")
    return rows
}
export async function getFlights() {
    const [rows] = await pool.query("SELECT * FROM flights")
    return rows
}

export async function searchFlights(flight_id) {
    const [rows] = await pool.query("SELECT * FROM flights WHERE flight_id LIKE ?", [`${flight_id}%`])
    return rows
}

export async function createUser(req) {
    var result = 0
    const [[count]] = await pool.query(
        `SELECT COUNT(*) AS count FROM users WHERE username = ?`, req.username)
    if (count.count === 0) {
        const [create_result] = await pool.query(
            `INSERT INTO users(username, password)
            VALUES (?, ?)`, [req.username, req.password])
        result = 1
    }
    return result
}

export async function deleteUser(id) {
    const [result] = await pool.query(
        `DELETE FROM users WHERE id=?`,[id])
    return result
}

export async function createFlight(data) {
    const durationInt = parseInt(data.duration, 10);
    const takeoffTimestamp = data.takeoff.replace('T', ' ');
    const landingTimestamp = data.landing.replace('T', ' ');
    const [result] = await pool.query(
        `INSERT INTO flights(flight_id, tailnumber, takeoff, landing, duration)
        VALUES (?, ?, ?, ?, ?)
        `,[data.flight_id, data.tailNumber, takeoffTimestamp, landingTimestamp, durationInt])
    if (result.affectedRows > 0) return 1
    else return 0
}

export async function deleteFlight(id) {
    const [result] = await pool.query(
        `DELETE FROM flights WHERE ID=?`,[id])
    return result
}

export async function updateFlight(data) {
    const durationInt = parseInt(data.duration, 10);
    const takeoffTimestamp = data.takeoff.replace('T', ' ');
    const landingTimestamp = data.landing.replace('T', ' ');
    const [[prev_data]] = await pool.query("SELECT * FROM flights WHERE id=?", [data.id])
    console.log(prev_data)
    console.log(data)
    if (
        data.flight_id==prev_data.flight_id &&
        data.tailNumber == prev_data.tailNumber &&
        // data.takeoff == prev_data.takeoff &&
        // data.landing == prev_data.landing &&
        data.duration == prev_data.duration
    ) {
        return -1
    }
    else {
        console.log('not -1')
        const [result] = await pool.query(
            `UPDATE flights
            SET flight_id=?, tailNumber=?, takeoff=?, landing=?, duration=?, last_updated=CURRENT_TIMESTAMP
            WHERE id=?
            `,[data.flight_id, data.tailNumber, takeoffTimestamp, landingTimestamp, durationInt, data.id])
        return result
    }
}