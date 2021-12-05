import { Container, Form, Col, Row, Button, Card } from 'react-bootstrap'
import React from "react";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }

  }

    handleEmailChange = (e) => {
    this.setState({email: e.target.value})
  }

  handlePasswordChange = (e) => {
    this.setState({password: e.target.value})
  }

  render() {
    return (
      <Container>
        <Row className="justify-content-center align-items-start">
          <Col xs lg="3" sm="5">
            <Card className="text-center"
                  style={{marginTop: 100}}>
              <Card.Header> Login </Card.Header>
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
                                style={{marginTop: 15}}>
                      <Form.Label> Password </Form.Label>
                      <Form.Control type="password"
                                    value={this.state.password}
                                    onChange={this.handlePasswordChange}/>
                    </Form.Group>
                  </Form>
                  <div className="d-grid gap-2">
                    <Button variant="success" size="lg" style={{marginTop: 15}}
                            onClick={this.handleLogin}>
                      Login
                    </Button>
                    <Button variant="primary" size="lg" style={{marginTop: 15}}
                            href="/signup">
                      Signup
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

  handleLogin = () => {
  // TODO: Use backend api!
  console.log("Clicked login button!")
  console.log(this.state.email)
  console.log(this.state.password)
}
}

export default Login