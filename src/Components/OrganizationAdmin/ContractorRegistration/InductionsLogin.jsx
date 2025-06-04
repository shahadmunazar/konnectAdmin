import React, { useState ,useEffect} from 'react';
import { Button, Form } from 'react-bootstrap';
import logo from '../../../assets/logoRR.png';
import { useNavigate } from 'react-router-dom';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const InductionsLogin = () => {
    const [agreed, setAgreed] = useState(false);
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const navigate = useNavigate(); // Step 1: Setup navigation

    const handleConfirm = async () => {
        try {
            const response = await fetch(`${BASE_URL}/api/orginazation/verify-mobile-and-email`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ otpcode: otp.join(''), userEmail: email }),
            });
            console.log("Response:", response); // Log the response for debugging
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log("OTP verification response:", data); // Log the response for debugging
            if (data.status == 200) {
               
                navigate('/inductions-register'); // Step 2: Redirect to another page
            } else {
                alert("Invalid OTP. Please try again.");
            }
        } catch (error) {
            console.error("Error verifying OTP:", error);
            alert("An error occurred while verifying the OTP. Please try again.");
        }
        // navigate('/inductions-register'); // Step 2: Redirect to another page
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

    const SendOtp = async () => {
        localStorage.setItem("email", email);
        try {
            const response = await fetch(`${BASE_URL}/api/orginazation/register-with-induction-contractor`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userEmail: email }),
            });

            console.log("Response:", response);
            setAgreed(true);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log("OTP sent successfully:", data);

        } catch (error) {
            console.error("Error sending OTP:", error);
        }
    }

    useEffect(() => {   
       localStorage.removeItem('step');
    }, []);

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
                    padding: '15px 30px',
                    borderBottom: '1px solid #eee',
                    backgroundColor: '#ffffff'
                }}>
                    <img src={logo} alt="Logo" style={{ height: '70px' }} />
                </div>

                {/* Banner */}
                <div style={{
                    backgroundColor: '#3a3a3a',
                    color: '#fff',
                    padding: '2px 30px',
                    fontSize: '15px',
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
                            To create your Konnect profile, we first need you to verify your email address.
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
                            <Button style={{ backgroundColor: '#50bcbc', border: 'none' }} onClick={handleConfirm}>Confirm</Button>
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
                        <Form >
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
                               
                                    style={{
                                        backgroundColor: '#50bcbc',
                                        border: 'none',
                                        padding: '10px 28px',
                                        fontSize: '15px',
                                        borderRadius: '6px'
                                    }}
                                    onClick={SendOtp} // Call SendOtp function on button click
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
