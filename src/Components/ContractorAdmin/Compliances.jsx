import React from 'react';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';
import { BsSearch, BsX } from 'react-icons/bs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faXmark } from '@fortawesome/free-solid-svg-icons';
import Header from './header';
function ComplianceItems() {
  const items = [
    {
      type: 'Public Liability Insurance',
      client: 'James Milson Village',
      company: 'S COX & A KUMRA',
      status: 'Valid',
      expiry: '30/04/2027'
    },
    {
      type: 'Workers Compensation Insurance',
      client: 'James Milson Village',
      company: 'S COX & A KUMRA',
      status: 'Valid',
      expiry: '30/04/2027'
    }
  ];

  return (
     <div className='d-flex'>
     <Header/>
     <Container className="mt-5">
      <h3 className="fw-semibold mb-4">Compliance Items</h3>

      <Form>
        <Row className="gy-3 align-items-center mb-3">
          <Col md={4} sm={6}>
            <Form.Label>Company:</Form.Label>
            <Form.Select>
              <option>(ALL)</option>
            </Form.Select>
          </Col>

          <Col md={4} sm={6}>
            <Form.Label>Status:</Form.Label>
            <Form.Select>
              <option>(ANY)</option>
            </Form.Select>
          </Col>

          <Col md={4} sm={6}>
            <Form.Label>Keywords:</Form.Label>
            <div className="d-flex align-items-center">
              <Form.Control type="text" className="me-2" />
              <Button variant="light" className="border me-2">
                <BsSearch size={20} />
              </Button>
              <Button variant="light" className="border">
                <BsX size={22} />
              </Button>
            </div>
          </Col>
        </Row>
      </Form>

      <Table responsive hover className="border-top" style={{ borderColor: '#ed8727' }}>
        <thead>
          <tr>
            <th className="text-nowrap">Compliance Type <span className="fw-bold">&#x25B2;</span></th>
            <th>Client</th>
            <th>Company Name</th>
            <th>Status</th>
            <th>Expiry</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, idx) => (
            <tr key={idx}>
              <td>
                <Form.Check type="checkbox" label={item.type} />
              </td>
              <td>{item.client}</td>
              <td>{item.company}</td>
              <td className="text-success">{item.status}</td>
              <td>{item.expiry}</td>
              <td>
                <span className="text-warning me-3" role="button">view</span>
                <span className="text-warning" role="button">update</span>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center mt-3">
        <Button className="btn-orange mb-3 mb-sm-0">update selections</Button>
        <div className="text-muted">displaying records 1 to {items.length} of {items.length}</div>
      </div>
    </Container>
     </div>
  );
}

export default ComplianceItems;
