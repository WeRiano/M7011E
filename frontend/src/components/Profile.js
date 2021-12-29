import React, { useEffect, useRef, useState } from "react";
import { Button, Card, Col, Container, Form, Row} from "react-bootstrap";

import { useAuth } from '../contexts/AuthContext'
import { loadToken } from '../services/Storage'
import { requestUserInfo, requestEditUserInfo, requestEditUserPassword, requestEditUserImage, requestGetUserImage }
  from '../services/Api'

export default function Profile() {
  const [initData, setInitData] = useState({email: "", first_name: "", last_name: "",
                                                     address: "", city: "", zip_code: ""})
  const emailRef = useRef()
  const firstNameRef = useRef()
  const lastNameRef = useRef()
  const addressRef = useRef()
  const cityRef = useRef()
  const zipCodeRef = useRef()

  const newPassRef = useRef()
  const newPassConfRef = useRef()
  const curPassRef = useRef()

  const [imageUploadFile, setImageUploadFile] = useState(null)
  const [dispImageFile, setDispImageFile] = useState(null)

  const fetchUserImage = async () => {
    console.log("Fetching user image ...")
    let token = loadToken()
    let request = requestGetUserImage(token)
    const [success, data] = await request
    if (success) {
      setDispImageFile(data)
      console.log("Fetched user image!")
    } else {
      console.error("Error when downloading profile picture")
    }
  }

  useEffect(() => {
    let token = loadToken()

    const fetchUserInfo = async () => {
      let request = requestUserInfo(token)
      const [success, data] = await request
      if (success) {
        setInitData(data)
      }
    }

    fetchUserInfo()
    fetchUserImage()
  }, [])

  async function handleUpdateAccountInfo(e) {
    e.preventDefault()
    let user = {
      email: (emailRef.current.value === '') ? initData.email : emailRef.current.value,
      first_name: (firstNameRef.current.value === '') ? initData.first_name : firstNameRef.current.value,
      last_name: (lastNameRef.current.value === '') ? initData.last_name : lastNameRef.current.value,
      address: (addressRef.current.value === '') ? initData.address : addressRef.current.value,
      city: (cityRef.current.value === '') ? initData.city : cityRef.current.value,
      zip_code: (zipCodeRef.current.value === '') ? initData.zip_code : zipCodeRef.current.value,
    }
    let token = loadToken()
    let request = requestEditUserInfo(user, token)
    const [success, data] = await request
    if (success) {
      console.log("Updated user info!")
      window.location.reload(false)
    } else {
      console.error("Error when updating user info")
    }
  }

  async function handleUpdatePassword(e) {
    e.preventDefault()

    let token = loadToken()
    let request = requestEditUserPassword(newPassRef.current.value, newPassConfRef.current.value,
                                          curPassRef.current.value, token)
    const [success, data] = await request
    if (success) {
      console.log("Updated user password!")
      window.location.reload(false)
    } else {
      console.error("Error when updating user password")
    }
  }

  async function handleUpdateImage(e) {
    e.preventDefault()

    if (imageUploadFile == null) {
      // TODO: Visual error for user
      console.log("Please select a file")
      return
    }
    const type_parsed = imageUploadFile.type.split('/')
    if (type_parsed[0] !== 'image') {
      // TODO: Visual error for user
      console.error("Non-image files are not accepted")
      return
    }
    let reader = new FileReader()
    reader.onerror = () => {
      // TODO: Visual error for user
      console.log("Error when loading file: " + reader.error)
    }
    reader.onload = async() => {
      let token = loadToken()
      let request = requestEditUserImage(reader.result, type_parsed[1], token)
      const [success, data] = await request
      if (success) {
        console.log("Updated profile image successfully")
        window.location.reload(false)
      } else {
        console.error("Error when updating profile image")
      }
    }
    reader.readAsDataURL(imageUploadFile)
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
                <Card.Img style={{ width: 640/2, height: 480/2, borderRadius: 5 }} variant="right"
                          src={dispImageFile} />
              </Col>
              <Col>
                <Form>
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Control type="file"
                                  onChange={(e) => setImageUploadFile(e.target.files[0]) } />
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
                    <Form.Control ref={firstNameRef} placeholder={initData.first_name} />
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label>Last name</Form.Label>
                    <Form.Control ref={lastNameRef} placeholder={initData.last_name} />
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control ref={emailRef} placeholder={initData.email} />
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} xs="5">
                    <Form.Label>Address</Form.Label>
                    <Form.Control ref={addressRef} placeholder={initData.address} />
                  </Form.Group>
                  <Form.Group as={Col} xs="4">
                    <Form.Label>City</Form.Label>
                    <Form.Control ref={cityRef} placeholder={initData.city} />
                  </Form.Group>
                  <Form.Group as={Col} xs="3">
                    <Form.Label>Zip</Form.Label>
                    <Form.Control ref={zipCodeRef} placeholder={initData.zip_code} />
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
                    <Form.Label>Current password</Form.Label>
                    <Form.Control type="password" ref={curPassRef} />
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label>New password</Form.Label>
                    <Form.Control type="password" ref={newPassRef} />
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label>Confirm new password</Form.Label>
                    <Form.Control type="password" ref={newPassConfRef} />
                  </Form.Group>
                </Row>
                <Button variant="primary" type="submit" onClick={handleUpdatePassword}>
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
