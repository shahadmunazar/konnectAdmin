import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

function BankingDetails() {
  return (
    <div className="px-3 py-2">
      <Form>
        <Row className="mb-3 align-items-center">
          <Form.Label column sm={2}>
            BSB:
          </Form.Label>
          <Col sm={4}>
            <Form.Control type="text" />
          </Col>
        </Row>

        <Row className="mb-3 align-items-center">
          <Form.Label column sm={2}>
            Bank Name:
          </Form.Label>
          <Col sm={6}>
            <Form.Control type="text" readOnly className="bg-light" />
          </Col>
        </Row>

        <Row className="mb-3 align-items-center">
          <Form.Label column sm={2}>
            Branch:
          </Form.Label>
          <Col sm={6}>
            <Form.Control type="text" readOnly className="bg-light" />
          </Col>
        </Row>

        <Row className="mb-3 align-items-center">
          <Form.Label column sm={2}>
            Account Name:
          </Form.Label>
          <Col sm={6}>
            <Form.Control type="text" />
          </Col>
        </Row>

        <Row className="mb-4 align-items-center">
          <Form.Label column sm={2}>
            Account Number:
          </Form.Label>
          <Col sm={4}>
            <Form.Control type="text" />
          </Col>
        </Row>
        <div className="text-start">
          <Button variant="primary" className="text-white px-4">
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default BankingDetails;
