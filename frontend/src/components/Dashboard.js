import React, {useState, useRef, useEffect} from "react";
import { Card, Col, Container, Form, Row, ListGroup, Table, ProgressBar, Button } from "react-bootstrap";

import { requestGetSimCond, requestEditDelta } from '../services/api/Simulation'
import { loadToken} from "../services/Storage";

export default function Dashboard() {
  const [windSpeed, setWindSpeed] = useState(-1) // [m/s]
  const [temp, setTemp] = useState(-1) // [Degrees celsius]
  const [production, setProduction] = useState(-1) // [kWh]
  const [consumption, setConsumption] = useState(0)  // [kWh]
  const [storing, setStoring] = useState(-1) // [%] (to avoid fpp error)
  const [using, setUsing] = useState(-1) // [%] (to avoid fpp error)
  const [marketPrice, setMarketPrice] = useState(-1)
  const [bufferCapacity, setBufferCapacity] = useState(1) // [kWh] - [0-13.5]
  const [simDateTime, setSimDateTime] = useState('')
  const [simDelta, setSimDelta] = useState(-1)
  const [bank, setBank] = useState(0)

  const newSimDeltaRef = useRef(simDelta);

  useEffect(async() => {
    // TODO: Don't hardcode server endpoints
    let token = loadToken()
    let request = await requestGetSimCond(token)
    const [success, data] = await request
    if (success) {
      setWindSpeed(Math.round(data["wind_speed"] * 1000) / 1000)
      setTemp(Math.round(data["temperature"] * 1000) / 1000)
      setMarketPrice(Math.round(data["market_price"] * 1000) / 1000)
      setProduction(Math.round(data["prod_power"] * 10000) / 10000)
      setBufferCapacity(Math.round(data["buffer_capacity"] * 1000) / 1000)
      setSimDelta(data["delta"])
      setSimDateTime(data["date_time"])
      setConsumption(Math.round(data["consumption"] * 1000) / 1000)
      setBank(Math.round(data["bank"] * 1000) / 1000)
      newSimDeltaRef.current = simDelta
    } else {
      // TODO: Visual error for user
    }

  }, [])

  const net = Math.round((production - consumption) * 10000) / 10000
  const storingDisabled = false; //net < 0;
  const usingDisabled = false;

  async function handleUpdateDelta(e) {
    e.preventDefault()
    let token = loadToken()
    let request = requestEditDelta(newSimDeltaRef.current.value, token)
    const [success, data] = await request
  }

  return (
    <Container>
      <Row className="justify-content-center"
           style={{ marginTop: 50 }}>
      <Col xs lg="6" className="justify-content-center" style={{ marginTop: 50 }} >
        <Card>
          <Table striped bordered >
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
              <tr>
                <td>Wallet</td>
                <td>{bank}</td>
                <td>kr</td>
                <td>Economy</td>
              </tr>
              <tr>
                <td>Sim date & time</td>
                <td>{simDateTime}</td>
                <td>day/month hour/min/sec</td>
                <td>Simulation</td>
              </tr>
              <tr>
                <td>Update Frequency</td>
                <td>{simDelta}</td>
                <td>Seconds</td>
                <td>Simulation</td>
              </tr>
            </tbody>
          </Table>
            <Form>
              <Row style={{ marginTop: -16}}>
              <Form.Group as={Col} xs xxl="3">
                <Form.Control ref={newSimDeltaRef} placeholder={simDelta} />
              </Form.Group>
              <Form.Group as={Col}>
                <Button variant="primary" type="submit" onClick={handleUpdateDelta}>
                  Change simulation update frequency
                </Button>
              </Form.Group>
              </Row>
            </Form>
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
                <ProgressBar now={bufferCapacity} min={0} max={13.5} label={bufferCapacity + " kWh"}
                             style={{ height: 50 }} animated />
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
                ({Math.round((net * (storing / 100)) * 1000) / 1000} kWh) of excessive production.
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
                ({Math.abs(Math.round((net * (using / 100)) * 1000) / 1000)} kWh) of stored power.
              </Card.Text>
            </ListGroup.Item>
          </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}