import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Navbar, Nav, Form, Button } from "react-bootstrap";

function Header({login, setlogin}) {
    // console.log(useLocation().pathname)
    return(
        <Navbar bg='light' data-bs-theme="light"  style={{padding: '10px 0'}}>
        <div className="container">
            <Link className="navbar-brand" to={'/'}>
                Flight Management System
            </Link>
            <Nav>
                <Nav.Link disabled={useLocation().pathname=='/flights'} href="/flights">Flights</Nav.Link>
                <Nav.Link disabled={useLocation().pathname=='/users'} href={"/users"}>Users</Nav.Link>
                <Form className="d-flex">
                <Button variant="outline-success" href="/" onClick={()=>setlogin(false)}>Logout</Button>
                </Form>
            </Nav>
        </div>
    </Navbar>
    )
}

export default Header