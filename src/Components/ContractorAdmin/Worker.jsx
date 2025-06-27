import React from "react";
import { Container, Row, Col, Form, Table, Button } from "react-bootstrap";
import Header from "./header";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faXmark } from '@fortawesome/free-solid-svg-icons';
const Worker = () => {
  return (
       <div className="d-flex"> 
        <Header/>
        <Container fluid className="p-4 w-100">
        <h2 className="mb-4 fw-bold">Workers</h2>
        {/* Filters Section */}
        <Row className="g-3 mb-3 align-items-end">
          <Col lg={4} md={6}>
            <Form.Label className="fw-semibold">Company:</Form.Label>
            <Form.Select>
              <option>James Milson Village - S COX & A KUMRA</option>
            </Form.Select>
          </Col>
          <Col lg={2} md={3}>
            <Form.Label className="fw-semibold">First Name:</Form.Label>
            <Form.Control type="text" />
          </Col>
          <Col lg={2} md={3}>
            <Form.Label className="fw-semibold">Last Name:</Form.Label>
            <Form.Control type="text" />
          </Col>
          <Col lg={2} md={4}>
            <Form.Label className="fw-semibold">Worker Status:</Form.Label>
            <Form.Select>
              <option>(ANY)</option>
            </Form.Select>
          </Col>
          <Col lg={2} md={3} xs={6} className="mt-0 mb-2 d-flex gap-2">
            <FontAwesomeIcon icon={faSearch} size="xl" />
            <FontAwesomeIcon icon={faXmark} size="xl" />
          </Col>
        </Row>

        {/* Table */}
        <div
          className="table-responsive fs-7"
          style={{ maxHeight: "200px", overflowY: "auto" }}
        >
          <Table bordered hover className="align-middle mb-0">
            <thead style={{ borderTop: "2px solid orange" }}>
              <tr>
                <th>PIN</th>
                <th>
                  First Name <span>&#x25B2;</span>
                </th>
                <th>Last Name</th>
                <th>Primary Contractor</th>
                <th>Client</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["16960918", "avdesh", "kumar"],
                ["16964897", "avdesh", "kumar"],
                ["16977040", "avdesh", "kumar"],
                ["16952312", "avdesh kk", "kumar k"],
                ["16967587", "Dev", "Raj"],
                ["16980340", "jerry", "raj"],
                ["16981234", "anil", "sharma"],
                ["16981235", "sunny", "mehta"],
                ["16981236", "rohit", "singh"],
                ["16981237", "mohan", "lal"],
                ["16981238", "deepak", "kumar"],
              ].map(([pin, fname, lname], index) => (
                <tr key={index}>
                  <td className="text-danger fw-bold">{pin}</td>
                  <td className="text-capitalize">{fname}</td>
                  <td className="text-capitalize">{lname}</td>
                  <td>S COX & A KUMRA</td>
                  <td>James Milson Village</td>
                  <td>Active</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        {/* Footer */}
        <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap">
          <div className="fw-semibold text-muted">
            displaying records 1 to 6 of 11
          </div>
          <div className="mt-2 mt-sm-0 d-flex gap-2">
            <Button variant="primary">Induct New Worker</Button>
            <Button variant="primary">Link Existing Worker</Button>
            <Button variant="primary">Report</Button>
          </div>
        </div>
      </Container>
      </div>
  );
};

export default Worker;
