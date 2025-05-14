import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

const ContractorVerify = ({ email }) => {
  const [passcode, setPasscode] = useState("");
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = /^\d{8}$/.test(passcode);
    setValidated(true);
    setError(null);
    setSuccess(null);

    if (!isValid) return;

    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Authentication token missing.");
        setLoading(false);
        return;
      }

      const response = await fetch("http://localhost:5000/api/orginazation/verify-multifactor-authentication", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email, otp: passcode }),
      });

      const result = await response.json();

      if (response.ok && result.status === 200) {
        setSuccess("Verification successful!");
      
        localStorage.setItem("invited_organization_by", result?.registration?.invited_organization_by); // Store the contractor token
        localStorage.setItem("contractor_invitation_id", result?.registration?.contractor_invitation_id); // Store the contractor token
        // Navigate to the contractor URL if available
        if (result.contractor_url) {
          window.location.href = result.contractor_url;
        }
      } else {
        throw new Error(result.message || "Verification failed.");
      }
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = () => {
    alert("Resend functionality should be implemented here.");
  };

  return (
    <div className="bg-light min-vh-100 py-5">
      <Container>
        <Card className="shadow-sm border-0 rounded">
          <Card.Body className="p-4 p-md-5 bg-white" style={{ borderRadius: "25px" }}>
            <Row className="align-items-center mb-4">
              <Col md={6}>
                <h3 className="fw-medium text-secondary">Contractor Pre-qualification Questionnaire</h3>
              </Col>
              <Col md={6} className="text-md-end text-center mt-3 mt-md-0">
                <img src={logo} alt="Logo" className="img-fluid" style={{ maxHeight: "90px", maxWidth: "220px" }} />
              </Col>
            </Row>

            <hr />

            <div className="text-start mb-4">
              <p className="text-secondary" style={{ fontSize: "1.1rem" }}>
                To continue, you'll need an <strong>8-digit passcode</strong>. We've sent this to your e-mail address{" "}
                <strong>{email}</strong>. Please check your e-mail. When you receive your passcode, enter it below.
              </p>
              <p className="text-muted mt-3" style={{ fontSize: ".9rem" }}>
                If you do not receive an email containing your passcode in the next 5 minutes, please check your spam folder.
              </p>
            </div>

            <Form noValidate onSubmit={handleSubmit}>
              <Row className="mb-4 align-items-center">
                <Col xs={12} md="auto" className="mb-2 mb-md-0">
                  <Form.Label className="fw-semibold text-secondary">Enter your passcode:</Form.Label>
                </Col>
                <Col xs={12} md={4}>
                  <Form.Control
                    type="text"
                    value={passcode}
                    maxLength={8}
                    onChange={(e) => setPasscode(e.target.value)}
                    isInvalid={validated && !/^\d{8}$/.test(passcode)}
                    className="border border-secondary-subtle rounded"
                  />
                  <Form.Control.Feedback type="invalid" className="text-start">
                    Please enter a valid 8-digit numeric passcode.
                  </Form.Control.Feedback>
                </Col>
              </Row>

              {error && <p className="text-danger">{error}</p>}
              {success && <p className="text-success">{success}</p>}

              <Row className="mb-5">
                <Col xs={12} md="auto">
                  <Button type="submit" variant="info" className="text-white fw-bold px-4" disabled={loading}>
                    {loading ? "Verifying..." : "Continue"}
                  </Button>
                </Col>
              </Row>
            </Form>

            <Row className="mt-4">
              <Col md={6} className="text-start">
                <p className="text-secondary fw-medium mb-2">Didn't get the e-mail or need a new code?</p>
                <Button variant="info" onClick={handleResend} className="text-white fw-bold">
                  Send me another email
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <div className="text-center mt-3">
          <a href="#" className="text-primary small text-decoration-none">
            Privacy Policy
          </a>
        </div>
      </Container>
    </div>
  );
};

export default ContractorVerify;
