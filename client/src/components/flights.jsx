import React, {useState, useEffect, useRef} from "react"
import Header from "./header"
import { Table, Form, Button, Modal, Stack} from "react-bootstrap";
import axios from "axios";



function Flights({login, setlogin}) {
    const [data, setData] = useState([]);
    const [showEdit, setEditShow] = useState(false);
    const [showDelete, setDeleteShow] = useState(false);
    const [currentFlightLog, setCurrentFlightLog] = useState(null);
    const [addLog, setaddLog] = useState(false);
    const inputRef = useRef(null);

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
      axios.put('http://localhost:8080/flightupdate')
      .then((res)=>{
        fetchData()
        console.log(res)
      })
      .catch((err)=>console.log(err) )
      handleEditClose()
    }

    async function createLog(data) {
      axios.put('http://localhost:8080/flightcreate')
      .then((res)=>{
        fetchData()
        console.log(res)
      })
      .catch((err)=>console.log(err) )
      handleEditClose()
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
      var takeoffdatetime = takeoffevent.toLocaleString('en-SG', {timeZone: 'Singapore', hour12: false})
      // .replace(/\/|, /g, '-').replace(' ', 'T').split(':').slice(0, -1).join(':')

      const landingevent = new Date(row.landing)
      var landingdatetime = landingevent.toLocaleString('en-GB', {timeZone: 'Singapore', hour12: false})
      // var createddate = new Date(row.created).toLocaleString('en-GB', {timeZone: 'Singapore'})
      var last_updateddate = new Date(row.created).toLocaleString('en-GB', {timeZone: 'Singapore'})
      const updated_row ={...row, 
        takeoffdatetime:takeoffdatetime.replace(', ','T'),
        landingdatetime:landingdatetime.replace(', ','T'),
      }
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
                <Button variant="warning" onClick={() => {openEdit(updated_row)}} id={`edit-${row.id}`}>Edit</Button>{' '}
                <Button variant="danger" onClick={()=>{
                  setCurrentFlightLog(updated_row)
                  // setCurrentFlightLog(row)
                  handleDeleteShow()
                  }} id={`delete-${row.id}`}>Delete</Button>{' '}
            </td>
        </tr>)
        console.log(row.landingdatetime, row.takeoffdatetime)
    })
    // console.log(login)
    return (
        <>
            <Header login={login} setlogin={setlogin}/>
            <div className="px-3 container">
                <Stack direction="horizontal" gap={3} className="my-3 ">
                  <Form.Control className=" w-75" placeholder="Search by flight ID" />
                  <Button 
                    className="ms-auto"
                    onClick={()=>{
                    setCurrentFlightLog(null)
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
                            <th>Duration</th>
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
              value={currentFlightLog ? currentFlightLog.id : ''}
              onChange={(e) => setCurrentFlightLog({...currentFlightLog, id: e.target.value})}
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
              ref={inputRef}
              value={currentFlightLog ? currentFlightLog.takeoffdatetime : ''}
              onChange={(e) => setCurrentFlightLog({...currentFlightLog, takeoffdatetime: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="" controlId="exampleForm.Control1">
              <Form.Label>Landing</Form.Label>
              <Form.Control required type="datetime-local" 
                ref={inputRef}
              value={currentFlightLog ? currentFlightLog.landingdatetime : ''}
              onChange={(e) => setCurrentFlightLog({...currentFlightLog, landingdatetime: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="" controlId="exampleForm.Control1">
            <Form.Label>Duration</Form.Label>
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
          <Button variant="primary" onClick={() => (updateLog(null))}>
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