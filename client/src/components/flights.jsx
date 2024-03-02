import React, {useState, useEffect} from "react"
import Header from "./header"
import { Table, Form, Button, Modal } from "react-bootstrap";
import axios from "axios";


function Flights() {
    const [data, setData] = useState([]);
    const [showEdit, setEditShow] = useState(false);
    const [showDelete, setDeleteShow] = useState(false);

    const handleEditClose = () => setEditShow(false);
    const handleEditShow = () => setEditShow(true);

    const handleDeleteClose = () => setDeleteShow(false);
    const handleDeleteShow = () => setDeleteShow(true);

    useEffect(() => {
        axios.get('http://localhost:8080/flights')
            .then(function (response) {
                // Set the data to state, this will trigger a re-render
                setData(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);
    const flightdatas = data.map( (row, index) => {
        return (
        <tr key={index}>
            <td>{row.id}</td>
            <td>{row.tailNumber}</td>
            <td>{row.takeoff}</td>
            <td>{row.landing}</td>
            <td>{row.duration}</td>
            <td>{row.created}</td>
            <td>{row.last_updated}</td>
            <td>
                <Button variant="warning" onClick={handleEditShow} id={`edit-${row.id}`}>Edit</Button>{' '}
                <Button variant="danger" onClick={handleDeleteShow} id={`delete-${row.id}`}>Delete</Button>{' '}
            </td>
        </tr>)
    })

    return (
        <div className="">
            <Header/>
            <div className="px-3">
                <div className="container">
                    <div className="row mb-3 py-3">
                        <div className="col-8">
                            <Form>
                                <Form.Group className="" controlId="exampleForm.Control1">
                                    <Form.Control required type="text" placeholder="search by flight id"/>
                                </Form.Group>
                            </Form>
                        </div>
                        <div className="col-4">
                            <Button>Add Flight log</Button>
                        </div>
                    </div>
                </div>
                <Table striped bordered hover >
                    <thead>
                        <tr>
                            <th>Flight id</th>
                            <th>Tail Number</th>
                            <th>Takeoff</th>
                            <th>Landing</th>
                            <th>Duration</th>
                            <th>Created</th>
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
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleEditClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEditClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>    

      <Modal show={showDelete} onHide={handleDeleteClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete the log?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleDeleteClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>    
        </div>

        
    )
}

export default Flights