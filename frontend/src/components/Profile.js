import React from "react";
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {Link} from "react-router-dom";

export default function Profile() {

  return (
    <Container>
      <Row className="justify-content-center align-items-start">
        <Col xs xxl="6" xl="7" lg="8" md="10" sm="10">
          <Card className=""
                style={{marginTop: 100}}>
            <Card.Header className="text-center" as="h5"> Profile </Card.Header>
            <Card.Body>
              <Card.Text as="h5">Account information</Card.Text>
              <Form>

              </Form>
              <Card.Text as="h5">Change Password</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}