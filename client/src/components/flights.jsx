import React, {useState, useEffect} from "react"
import Header from "./header"
import { Table, Form, Button, Modal, Stack} from "react-bootstrap";
import axios from "axios";

function Flights() {
    const [data, setData] = useState([]);
    const [showEdit, setEditShow] = useState(false);
    const [showDelete, setDeleteShow] = useState(false);
    const [currentFlightLog, setCurrentFlightLog] = useState(null);
    const [addLog, setaddLog] = useState(false);
    const [search, setSearch] = useState('');

    const handleEditClose = () => setEditShow(false);
    const handleEditShow = () => setEditShow(true);

    const handleDeleteClose = () => setDeleteShow(false);
    const handleDeleteShow = () => setDeleteShow(true);

    function openEdit(row) {
      console.log(row)
      setCurrentFlightLog(row);
      // console.log(row)
      setaddLog(false)
      setEditShow(true);
    }

    async function deleteLog(data) {
      console.log(data)
      axios.delete('http://localhost:8080/flightdelete', {data : {id: data.id}})
      .then((res)=>{
        fetchData()
        console.log(res)
      })
      .catch((err)=>console.log(err) )
      
      handleDeleteClose()
    }
    
    async function updateLog(data) {
      axios.put('http://localhost:8080/flightupdate',{data})
      .then((res)=>{
        fetchData()
        console.log(res)
      })
      .catch((err)=>console.log(err) )
      handleEditClose()
    }

    async function createLog(data) {
      axios.post('http://localhost:8080/flightcreate', {data})
      .then((res)=>{
        fetchData()
        console.log(res)
      })
      .catch((err)=>console.log(err) )
      handleEditClose()
    }

    async function searchFlights(flight_id) {
      axios.get(`http://localhost:8080/flights/${flight_id}`)
      .then((response) => {
        setData(response.data)
      })
      .catch((error)=> console.log(error))
    }

    const handleSearchChange = (e) => {
      const search = e.target.value;
      setSearch(search)
      if (search.trim()==='') fetchData()
      else searchFlights(search)
    }

    const fetchData = () => {
      axios.get('http://localhost:8080/flights')
          .then(function (response) {
              // Set the data to state, this will trigger a re-render
              setData(response.data);
          })
          .catch(function (error) {
              console.log(error);
          });
  }
    useEffect(()=>fetchData(), []);
    const flightdatas = data.map( (row, index) => {
      const takeoffevent = new Date(row.takeoff)
      const landingevent = new Date(row.landing)
      const takeoffdatetime = takeoffevent.toLocaleString('en-GB', {timeZone: 'Asia/Singapore', hour12: false})
      const landingdatetime = landingevent.toLocaleString('en-GB', {timeZone: 'Asia/Singapore', hour12: false})
      const last_updateddate = new Date(row.last_updated).toLocaleString('en-GB', {timeZone: 'Asia/Singapore', hour12: false})
      row.takeoff = row.takeoff.slice(0, 16)
      row.landing = row.landing.slice(0, 16)
        return (
        <tr key={index}>
            <td>{row.flight_id}</td>
            <td>{row.tailNumber}</td>
            <td>{takeoffdatetime}</td>
            <td>{landingdatetime}</td>
            <td>{row.duration}</td>
            {/* <td>{createddate}</td> */}
            <td>{last_updateddate}</td>
            <td>
                <Button variant="warning" onClick={() => {openEdit(row)}} id={`edit-${row.id}`}>Edit</Button>{' '}
                <Button variant="danger" onClick={()=>{
                  setCurrentFlightLog(row)
                  handleDeleteShow()
                  }} id={`delete-${row.id}`}>Delete</Button>{' '}
            </td>
        </tr>)
    })
    return (
        <>
            <Header/>
            <div className="px-3 container">
                <Stack direction="horizontal" gap={3} className="my-3 ">
                  <Form.Control className=" w-75" placeholder="Search by flight ID" 
                  value={search}
                  onChange={handleSearchChange}
                  />
                  <Button 
                    className="ms-auto"
                    onClick={()=>{
                    setCurrentFlightLog({
                      id: '', 
                      flight_id: '',
                      tailNumber: '',
                      takeoff: null,
                      landing: null,
                      duration: 0,
                    })
                    setaddLog(true)
                    handleEditShow()
                    }}>Add Flight log
                  </Button>
                </Stack>
                <Table striped bordered hover >
                    <thead>
                        <tr>
                            <th>Flight id</th>
                            <th>Tail Number</th>
                            <th>Takeoff</th>
                            <th>Landing</th>
                            <th>Duration (Mins)</th>
                            <th>Last Updated</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {flightdatas}
                    </tbody>
                </Table>
                
            </div>         
      <Modal show={showEdit} onHide={handleEditClose}>
        <Modal.Header closeButton>
          <Modal.Title>{addLog?"Add":"Edit"} Flight Log</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
          <Stack direction="horizontal" gap={3} className="my-2">
            <Form.Group className="me-auto" controlId="exampleForm.Control1">
              <Form.Label>FlightID</Form.Label>
              <Form.Control required type="text" 
              value={currentFlightLog ? currentFlightLog.flight_id : ''}
              onChange={(e) => setCurrentFlightLog({...currentFlightLog, flight_id: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="" controlId="exampleForm.Control1">
              <Form.Label>Tail Number</Form.Label>
              <Form.Control required type="text" 
              value={currentFlightLog ? currentFlightLog.tailNumber : ''}
              onChange={(e) => setCurrentFlightLog({...currentFlightLog, tailNumber: e.target.value})}
              />
            </Form.Group>
          </Stack>
          <Stack direction="vertical" gap={2} className="">
            <Form.Group className="" controlId="exampleForm.Control1">
              <Form.Label>Takeoff</Form.Label>
              <Form.Control required type="datetime-local" 
              value={currentFlightLog && currentFlightLog.takeoff ? currentFlightLog.takeoff: ''}
              onChange={(e) => {setCurrentFlightLog({...currentFlightLog, takeoff: e.target.value})}}
              />
            </Form.Group>
            <Form.Group className="" controlId="exampleForm.Control1">
              <Form.Label>Landing</Form.Label>
              <Form.Control required type="datetime-local" 
              value={currentFlightLog && currentFlightLog.landing ? currentFlightLog.landing: ''}
              onChange={(e) => setCurrentFlightLog({...currentFlightLog, landing: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="" controlId="exampleForm.Control1">
            <Form.Label>Duration (Mins)</Form.Label>
            <Form.Control required type="number" min={0}
            value={currentFlightLog ? currentFlightLog.duration : ''}
            onChange={(e) => setCurrentFlightLog({...currentFlightLog, duration: e.target.value})}
            />
          </Form.Group>
          </Stack>        
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleEditClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => (addLog?createLog(currentFlightLog):updateLog(currentFlightLog))}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>    

      <Modal show={showDelete} onHide={handleDeleteClose}>
        <Modal.Header closeButton>
          <Modal.Title>Alert Message</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete the log?</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleDeleteClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => deleteLog(currentFlightLog)}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>    
        </>
    )
}

export default Flights