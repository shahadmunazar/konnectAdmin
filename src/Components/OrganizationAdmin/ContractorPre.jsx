import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import logo from "../../assets/logoRR.png";
import ContractorVerify from "./ContractorVerify";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ContractorPre = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [validated, setValidated] = useState(false);
    const [focusScreen, setFocusScreen] = useState(true);
    const [error, setError] = useState(null); // Track API error
    const [success, setSuccess] = useState(null); // Optional
    
    const handleSubmit = async (event) => {
        localStorage.setItem("Email", email); // Store email in local storage
        event.preventDefault();

        const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        setValidated(true);
        setError(null);
        setSuccess(null);

        if (isValid) {
            setLoading(true);

            try {
               

                const response = await fetch(`${BASE_URL}/api/orginazation/send-multifactor-verification`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                      
                    },
                    body: JSON.stringify({ email }), // Sending payload
                });

                const result = await response.json();

                if (response.ok && result.status == 200) {
                    setSuccess("Verification sent successfully.");
                    setFocusScreen(false); // Move to next screen
                } else {
                    throw new Error(result.message || "Failed to send verification.");
                }
            } catch (err) {
                setError(err.message || "Something went wrong.");
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <>
            {focusScreen ? (
                <div style={{ backgroundColor: "#f0f0f0", minHeight: "100vh", paddingTop: "60px" }}>
                    <Container>
                        <Card className="shadow-sm border-0 rounded">
                            <Card.Body className="p-4 p-md-5 bg-white" style={{ borderRadius: "25px" }}>
                                <Row className="align-items-center mb-4">
                                    <Col md={6}>
                                        <h3 className="fw-medium text-secondary">
                                            Contractor Pre-qualification Questionnaire
                                        </h3>
                                    </Col>
                                    <Col md={6} className="text-md-end text-center mt-3 mt-md-0">
                                        <img
                                            src={logo}
                                            alt="Logo"
                                            className="img-fluid"
                                            style={{ maxHeight: "90px", maxWidth: "220px" }}
                                        />
                                    </Col>
                                </Row>

                                <hr />
                                <div className="text-start mb-4">
                                    <p className="text-secondary" style={{ fontSize: "1.1rem" }}>
                                        To begin the pre-registration process, please enter your e-mail address below.
                                        If at any time during the process you would like to stop and continue at a later
                                        date, click the <strong>'Save as Draft'</strong> button and you will receive an
                                        e-mail with a link to resume at another time.
                                    </p>
                                </div>

                                <Form noValidate onSubmit={handleSubmit} className="mt-5">
                                    <Form.Group controlId="email">
                                        <Row className="mb-4 align-items-center">
                                            <Col xs={12} md="auto" className="mb-2 mb-md-0">
                                                <Form.Label className="fw-semibold text-secondary">E-mail Address:</Form.Label>
                                            </Col>
                                            <Col xs={12} md={4}>
                                                <Form.Control
                                                    type="email"
                                                    placeholder="Enter your email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    isInvalid={validated && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)}
                                                    required
                                                />
                                                <Form.Control.Feedback type="invalid" style={{ textAlign: "left" }}>
                                                    Please enter a valid email address.
                                                </Form.Control.Feedback>
                                            </Col>
                                        </Row>
                                    </Form.Group>

                                    {error && <p className="text-danger">{error}</p>}
                                    {success && <p className="text-success">{success}</p>}

                                    <Row className="mt-4">
                                        <Col md={6} className="text-start">
                                            <Button
                                                variant="info"
                                                type="submit"
                                                className="px-4 py-2 text-white fs-5 fw-bold"
                                                style={{ width: "120px" }}
                                                disabled={loading}
                                            >
                                                {loading ? "Loading.." : "Start"}
                                            </Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Container>
                </div>
            ) : (
                <ContractorVerify email={email} />
            )}
        </>
    );
};

export default ContractorPre;
