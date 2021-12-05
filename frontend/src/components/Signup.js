import React from "react";
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmPassword: ''
    }

  }

  handleEmailChange = (e) => {
    this.setState({email: e.target.value})
  }

  handlePasswordChange = (e) => {
    this.setState({password: e.target.value})
  }

  handleConfirmPasswordChange = (e) => {
    this.setState({confirmPassword: e.target.value})
  }

  render() {
    return (
      <Container>
        <Row className="justify-content-center align-items-start">
          <Col xs lg="3" sm="5">
            <Card className="text-center"
                  style={{ marginTop: 100}}>
              <Card.Header> Signup </Card.Header>
              <Card.Body>
                <div className="gap-2">
                  <Form>
                    <Form.Group controlId="formEmail">
                      <Form.Label> Email Address </Form.Label>
                      <Form.Control type="email" placeholder="example@email.com"
                                    value={this.state.email}
                                    onChange={this.handleEmailChange}/>
                    </Form.Group>
                    <Form.Group controlId="formPassword"
                                style={{ marginTop: 15 }}>
                      <Form.Label> Password </Form.Label>
                      <Form.Control type="password"
                                    value={this.state.password}
                                    onChange={this.handlePasswordChange}/>
                    </Form.Group>
                    <Form.Group controlId="formConfirmPassword"
                                style={{ marginTop: 15 }}>
                      <Form.Label> Confirm Password </Form.Label>
                      <Form.Control type="password"
                                    value={this.state.confirmPassword}
                                    onChange={this.handleConfirmPasswordChange}/>
                    </Form.Group>
                  </Form>
                  <div className="d-grid gap-2">
                  <Button variant="success" size="lg" style={{ marginTop: 15 }}
                          onClick={this.handleSignup}>
                    Create account
                  </Button>
                  <Button variant="primary" size="lg" style={{ marginTop: 15 }}
                          href="/login">
                    Login
                  </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }

  handleSignup = () => {
    // TODO: Use backend api!
    console.log("Clicked signup button!")
    console.log(this.state.email)
    console.log(this.state.password)
    console.log(this.state.confirmPassword)
  }
}

export default Signup