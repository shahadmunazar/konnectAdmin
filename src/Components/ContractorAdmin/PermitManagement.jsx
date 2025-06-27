import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faXmark } from '@fortawesome/free-solid-svg-icons';
import Header from "./header";
function PermitManagement() {
  return (
    <div className="d-flex">
      <Header />
      <Container className="mt-5">
        <h3 className="fw-semibold mb-4">Permit Management</h3>
        <Form>
          <Row className="gy-3 align-items-center mb-3">
            <Col md={2} sm={6}>
              <Form.Label>Company:</Form.Label>
              <Form.Select>
                <option>(ALL)</option>
              </Form.Select>
            </Col>

            <Col md={2} sm={6}>
              <Form.Label>Status:</Form.Label>
              <Form.Select>
                <option>(ALL)</option>
              </Form.Select>
            </Col>

            <Col md={2} sm={6}>
              <Form.Label>Keywords:</Form.Label>
              <Form.Control type="text" placeholder="" />
            </Col>

            <Col md={2} sm={6}>
              <Form.Label>Date From:</Form.Label>
              <Form.Control type="date" />
            </Col>

            <Col md={2} sm={6}>
              <Form.Label>Date To:</Form.Label>
              <Form.Control type="date" />
            </Col>

            <Col lg={2} md={3} xs={6} className="mt-5 d-flex gap-2">
              <FontAwesomeIcon icon={faSearch} size="xl"  style={{}} />
              <FontAwesomeIcon icon={faXmark} size="xl"  style={{}}/>
            </Col>
          </Row>
        </Form>

        <div className="mt-4 text-secondary">
          <p>We couldn't find any permits matching the specified criteria.</p>
        </div>

        <div className="d-flex gap-3 mt-3">
          <Button>Report</Button>
          <Button>Apply</Button>
        </div>
      </Container>
    </div>
  );
}

export default PermitManagement;
