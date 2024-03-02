import React from "react"
import Header from "./header"
import { Table, Form, Button } from "react-bootstrap";

function Users() {
    return (
        <div className="">
            <Header/>
            <div className="px-3">
                {/* <Form>
                    <Form.Group className="mb-3 py-3" controlId="exampleForm.Control1">
                        <Form.Control required type="text" placeholder="search by flight id"/>
                    </Form.Group>
                </Form> */}
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
                        {/* {flightdatas} */}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default Users