import React, { useState } from 'react';
import { Button, Spinner, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../../../../assets/logoRR.png'; // Adjust path if needed
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const WelcomeStart = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const VerificationId = localStorage.getItem('VerificationId');

    const handleFinish = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post(
                `${BASE_URL}/api/orginazation/contractor-registration-uploading`,
                { agree_terms: true, VerificationId: VerificationId }, // Include any other necessary data
                {
                    headers: {
                        'Content-Type': 'application/json',
                        // Include auth token if required
                        // Authorization: `Bearer ${your_token}`
                    },
                }
            );

            if (response.status === 200) {
                window.location.href = 'http://3.27.123.86:3001/'; // ✅ Proper external redirect
            } else {
                setError('Unexpected response. Please try again.');
            }
        } catch (err) {
            setError('Failed to submit agreement. Please check your connection.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="welcome-container">
            <div className="welcome-card">
                {/* Top logo row */}
                <div className="top-logo-row mb-2">
                    <img src={logo} alt="Logo" className="top-logo" style={{ height: "70px" }} />
                </div>

                {/* Header Bar */}
                <div className="header-bar">Contractor Induction</div>

                <div className="container d-flex flex-column align-items-center">
                    {/* Confirmation Card */}
                    <div className="text-center mb-4 mt-5">
                        <div className="card-body">
                            <h2 className="card-title mb-3">🎉 Congratulations</h2>
                            <p className="card-text">
                                You have successfully completed the James Milson Village Contractor Induction.
                            </p>
                            <p className="card-text">You will receive a confirmation email shortly.</p>
                        </div>
                    </div>

                    {/* Email Notice */}
                    <div
                        className="d-flex align-items-center justify-content-center text-white text-center px-4 py-3 rounded mb-4"
                        style={{ backgroundColor: "#ff3333", maxWidth: "500px", width: "100%" }}
                    >
                        <span role="img" aria-label="email" className="me-2" style={{ fontSize: "54px" }}>
                            📧
                        </span>
                        IF YOU DON'T RECEIVE EMAIL IN THE NEXT FIVE MINUTES PLEASE CHECK YOUR JUNK/SPAM FOLDER
                    </div>

                    {/* Error Message */}
                    {error && (
                        <Alert variant="danger" style={{ maxWidth: "500px", width: "100%" }}>
                            {error}
                        </Alert>
                    )}

                    {/* Finish Button */}
                    <Button
                        className="text-white px-4 py-2 mb-5"
                        style={{ backgroundColor: "#66c7c0", borderColor: "#66c7c0" }}
                        onClick={handleFinish}
                        disabled={loading}
                        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#55b5a8")}
                        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#66c7c0")}
                    >
                        {loading ? (
                            <>
                                <Spinner size="sm" animation="border" className="me-2" />
                                Finishing...
                            </>
                        ) : (
                            'Finish'
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default WelcomeStart;
