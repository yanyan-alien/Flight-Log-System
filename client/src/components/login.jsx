import React, {useState} from 'react';
import {Form, Button, Container, Row, Col, Alert} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
import axios from 'axios' 
import { useAuth } from './auth';
import forge from 'node-forge'

function digestpw(pw) {
  const md = forge.md.sha256.create();
  md.update(pw);
  return md.digest().toHex();
}

function Login() {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState('Invalid Credentials');
  const [validated, setValidated] = useState(null);

  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuth();

  function handleSubmit(event) {
    event.preventDefault()
    const form = event.currentTarget
    setValidated(true)
    if (form.checkValidity()===false) {
      event.stopPropagation()
      return 
    }
    console.log(event.target[0].value, event.target[1].value)
    const uname = event.target[0].value
    const digest = digestpw(event.target[1].value)
    axios.post('http://localhost:8080/login', {
      username: uname,
      password: digest
    })
    .then(function (response) {
      console.log(response)
      if (response.data.outcome==='success') {
        localStorage.setItem('token', response.data.token)
        setIsLoggedIn(true);
        navigate('/flights')
      }
      else {
        setMessage('Invalid Credentials')
        setShow(true)
      }
    })
    .catch(function (error) {
      setMessage('Server Error')
      setShow(true)
      console.log(error);
      document.getElementById("login-form").reset()
    });
  }
    return (
      <Container>
        <Row>
          <Col sm={{ span: 8, offset: 2 }}>
            <h1 className='mt-5'>Flight Log Management System</h1>
            <Alert variant='danger' className='mt-5'show={show}>{message}</Alert>
            <Form noValidate 
            id='login-form'
            validated={validated} 
            onSubmit={handleSubmit}
            >
              <Form.Group className="my-3" controlId="login-username">
                <Form.Label>Username</Form.Label>
                <Form.Control required type="text" />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid username
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="login-password">
                <Form.Label>Password</Form.Label>
                <Form.Control required type="password"/>
                <Form.Control.Feedback type="invalid">
                  Please provide a valid username
                </Form.Control.Feedback>
              </Form.Group>
              <Button type="submit" >Submit</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    )
}

export default Login