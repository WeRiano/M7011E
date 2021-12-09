import React, { useRef, useState } from "react";
import {Button, Card, Col, Container, Form, Row, Alert } from "react-bootstrap";
import { Link } from 'react-router-dom'

import { useAuth } from "../contexts/AuthContext";

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup, logout } = useAuth()
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  logout()

  function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (passwordRef.current.value === passwordConfirmRef.current.value) {
      return setError('Passwords do not match')
    }

    setLoading(true)
    signup(emailRef.current.value, passwordRef.current.value)
    setLoading(false)
  }

  return (
    <Container>
      <Row className="justify-content-center align-items-start">
        <Col xs lg="3" md="5" sm="7">
          <Card className="text-center"
                style={{ marginTop: 100}}>
            <Card.Header as="h5"> Sign Up </Card.Header>
            <Card.Body>
              { error && <Alert variant="danger">{error}</Alert> }
              <div className="gap-2">
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="formEmail">
                    <Form.Label> Email Address </Form.Label>
                    <Form.Control type="email" placeholder="example@email.com"
                                  ref={emailRef} />
                  </Form.Group>
                  <Form.Group controlId="formPassword"
                              style={{ marginTop: 15 }}>
                    <Form.Label> Password </Form.Label>
                    <Form.Control type="password"
                                  ref={passwordRef} />
                  </Form.Group>
                  <Form.Group controlId="formConfirmPassword"
                              style={{ marginTop: 15 }}>
                    <Form.Label> Confirm Password </Form.Label>
                    <Form.Control type="password"
                                  ref={passwordConfirmRef} />
                  </Form.Group>
                </Form>
                <div className="d-grid gap-2">
                <Button variant="success" size="lg" style={{ marginTop: 15 }}
                        disabled={loading} >
                  Create account
                </Button>
                <div className="w-100 text-center mt-2">
                  Already have an account? <Link to="/login">Log In</Link>
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