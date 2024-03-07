import express from 'express'
import cors from 'cors'
import { getUser, createUser, deleteUser, getUsers, getFlights, searchFlights, deleteFlight, createFlight, updateFlight } from './database.js';

const app = express()

app.use(express.json());
app.use(cors())
// app.use(express.urlencoded({extended: true}));
// app.use(express.static("public"));

const token = 'SIMPLE_TOKEN'

app.post("/login", async (req, res) => {
    const user = await getUser([req.body.username, req.body.password])
    if (user == null) res.send('error')
    else res.send({outcome:'success', token: token})
  })

app.get("/users", async (req, res) => {
  const userdata = await getUsers()
  res.send(userdata)
})

app.post("/createuser", async (req, res) => {
  const create_res = await createUser(req.body)
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
  if (userdata.affectedRows > 0) {
    res.send('success')
  }
  else res.send('error')
})


app.get("/flights", async (req, res) => {
    const flightdata = await getFlights()
    res.send(flightdata)
  })
  
app.get("/flights/:flight_id", async (req, res) => {
    const {flight_id} = req.params
    const flights = await searchFlights(flight_id)
    res.send(flights)
})

app.delete("/flightdelete", async (req, res) => {
  const id = req.body.id
  const ret = await deleteFlight(id)
  res.send(ret)
})

app.put("/flightupdate", async (req, res) => {
  const data = req.body.data
  const result = await updateFlight(data)
  console.log(result)
  if (result==-1){
    res.send('No content modified')
  }
  else {
    res.send('success')
  }
})

app.post("/flightcreate", async (req, res) => {
  const data = req.body.data
  const ret = await createFlight(data)
  if (ret) {
    res.send('success')
  }
  else res.send('error')
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke')
  })

  app.listen(8080, () => {
    console.log('Server is running on port 8080')
  })