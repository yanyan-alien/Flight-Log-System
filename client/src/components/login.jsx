import {Form, Button} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
import axios from 'axios' 

function Login() {
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault()
    console.log(event.target[0].value, event.target[1].value)
    const uname = event.target[0].value
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
  
    digestpw(event.target[1].value).then((digest) => {
      axios.post('http://localhost:8080/login', {
        username: uname,
        password: digest
      })
      .then(function (response) {
        if (response.data=='success') {
          navigate('/flights')
        }
        else {
          // error handling
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    })
    document.getElementById("login-form").reset()
  }
    return (
      <div className="container justify-content-center">

        <Form noValidate 
        id='login-form'
        // validated={validated} 
        onSubmit={handleSubmit}
        >
          <Form.Group className="mb-3 p-3" controlId="exampleForm.Control1">
            <Form.Label>Username</Form.Label>
            <Form.Control required type="text" />
          </Form.Group>
          <Form.Group className="mb-3 p-3" controlId="exampleForm.Control2">
            <Form.Label>Password</Form.Label>
            <Form.Control required type="password"/>
          </Form.Group>
          <Button type="submit">Submit form</Button>
        </Form>
      </div>
    )
}

export default Login