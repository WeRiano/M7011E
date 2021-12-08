import { Container, Form, Col, Row, Button, Card } from 'react-bootstrap'
import React, {useState} from "react";
import { useRef } from 'react';

import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from "react-router-dom"

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth()
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault()
    setError('')

    setLoading(true)
    login(emailRef.current.value, passwordRef.current.value)
    setLoading(false)

    // if successful
    navigate('/dashboard')
  }

  return (
    <Container>
      <Row className="justify-content-center align-items-start">
        <Col xs lg="3" md="5" sm="7">
          <Card className="text-center"
                style={{marginTop: 100}}>
            <Card.Header as="h5"> Log In </Card.Header>
            <Card.Body>
              <div className="gap-2">
                <Form>
                  <Form.Group controlId="formEmail">
                    <Form.Label> Email Address </Form.Label>
                    <Form.Control type="email" placeholder="example@email.com"
                                  ref={emailRef} required />
                  </Form.Group>
                  <Form.Group controlId="formPassword"
                              style={{marginTop: 15}}>
                    <Form.Label> Password </Form.Label>
                    <Form.Control type="password" ref={passwordRef} required />
                  </Form.Group>
                </Form>
                <div className="d-grid gap-2">
                  <Button variant="success"
                          disabled={loading}
                          onClick={handleSubmit}
                          size="lg" style={{marginTop: 15}}>
                    Log In
                  </Button>
                  <div className="w-100 text-center mt-2">
                  Don't have an account? <Link to="/signup">Sign up</Link>
                </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}