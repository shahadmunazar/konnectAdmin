import React from 'react';
import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import { BsSearch, BsX } from 'react-icons/bs';
import './SiteHistory.css'; // Optional for extra styling
import Header from './header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faXmark } from '@fortawesome/free-solid-svg-icons';

function SiteHistory() {
  return (
       <div className='d-flex'>
        <Header/>
         <Container className="mt-5">
      <h3 className="fw-semibold mb-4">Site History</h3>
      <Form>
        <Row className="gy-3 align-items-center mb-3">
          <Col lg={4} md={6}>
            <Form.Label>Company:</Form.Label>
            <Form.Select>
              <option>James Milson Village - S COX & A KUMRA</option>
            </Form.Select>
          </Col>

          <Col lg={4} md={6}>
            <Form.Label>Site:</Form.Label>
            <Form.Select>
              <option>(ALL)</option>
            </Form.Select>
          </Col>

          <Col lg={4} md={6}>
            <Form.Label>Status:</Form.Label>
            <Form.Select>
              <option>(ALL)</option>
            </Form.Select>
          </Col>

          <Col lg={4} md={6}>
            <Form.Label>PIN:</Form.Label>
            <Form.Control type="text" placeholder="" />
          </Col>

          <Col lg={4} md={6}>
            <Form.Label>Name:</Form.Label>
            <Form.Control type="text" placeholder="" />
          </Col>

          <Col lg={3} md={6}>
            <Form.Label>Date From:</Form.Label>
            <Form.Control type="date" />
          </Col>

          <Col lg={3} md={6}>
            <Form.Label>Date To:</Form.Label>
            <Form.Control type="date" />
          </Col>

          <Col lg={2} md={3} xs={6} className="mt-5 d-flex">
             <FontAwesomeIcon icon={faSearch} className='me-2' size='xl'/>
             <FontAwesomeIcon icon={faXmark} size='xl'/>
          </Col>
        </Row>
      </Form>

      <div className="mt-4 mb-4 text-secondary text-start">
        <p>
          We couldn't find any site history matching the search criteria.
          This does not necessarily indicate a problem. It could be because
          you have not sent any workers to the location you are searching for,
          or the LinkSafe sign-in system is not available.
        </p>
      </div>

      <Button variant="primary" className="text-white px-4">Report</Button>
    </Container>
       </div>
  );
}

export default SiteHistory;
