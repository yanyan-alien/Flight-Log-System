import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Form, Button } from "react-bootstrap";

function Header() {
    return(
        <Navbar bg='light' data-bs-theme="light"  style={{padding: '10px 0'}}>
        <div className="container">
            <Link className="navbar-brand" to={'/'}>
                Flight Management System
            </Link>
            <Nav>
                <Nav.Link href="/users">Users</Nav.Link>
                <Nav.Link href="/flights">Flights</Nav.Link>
                <Form className="d-flex">
                <Button variant="outline-success" href="/">Logout</Button>
                </Form>
            </Nav>
        </div>
    </Navbar>
    )
}

export default Header