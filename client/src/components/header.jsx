import React from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Navbar, Nav, Form, Button } from "react-bootstrap";
import { useAuth } from "./auth";

function Header() {
    const { setIsLoggedIn } = useAuth();
    const navigate = useNavigate()
    const location = useLocation()

    function handleLogOut() {
        localStorage.clear()
        setIsLoggedIn(false)
        navigate('/')
    }
    return(
        <Navbar bg='light' data-bs-theme="light"  style={{padding: '10px 0'}}>
        <div className="container">
            <Link className="navbar-brand" to={'/'}>
                Flight Management System
            </Link>
            <Nav>
                <Nav.Link as={NavLink} disabled={location.pathname==='/flights'} to="/flights">Flights</Nav.Link>
                <Nav.Link as={NavLink} disabled={location.pathname==='/users'} to={"/users"}>Users</Nav.Link>
                <Form className="d-flex">
                <Button variant="outline-success" onClick={handleLogOut}>Logout</Button>
                </Form>
            </Nav>
        </div>
    </Navbar>
    )
}

export default Header