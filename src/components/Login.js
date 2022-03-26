import React, { useState } from 'react'
import { Card, Form, Button,Alert } from 'react-bootstrap'
import { useRef } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate} from 'react-router-dom'
export default function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    // const passwordConfirmRef = useRef()
    // const { signup, currentUser } = useAuth()
    // const { signup } = useAuth()
    const {login}  = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault()
        // if(passwordRef.current.value !== passwordConfirmRef.current.value) {
        //     return setError('Passwords do not match')
        // }
        try {
            setError('')
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            history('/')
        }
        catch {
            setError('Failed to Log In')
        }
        setLoading(false)
    }
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          {/* {JSON.stringify(currentUser)} */}
          {/* {currentUser && currentUser.email} //show email */}
          {/* {currentUser.email} */}
          {error && <Alert variant='danger'>{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            {/* <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group> */}
            <Button disabled={loading} className="w-100 mt-3" type="submit">
              Log In
            </Button>
          </Form>
          <div className='w-100 text-center mt-2'>
            <Link to='/forgot-password'>Forgot Password</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to='/signup'>Sign Up</Link>
      </div>

 </>
)
}
// useHistory to replace useNavigate
// https://stackoverflow.com/questions/62861269/attempted-import-error-usehistory-is-not-exported-from-react-router-dom