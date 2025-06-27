import React from 'react'
import { Form,Row,Col,Button } from 'react-bootstrap'

function BusinessDetails() {
  return (
    <div className='px-3'>
        <Form>
          <Row className="mb-3">
            <Form.Label column sm={2}>Company Name:</Form.Label>
            <Col sm={10}>
              <Form.Control type="text" value="S COX & A KUMRA" readOnly className="bg-light" />
            </Col>
          </Row>
          <Row className="mb-3">
            <Form.Label column sm={2}>Trading Name:</Form.Label>
            <Col sm={10}>
              <Form.Control type="text" value="S COX & A KUMRA" readOnly className="bg-light" />
            </Col>
          </Row>
          <Row className="mb-3">
            <Form.Label column sm={2}>ABN:</Form.Label>
            <Col sm={10}>
              <Form.Control type="text" value="31460423949" readOnly className="bg-light" />
            </Col>
          </Row>
          <Row className="mb-3">
            <Form.Label column sm={2}>Address Line 1:</Form.Label>
            <Col sm={10}>
              <Form.Control type="text" value="blacktown" />
            </Col>
          </Row>
          <Row className="mb-3">
            <Form.Label column sm={2}>Address Line 2:</Form.Label>
            <Col sm={10}>
              <Form.Control type="text" />
            </Col>
          </Row>

          <Row className="mb-3">
            <Form.Label column sm={2}>Country:</Form.Label>
            <Col sm={4}>
              <Form.Select defaultValue="Australia">
                <option>Australia</option>
              </Form.Select>
            </Col>
            <Form.Label column sm={2}>State:</Form.Label>
            <Col sm={4}>
              <Form.Select defaultValue="New South Wales">
                <option>New South Wales</option>
              </Form.Select>
            </Col>
          </Row>

          <Row className="mb-3">
            <Form.Label column sm={2}>Suburb:</Form.Label>
            <Col sm={4}>
              <Form.Control type="text" value="Blacktown" />
            </Col>
            <Form.Label column sm={2}>Postcode:</Form.Label>
            <Col sm={4}>
              <Form.Control type="text" value="2148" />
            </Col>
          </Row>

          <div className="text-start mt-4">
            <Button variant="primary" className="px-4">Save</Button>
          </div>
        </Form>
    </div>
  )
}

export default BusinessDetails