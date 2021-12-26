import React, {useState, useRef, useEffect} from "react";
import { Card, Col, Container, Form, Row, ListGroup, Table, ProgressBar } from "react-bootstrap";

import { useAuth } from '../contexts/AuthContext'

export default function Dashboard() {
  const [windSpeed, setWindSpeed] = useState(5) // [m/s]
  const [temp, setTemp] = useState(20) // [Degrees celsius]
  const [production, setProduction] = useState(2) // [kWh]
  const [consumption, setConsumption] = useState(3)  // [kWh]
  const [storing, setStoring] = useState(50) // [%] (to avoid fpp error)
  const [using, setUsing] = useState(50) // [%] (to avoid fpp error)
  const [marketPrice, setMarketPrice] = useState(0.65)
  const [bufferCapacity, setBufferCapacity] = useState(5) // [kWh] - [0-13.5]

  const { currentUser } = useAuth()

  useEffect(() => {
    // TODO: Don't hardcode server endpoints

    // TODO: Query simulation
  })

  const net = production - consumption;
  const storingDisabled = false; //net < 0;
  const usingDisabled = false;

  return (
    <Container>
      <Row className="justify-content-center" style={{ marginTop: 50 }} >
        <Col xs lg="6">
          <Card>
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Value</th>
                <th>Unit</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Temperature</td>
                <td>{temp}</td>
                <td>°C</td>
                <td>Weather</td>
              </tr>
              <tr>
                <td>Wind Speed</td>
                <td>{windSpeed}</td>
                <td>m/s</td>
                <td>Weather</td>
              </tr>
              <tr>
                <td>Production</td>
                <td>{production}</td>
                <td>kWh</td>
                <td>Electricity</td>
              </tr>
              <tr>
                <td>Consumption</td>
                <td>{consumption}</td>
                <td>kWh</td>
                <td>Electricity</td>
              </tr>
              <tr>
                <td>Market Price</td>
                <td>{marketPrice}</td>
                <td>kr/kWh</td>
                <td>Economy</td>
              </tr>
            </tbody>
          </Table>
          </Card>
        </Col>
      </Row>
      <Row className="justify-content-center"
           style={{ marginTop: 50 }}>
        <Col xs lg="6">
          <Card>
            <Card.Header className="text-center">Power Management</Card.Header>
            <ListGroup>
              <ListGroup.Item>
                <Card.Text className="text-center" as="h5">
                  Your SureFire Electrics SuperTurbine™ is currently
                  {net >= 0 ? " over-producing " : " under-producing "}
                  with a net production of:
                </Card.Text>
                <Card.Text className="text-center" as="h3">
                  {net} kWh!
                </Card.Text>
              </ListGroup.Item>
              <ListGroup.Item>
                <Card.Text className="text-center" as="h5">
                  SureFire Electrics PowerBuffer™ capacity
                </Card.Text>
                <ProgressBar now={bufferCapacity} min={0} max={13.5}
                                  label={bufferCapacity + " kWh"} animated />
              </ListGroup.Item>
              <ListGroup.Item>
              <Form>
                <Form.Label>
                  In the case of excessive production,
                  choose the amount of excessive power that should be stored in your
                  Surefire Electric PowerBuffer™.
                  The remaining power will be sold on the market.
                </Form.Label>
                <Form.Range min={0} max={100} step={1}
                            onChange={e => setStoring(e.target.value)}
                            variant="secondary"
                            disabled={storingDisabled} />
              </Form>
              <Card.Text className="text-center">
                Current storing {storing}%
                ({net * (storing / 100)} kWh) of excessive production.
              </Card.Text>
              </ListGroup.Item>
              <ListGroup.Item>
              <Form>
                <Form.Label>
                  In the case of under-production,
                  choose the amount of power that should be taken from your Surefire Electric
                  PowerBuffer™. The remaining power will be bought from the market at the
                  given market price.
                </Form.Label>
                <Form.Range min={0} max={100} step={1}
                            onChange={e => setUsing(e.target.value)}
                            variant="secondary"
                            disabled={usingDisabled}/>
              </Form>
              <Card.Text className="text-center">
                Current using {using}%
                ({Math.abs(net * (using / 100))} kWh) of stored power.
              </Card.Text>
            </ListGroup.Item>
          </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}