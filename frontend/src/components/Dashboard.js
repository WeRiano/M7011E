import React from "react";
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";

class Dashboard extends React.Component {
  render() {
    return (
      <Container>
        <Row className="justify-content-center align-items-start">
          <Col xs lg="3" sm="5">
            <Card className="text-center"
                  style={{marginTop: 100}}>
              <Card.Header> Weather </Card.Header>
              <Card.Body>
                <Card.Text>Current weather speed: 5 m/s</Card.Text>
                <Card.Text>Current temperature: -20 °C</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col xs lg="3" sm="5">
            <Card className="text-center"
                  style={{marginTop: 100}}>
              <Card.Header> Economy </Card.Header>
              <Card.Body>
                <Card.Text>Current power production: 2 kWh</Card.Text>
                <Card.Text>Current consumption: 2 kWh</Card.Text>
                <Card.Text>Net production: 0 kWh</Card.Text>
                <Card.Text>Buffer size: ???</Card.Text>
                <Card.Text>Electricity Market Price: 0.65 kr/kWh</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Dashboard