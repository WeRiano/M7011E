import React from "react";
import { Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import HouseImg from '../house_placeholder.jpg'

import { useAuth } from '../contexts/AuthContext'

export default function Profile() {
  const { currentUser } = useAuth()

  function handleUpdateAccountInfo() {

  }

  function handleUpdatePassword() {

  }

  function handleUpdateImage() {

  }

  return (
    <Container>
      <Row className="justify-content-center align-items-start">
        <Col xs xxl="6" xl="7" lg="8" md="10" sm="10">
          <Card className=""
                style={{marginTop: 100}}>
            <Card.Header className="text-center" as="h3"> Profile </Card.Header>
            <Card.Body>
              <Card.Text as="h5">Account information</Card.Text>
              <Row>
              <Col>
                <Card.Img style={{ width: 640/2, height: 480/2, borderRadius: 5 }} variant="right" src={HouseImg}/>
              </Col>
              <Col>
                <Form>
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Control type="file" />
                  </Form.Group>
                  <Button variant="primary" type="submit" onClick={handleUpdateImage}>
                    Upload
                </Button>
                </Form>
              </Col>
              </Row>
              <Form>
                <Row className="mb-3" style={{ marginTop: 10}} >
                  <Form.Group as={Col}>
                    <Form.Label>First name</Form.Label>
                    <Form.Control placeholder={currentUser.name} />
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label>Last name</Form.Label>
                    <Form.Control placeholder={currentUser.surname} />
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control placeholder={currentUser.email} />
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} xs="5">
                    <Form.Label>Address</Form.Label>
                    <Form.Control placeholder={currentUser.address} />
                  </Form.Group>
                  <Form.Group as={Col} xs="4">
                    <Form.Label>City</Form.Label>
                    <Form.Control placeholder={currentUser.city} />
                  </Form.Group>
                  <Form.Group as={Col} xs="3">
                    <Form.Label>Zip</Form.Label>
                    <Form.Control placeholder={currentUser.zipcode} />
                  </Form.Group>
                </Row>
                <Button variant="primary" type="submit" onClick={handleUpdateAccountInfo}>
                  Save
                </Button>
              </Form>
              <Card.Text  style={{ marginTop: 15 }}
                          as="h5">Change Password</Card.Text>
              <Form>
                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>New password</Form.Label>
                    <Form.Control type="password" />
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label>Confirm new password</Form.Label>
                    <Form.Control type="password" />
                  </Form.Group>
                </Row>
                <Button variant="primary" type="submit" onClick={handleUpdateAccountInfo}>
                  Save
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}