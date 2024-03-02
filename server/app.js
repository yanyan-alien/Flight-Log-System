import express from 'express'
import cors from 'cors'
import { getUser, getFlights } from './database.js';

const app = express()

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(cors())
// app.listen(3306)
app.post("/login", async (req, res) => {
    const user = await getUser([req.body.username, req.body.password])
    if (user == null) res.send('error')
    else res.send('success')
  })

app.get("/flights", async (req, res) => {
    const flightdata = await getFlights()
    res.send(flightdata)
  })
  
app.get("/flights/:id", async (req, res) => {
    const id = req.params.id
    const note = await getNote(id)
    res.send(note)
})

app.post("/flights", async (req, res) => {
    const { title, contents } = req.body
    const note = await createNote(title, contents)
    res.status(201).send(note)
})
app.post("/users", async (req, res) => {
    const { title, contents } = req.body
    const note = await createNote(title, contents)
    res.status(201).send(note)
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke')
  })

  app.listen(8080, () => {
    console.log('Server is running on port 8080')
  })