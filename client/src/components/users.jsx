import React, {useEffect, useState} from "react"
import Header from "./header"
import { Table, Form, Button, Stack, Container, Modal } from "react-bootstrap";
import axios from "axios";

async function digestpw(pw) {
    const encoder = new TextEncoder()
    const data = encoder.encode(pw)
    const hashBuffer = await crypto.subtle.digest('SHA-256', data)
    const hashArray = Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array
    const hashHex = hashArray
     .map((b) => b.toString(16).padStart(2, "0"))
     .join(""); // convert bytes to hex string
   return hashHex
}

function Users({login, setlogin}) {
    const [data, setData] = useState([]);
    const [createData, setCreateData] = useState({uname:'', password:''});
    const [showDelete, setDeleteShow] = useState(false);
    const [showAdd, setAddShow] = useState(false);
    const [id, setId] = useState(-1);

    const handleDeleteClose = () => setDeleteShow(false);
    const handleDeleteShow = () => setDeleteShow(true);

    const handleAddClose = () => setAddShow(false);
    const handleAddShow = () => setAddShow(true);

    const getUsers = () => {
        axios.get('http://localhost:8080/users')
        .then(function (response) {
            // Set the data to state, this will trigger a re-render
            // console.log(response.data)
            setData(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    useEffect(() => {getUsers()}, []);

    function createUser(data) {
        console.log(data)
        // console.log(event.target[0].value, event.target[1].value)
        digestpw(data.pw).then((digest) => {
            axios.post('http://localhost:8080/createuser', {
                username: data.uname,
                password: digest
              })
            .then(function (response) {
            if (response.data==='success') {
                getUsers()
                handleAddClose()
                setCreateData({uname:'', password:''});
            }
            else {
                // error handling
                setCreateData({uname:'', password:''});
                handleAddClose()
            }
            })
            .catch(function (error) {
                setCreateData({uname:'', password:''});
                console.log(error);
                handleAddClose()
            })
        })
    }

    function deleteUser() {
        axios.delete(`http://localhost:8080/deleteuser/${id}`)
            .then(function (response) {
            if (response.data==='success') {
                getUsers()
                handleDeleteClose()
            }
            else {
                // error handling
                handleDeleteClose()
            }
            })
            .catch(function (error) {
                console.log(error);
                handleDeleteClose()
            })
    }
    

    const userdatas = data.map( (row, index) => {
        var date = new Date(row.created).toLocaleString('en-GB', {timeZone: 'Singapore'})
        return (
        <tr key={index}>
            <td>{row.id}</td>
            <td>{row.username}</td>
            <td>{date}</td>
            <td>
                <Button variant="danger" onClick={()=>{setId(row.id);handleDeleteShow()}} id={`delete-${row.id}`}>Delete</Button>{' '}
            </td>
        </tr>)
    })

    return (
        <>
            <Header login={login} setlogin={setlogin}/>
            <div className="px-3">
                <Container>
                    <Stack direction="horizontal" className="my-3 ">
                        <Button className="ms-auto" onClick={handleAddShow}>Add User</Button>
                    </Stack>
                    <Table striped bordered hover className="mt-3">
                        <thead>
                            <tr>
                                <th>User id</th>
                                <th>Username</th>
                                <th>Created on</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userdatas}
                        </tbody>
                    </Table>
                </Container>
            </div>

            <Modal show={showAdd} onHide={handleAddClose}>
                <Modal.Header closeButton>
                <Modal.Title>Add User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formGroupEmail">
                            <Form.Label>Username</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="username" 
                                value={createData?createData.uname:''}
                                onChange={(e)=>{setCreateData({...createData, uname:e.target.value})}}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="Password" 
                                value={createData?createData.password:''} 
                                onChange={(e)=>{setCreateData({...createData, password:e.target.value})}}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="danger" onClick={handleAddClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={() => {createUser(createData)}}>
                    Yes
                </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showDelete} onHide={handleDeleteClose}>
                <Modal.Header closeButton>
                <Modal.Title>Alert Message</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete user?</Modal.Body>
                <Modal.Footer>
                <Button variant="danger" onClick={handleDeleteClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={() => {deleteUser(id)}}>
                    Yes
                </Button>
                </Modal.Footer>
            </Modal>    
        </>
    )
}

export default Users