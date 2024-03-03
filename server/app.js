import express from 'express'
import cors from 'cors'
import { getUser, getFlights, getUsers, deleteFlight, createUser, deleteUser } from './database.js';

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

app.get("/users", async (req, res) => {
  const userdata = await getUsers()
  // console.log(userdata)
  res.send(userdata)
})

app.post("/createuser", async (req, res) => {
  const create_res = await createUser([req.body.username, req.body.password])
  console.log(create_res)
  if (create_res) {
    res.send('success')
  }
  else {
    res.send('error')
  }
})

app.delete("/deleteuser/:id", async (req, res) => {
  const {id} = req.params
  const userdata = await deleteUser(id)
  console.log(req.params)
  res.send(userdata)
})


app.get("/flights", async (req, res) => {
    const flightdata = await getFlights()
    res.send(flightdata)
  })
  
app.get("/flights/:id", async (req, res) => {
    const id = req.body.id
    const note = await getFlight(id)
    res.send(note)
})

app.delete("/flightdelete", async (req, res) => {
  const id = req.body.id
  console.log(id)
  const ret = await deleteFlight(id)
  res.send(ret)
})

app.put("/flightupdate", async (req, res) => {
  const data = req.body
  const note = await updateFlight(data)
  res.send(note)
})

app.post("/flightcreate", async (req, res) => {
  const data = req.body
  const note = await createFlight(data)
  res.send(note)
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke')
  })

  app.listen(8080, () => {
    console.log('Server is running on port 8080')
  })