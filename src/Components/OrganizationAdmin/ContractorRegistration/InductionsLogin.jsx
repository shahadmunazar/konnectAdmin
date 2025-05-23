import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import logo from '../../../assets/logo.png';
import { useNavigate } from 'react-router-dom';

const InductionsLogin = () => {
    const [agreed, setAgreed] = useState(false);
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const navigate = useNavigate(); // Step 1: Setup navigation

    const handleConfirm = () => {
        // You can also validate the OTP here before redirecting
        alert("OTP Confirmed!"); // For demonstration
        navigate('/inductions-register'); // Step 2: Redirect to another page
    };

    const handleEmailSubmit = (e) => {
        e.preventDefault();
        setAgreed(true);
    };

    const handleOtpChange = (element, index) => {
        if (isNaN(element.value)) return;
        const newOtp = [...otp];
        newOtp[index] = element.value;
        setOtp(newOtp);
        if (element.nextSibling && element.value !== "") {
            element.nextSibling.focus();
        }
    };

    const clearOtp = () => setOtp(new Array(6).fill(""));

    return (
        <div style={{
            backgroundColor: '#f0f4f8',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px'
        }}>
            <div style={{
                backgroundColor: '#fff',
                width: '100%',
                maxWidth: '800px',
                borderRadius: '12px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                overflow: 'hidden',
                fontFamily: 'Segoe UI, sans-serif'
            }}>
                {/* Header */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '25px 30px',
                    borderBottom: '1px solid #eee',
                    backgroundColor: '#ffffff'
                }}>
                    <img src={logo} alt="Logo" style={{ height: '80px' }} />
                </div>

                {/* Banner */}
                <div style={{
                    backgroundColor: '#3a3a3a',
                    color: '#fff',
                    padding: '14px 30px',
                    fontSize: '18px',
                    fontWeight: '600',
                    textAlign: 'left'
                }}>
                    Contractor Registration
                </div>

                {/* Conditional Content */}
                {agreed ? (
                    <div className="p-4">
                        <h5 style={{ fontWeight: '600', marginBottom: '10px' }}>Let's get started!</h5>
                        <p style={{ fontSize: '16px', color: '#555', marginBottom: '10px', textAlign: "left" }}>
                            To create your LinkSafe profile, we first need you to verify your email address.
                        </p>
                        <p style={{ fontSize: '16px', color: '#555', marginBottom: '10px', textAlign: "left" }}>
                            We’ve sent a code to <strong>{email}</strong>.
                        </p>
                        <p style={{ fontSize: '16px', color: '#555', marginBottom: '10px', textAlign: "left" }}>
                            When you receive the email, please enter the code below.<br />
                            <span style={{ fontSize: '13px' }}>(Code expires in 30 minutes)</span>
                        </p>

                        <div style={{
                            backgroundColor: '#eaf4fd',
                            padding: '10px 15px',
                            borderRadius: '6px',
                            marginBottom: '20px',
                            fontSize: '14px',
                            color: '#005b96'
                        }}>
                            If you do not receive this email, please check your spam folder.
                        </div>

                        {/* OTP Input Fields */}
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '25px' }}>
                            {otp.map((digit, idx) => (
                                <input
                                    key={idx}
                                    type="text"
                                    maxLength="1"
                                    value={digit}
                                    onChange={e => handleOtpChange(e.target, idx)}
                                    onFocus={e => e.target.select()}
                                    style={{
                                        width: '45px',
                                        height: '55px',
                                        textAlign: 'center',
                                        fontSize: '20px',
                                        border: '1px solid #ccc',
                                        borderRadius: '8px',
                                        boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)'
                                    }}
                                />
                            ))}
                        </div>

                        {/* Action Buttons */}
                        <div className="d-flex justify-content-center gap-3">
                            <Button variant="outline-secondary" onClick={() => setAgreed(false)}>Back</Button>
                            <Button variant="outline-danger" onClick={clearOtp}>Clear</Button>
                            <Button style={{ backgroundColor: '#50bcbc', border: 'none' }}   onClick={handleConfirm}>Confirm</Button>
                        </div>
                    </div>
                ) : (
                    <div style={{
                        maxWidth: '500px',
                        margin: '50px auto',
                        padding: '30px',
                        borderRadius: '10px',
                        backgroundColor: '#ffffff',
                        border: '1px solid #ddd',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
                    }}>
                        <Form onSubmit={handleEmailSubmit}>
                            <Form.Group controlId="email" className="mb-4">
                                <Form.Label style={{
                                    color: '#007bff',
                                    fontWeight: '500',
                                    fontSize: '16px'
                                }}>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter your email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    style={{
                                        borderRadius: '8px',
                                        padding: '14px',
                                        fontSize: '15px',
                                        border: '1px solid #ccc'
                                    }}
                                />
                            </Form.Group>
                            <div className="text-end">
                                <Button
                                    type="submit"
                                    style={{
                                        backgroundColor: '#50bcbc',
                                        border: 'none',
                                        padding: '10px 28px',
                                        fontSize: '15px',
                                        borderRadius: '6px'
                                    }}
                                >
                                    Next
                                </Button>
                            </div>
                        </Form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default InductionsLogin;
