import React, { useState } from 'react';
import { Form, Button, Row, Col, InputGroup } from 'react-bootstrap';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/bootstrap.css';
import { FaLock } from 'react-icons/fa';
import logo from '../../../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import PhotoUploadComponent from './PhotoUploadComponent';

const InductionsRegister = () => {
    const [mobile, setMobile] = useState('');
    const emails = 'avdeshy213@gmail.com';
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const [mobiles, setMobiles] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [file, setFile] = useState(null);
    const navigate = useNavigate(); // Step 1: Setup navigation

    const handleConfirm = () => {
        // You can also validate the OTP here before redirecting
        alert("OTP Confirmed!"); // For demonstration
        setStep(3); // Move to final form
    };

    const handleNext = () => {
        if (!mobile) {
            alert('Please enter mobile number.');
            return;
        }

        // Simulate sending OTP logic here if needed
        console.log('Sending OTP to:', email, mobile);

        // Show OTP screen
        setStep(2);
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

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const clearOtp = () => setOtp(new Array(6).fill(""));

    return (
        <>
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
                    {step === 1 && (

                        <div className="d-flex justify-content-center align-items-center" style={{ backgroundColor: '#fff' }}>
                            <div style={{ maxWidth: '600px', width: '100%', padding: '30px' }}>
                                <h5 style={{ marginBottom: '25px', fontWeight: '600' }}>Please enter your details</h5>
                                <Form>
                                    <Form.Group className="mb-3">
                                        <Form.Label style={{ fontSize: '14px' }}>First Name</Form.Label>
                                        <Form.Control type="text" placeholder="please enter your first name" />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label style={{ fontSize: '14px' }}>Last Name</Form.Label>
                                        <Form.Control type="text" placeholder="please enter your last name" />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label style={{ fontSize: '14px' }}>
                                            E-mail Address <FaLock style={{ color: '#777', marginLeft: '5px' }} />
                                        </Form.Label>
                                        <Form.Control type="email" value={emails} readOnly />
                                    </Form.Group>

                                    <Form.Group className="mb-4">
                                        <Form.Label style={{ fontSize: '14px' }}>Mobile</Form.Label>
                                        <PhoneInput
                                            country={'au'}
                                            value={mobile}
                                            onChange={setMobile}
                                            inputStyle={{
                                                width: '100%',
                                                height: '38px',
                                                borderRadius: '4px',
                                                fontSize: '14px'
                                            }}
                                            searchStyle={{
                                                fontSize: '14px'
                                            }}
                                            dropdownStyle={{
                                                fontSize: '14px'
                                            }}
                                            placeholder="Mobile"
                                            enableSearch={true}
                                        />
                                    </Form.Group>

                                    <div className="text-center mb-3">
                                        <Button
                                            style={{
                                                backgroundColor: '#50bcbc',
                                                border: 'none',
                                                padding: '8px 24px',
                                                borderRadius: '6px',
                                                fontWeight: '500'
                                            }}
                                            onClick={handleNext}
                                        >
                                            Next &rsaquo;
                                        </Button>
                                    </div>

                                    <div className="text-center">
                                        <Button
                                            variant="outline-info"
                                            style={{
                                                borderRadius: '6px',
                                                backgroundColor: '#50bcbc',
                                                color: '#fff',
                                                fontWeight: '500',
                                                padding: '8px 20px'
                                            }}
                                        >
                                            Want to exit? Click here
                                        </Button>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    )}
                    {step === 2 && (
                        <div className="p-4">
                            <h5 style={{ fontWeight: '600', marginBottom: '10px' }}>Enter Verification Code</h5>
                            <p style={{ fontSize: '16px', color: '#555', marginBottom: '10px', textAlign: "left" }}>
                                A code has been sent to +91 63941 21571
                                (code expires in 30 minutes)
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
                    )}
                    {step === 3 && (
                        <div className="d-flex justify-content-center align-items-center" style={{ backgroundColor: '#fff' }}>
                            <div style={{ maxWidth: '800px', width: '100%', padding: '30px' }}>
                                <h5 className="mb-4" style={{ fontWeight: '600' }}>Please enter your details</h5>
                                <Form>
                                    <Form.Group as={Row} className="mb-3">
                                        <Form.Label column sm={3}>First Name</Form.Label>
                                        <Col sm={9}><Form.Control type="text" placeholder="First Name" /></Col>
                                    </Form.Group>

                                    <Form.Group as={Row} className="mb-3">
                                        <Form.Label column sm={3}>Last Name</Form.Label>
                                        <Col sm={9}><Form.Control type="text" placeholder="Last Name" /></Col>
                                    </Form.Group>

                                    <Form.Group as={Row} className="mb-3">
                                        <Form.Label column sm={3}>E-mail Address <FaLock style={{ color: '#777' }} /></Form.Label>
                                        <Col sm={9}><Form.Control type="email" value={emails} readOnly /></Col>
                                    </Form.Group>

                                    <Form.Group as={Row} className="mb-3">
                                        <Form.Label column sm={3}>Mobile</Form.Label>
                                        <Col sm={9}><PhoneInput country={'in'} value={mobile} onChange={setMobiles} inputStyle={{ width: '100%' }} enableSearch /></Col>
                                    </Form.Group>

                                    <Form.Group as={Row} className="mb-3">
                                        <Form.Label column sm={3}>Organization Name</Form.Label>
                                        <Col sm={9}><Form.Control type="text" placeholder="Organization Name" /></Col>
                                    </Form.Group>

                                    <Form.Group as={Row} className="mb-3">
                                        <Form.Label column sm={3}>Address</Form.Label>
                                        <Col sm={9}>
                                            <InputGroup>
                                                <Form.Select style={{ maxWidth: '180px' }}>
                                                    <option>India</option>
                                                    <option>USA</option>
                                                    <option>UK</option>
                                                </Form.Select>
                                                <Form.Control placeholder="Street number, suburb etc." />
                                            </InputGroup>
                                        </Col>
                                    </Form.Group>
                                    {/* Searchable Location Input */}
                                    <Form.Group as={Row} className="mb-3">
                                        <Form.Label column sm={3}></Form.Label>
                                        <Col sm={9}>
                                            <Form.Control type="text" placeholder="Search for location..." />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3">
                                        <Form.Label column sm={3}>Trade Type</Form.Label>
                                        <Col sm={9}>
                                            <Form.Select>
                                                <option value="">Select Trade Type</option>
                                                <option>Carpenter</option>
                                                <option>Electrician</option>
                                                <option>Plumber</option>
                                                <option>Welder</option>
                                                <option>Painter</option>
                                                <option>Other</option>
                                            </Form.Select>
                                        </Col>
                                    </Form.Group>

                                    <PhotoUploadComponent/>

                                    <Form.Group as={Row} className="mb-4">
                                        <Form.Label column sm={3}>Password</Form.Label>
                                        <Col sm={9}>
                                            <InputGroup>
                                                <Form.Control type={passwordVisible ? 'text' : 'password'} placeholder="Enter a password" />
                                                <Button variant="outline-secondary" onClick={() => setPasswordVisible(!passwordVisible)}>
                                                    {passwordVisible ? 'HIDE' : 'SHOW'}
                                                </Button>
                                            </InputGroup>
                                        </Col>
                                    </Form.Group>

                                    <div className="text-center mb-3">
                                        <Button style={{ backgroundColor: '#50bcbc', border: 'none', padding: '8px 24px', borderRadius: '6px', fontWeight: '500' }}>
                                            Continue &rsaquo;
                                        </Button>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    )}
                </div>
            </div></>

    );
};

export default InductionsRegister;
