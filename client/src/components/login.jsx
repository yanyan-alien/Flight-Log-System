import React, {useState} from 'react';
import {Form, Button, Container, Row, Col, Alert} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
import axios from 'axios' 
import { useAuth } from './auth';

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

function Login() {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState('Invalid Credentials');
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuth();

  function handleSubmit(event) {
    event.preventDefault()
    console.log(event.target[0].value, event.target[1].value)
    const uname = event.target[0].value

    digestpw(event.target[1].value).then((digest) => {
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
    })
    .finally(()=>{
    })
  }
    return (
      <Container>
        <Row>
          <Col sm={{ span: 8, offset: 2 }}>
            <h1 className='mt-5'>Flight Log Management System</h1>
            <Alert variant='danger' className='mt-5'show={show}>{message}</Alert>
            <Form noValidate 
            id='login-form'
            // validated={validated} 
            onSubmit={handleSubmit}
            >
              <Form.Group className="my-3" controlId="login-username">
                <Form.Label>Username</Form.Label>
                <Form.Control required type="text" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="login-password">
                <Form.Label>Password</Form.Label>
                <Form.Control required type="password"/>
              </Form.Group>
              <Button type="submit" >Submit</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    )
}

export default Login