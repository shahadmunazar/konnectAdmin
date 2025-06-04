
import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import logo from '../../../../assets/logoRR.png'; // Update path if needed

const WelcomeStart = () => {
    const navigate = useNavigate();

    const handleNext = () => {
        navigate('/inductions-course-page');
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
                        <div className=" text-center mb-4 mt-5" >
                            <div className="card-body">
                                <h2 className="card-title mb-3">🎉 Congratulations</h2>
                                <p className="card-text">
                                    You have successfully completed the James Milson Village Contractor Induction.
                                </p>
                                <p className="card-text">You will receive a confirmation email shortly.</p>
                            </div>
                        </div>

                        {/* Email Notice Box */}
                        <div
                            className="d-flex align-items-center justify-content-center text-white text-center px-4 py-3 rounded mb-4"
                            style={{
                                backgroundColor: "#ff3333",
                                maxWidth: "500px",
                                width: "100%"
                            }}
                        >
                            <span role="img" aria-label="email" className="me-2" style={{ fontSize: "54px" }}>
                                📧
                            </span>
                            IF YOU DON'T RECEIVE EMAIL IN THE NEXT FIVE MINUTES PLEASE CHECK YOUR JUNK/SPAM FOLDER
                        </div>

                        {/* Finish Button */}
                        <button
                            className="btn text-white px-4 py-2 mb-5"
                            style={{
                                backgroundColor: "#66c7c0",
                                borderColor: "#66c7c0"
                            }}
                            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#55b5a8")}
                            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#66c7c0")}
                        >
                            Finish
                        </button>
                    </div>
                </div>
         
        </div>
    );
};

export default WelcomeStart;
