import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import logo from '../../../assets/logoRR.png'; // Ensure correct path


const InductionInfo = () => {
    const [agreed, setAgreed] = useState(false);

    const handleAgree = () => {
        setAgreed(true);

    };

    return (
        <div style={{
            backgroundColor: '#f5f5f5',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px',

        }}>
            <div style={{
                backgroundColor: '#fff',
                width: '100%',
                maxWidth: '800px',
                borderRadius: '8px',
                boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)',
                overflow: 'hidden'
            }}>
                {/* Logo */}
                <div style={{
                    padding: '15px 30px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start'
                }}>
                    <img src={logo} alt="James Milson Village" style={{ height: '70px' }} />
                </div>

                {/* Conditional View */}

                <div style={{
                    backgroundColor: '#3a3a3a',
                    color: '#fff',
                    padding: '2px 30px',
                    fontWeight: '600',
                    fontSize: '15px',
                    textAlign: 'left'
                }}>
                    Contractor Registration
                </div>
                {agreed ? (
                    // After Agree View
                    <div className="p-4 text-center">
                        <h4 style={{ fontWeight: '500', marginBottom: '20px', textAlign: "left" }}>Registration Instructions</h4>
                        <p style={{ fontSize: '16px', color: '#555', marginBottom: '10px', textAlign: "left" }}>
                            On the following page, you will be asked to register for a unique PIN that will allow you access into the James Milson Village Induction System.
                        </p>
                        <p style={{ fontSize: '16px', color: '#555', marginBottom: '30px', textAlign: "left" }}>
                            You will be required to enter this PIN to access each required course.
                        </p>
                        <Button style={{ backgroundColor: '#50bcbc', border: 'none', padding: '10px 30px', fontSize: '16px', textAlign: "left" }} onClick={() => window.location.href = '/inductions-login'}>
                            Get started now
                        </Button>
                        <div style={{ marginTop: '15px' }}>
                            <a href="#" style={{ color: '#007bff', fontSize: '14px' }}>Want to exit? Click here</a>
                        </div>
                    </div>
                ) : (
                    // Consent View
                    <>

                        <div className="p-4">
                            <h4 className="mb-4 text-center" style={{ letterSpacing: '0.5px', fontSize: '22px', fontWeight: '500' }}>
                                AVDESH KUMAR
                            </h4>

                            <p style={{ fontSize: '16px', color: '#555', textAlign: 'left', lineHeight: '1.6' }}>
                                You are consenting to the use of any personal data in accordance with our{' '}
                                <a href="#" style={{ color: '#007bff', textDecoration: 'underline' }} target="_blank" rel="noreferrer">
                                    Privacy policy
                                </a>. Your personal data will be shared with the company identified by name above.
                            </p>

                            <p style={{ fontSize: '16px', color: '#555', textAlign: 'left', marginTop: '15px', lineHeight: '1.6' }}>
                                Please click <strong>'Agree'</strong> to accept this use of your data. Alternatively, if you choose
                                to decline these terms you will be returned to the originating company portal.
                            </p>

                            <div className="mt-4 text-center">
                                <Button variant="outline-dark" className="me-3 px-4 py-2" style={{ fontSize: '15px' }}>
                                    Decline
                                </Button>
                                <Button variant="success" className="px-4 py-2" style={{ fontSize: '15px' }} onClick={handleAgree}>
                                    Agree
                                </Button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default InductionInfo;
