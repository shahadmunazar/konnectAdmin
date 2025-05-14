import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

const iconStyle = {
  color: '#4ecdc4',
  fontSize: 56,
  marginBottom: 16,
};

const cardStyle = {
  border: '1px solid #e0e0e0',
  borderRadius: 8,
  background: '#fff',
  padding: '32px 16px 24px 16px',
  textAlign: 'center',
  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
  minHeight: 280,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
};

const SubmissionReady = ({ userName = "com", onSubmit, onReview, onSave }) => (
  <Container style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 0' }}>
    <div style={{ textAlign: 'center', marginBottom: 40 }}>
      <h2 style={{ color: '#5a6e73', fontWeight: 500, fontSize: 32, marginBottom: 8 }}>
        Almost there {userName},
      </h2>
      <div style={{ color: '#5a6e73', fontSize: 22, marginBottom: 8 }}>
        Your submission is now ready. <span style={{ fontSize: 36, verticalAlign: 'middle', color: '#4ecdc4', marginLeft: 8 }}>:)</span>
      </div>
      <div style={{ color: '#7b8a8b', fontSize: 16, marginBottom: 32 }}>
        When you confirm your submission, we'll send you a copy of your answers in PDF format.
      </div>
    </div>
    <Row className="justify-content-center" style={{ gap: 24 }}>
      <Col xs={12} md={4} style={{ marginBottom: 24 }}>
        <div style={cardStyle}>
          <div style={{ marginBottom: 16 }}>
            <div style={{ color: '#4ecdc4', fontSize: 44, marginBottom: 8 }}>
              <svg width="56" height="56" fill="none" viewBox="0 0 56 56"><circle cx="28" cy="28" r="26" stroke="#4ecdc4" strokeWidth="3" fill="none"/><path d="M18 29l7 7 13-13" stroke="#4ecdc4" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>
            </div>
            <div style={{ color: '#5a6e73', fontSize: 18, marginBottom: 8 }}>Let's do it</div>
          </div>
          <Button style={{ background: '#4ecdc4', border: 'none', fontWeight: 500, fontSize: 16, padding: '8px 28px', borderRadius: 6, boxShadow: '0 2px 6px rgba(0,0,0,0.07)' }} onClick={onSubmit}>
            Confirm & submit
          </Button>
        </div>
      </Col>
      <Col xs={12} md={4} style={{ marginBottom: 24 }}>
        <div style={cardStyle}>
          <div style={{ marginBottom: 16 }}>
            <div style={{ color: '#4ecdc4', fontSize: 44, marginBottom: 8 }}>
              <svg width="56" height="56" fill="none" viewBox="0 0 56 56"><circle cx="28" cy="28" r="26" stroke="#4ecdc4" strokeWidth="3" fill="none"/><path d="M18 38V18h20v20H18zm8-8h4" stroke="#4ecdc4" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/><path d="M28 34v-8" stroke="#4ecdc4" strokeWidth="3" strokeLinecap="round"/></svg>
            </div>
            <div style={{ color: '#5a6e73', fontSize: 18, marginBottom: 8 }}>Let me check my answers</div>
          </div>
          <Button style={{ background: '#4ecdc4', border: 'none', fontWeight: 500, fontSize: 16, padding: '8px 28px', borderRadius: 6, boxShadow: '0 2px 6px rgba(0,0,0,0.07)' }} onClick={onReview}>
            Review or Alter
          </Button>
        </div>
      </Col>
      <Col xs={12} md={4} style={{ marginBottom: 24 }}>
        <div style={cardStyle}>
          <div style={{ marginBottom: 16 }}>
            <div style={{ color: '#4ecdc4', fontSize: 44, marginBottom: 8 }}>
              <svg width="56" height="56" fill="none" viewBox="0 0 56 56"><circle cx="28" cy="28" r="26" stroke="#4ecdc4" strokeWidth="3" fill="none"/><rect x="18" y="18" width="20" height="20" rx="4" stroke="#4ecdc4" strokeWidth="3" fill="none"/><path d="M28 24v6h4" stroke="#4ecdc4" strokeWidth="3" strokeLinecap="round"/></svg>
            </div>
            <div style={{ color: '#5a6e73', fontSize: 18, marginBottom: 8 }}>I'll do it later</div>
          </div>
          <Button style={{ background: '#4ecdc4', border: 'none', fontWeight: 500, fontSize: 16, padding: '8px 28px', borderRadius: 6, boxShadow: '0 2px 6px rgba(0,0,0,0.07)' }} onClick={onSave}>
            Save, and come back later
          </Button>
        </div>
      </Col>
    </Row>
  </Container>
);

export default SubmissionReady; 