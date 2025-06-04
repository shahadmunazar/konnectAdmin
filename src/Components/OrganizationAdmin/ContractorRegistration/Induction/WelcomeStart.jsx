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
          <img src={logo} alt="Logo" className="top-logo" style={{height:"70px"}} />
        </div>

        {/* Header Bar */}
        <div className="header-bar">Contractor Induction</div>

        {/* Main Content */}
        <div className="main-content text-center">
          <h5 className="welcome-text">Welcome to the</h5>

          <img src={logo} alt="Main Logo" className="main-logo" style={{height:"100px"}}/>

          <p className="induction-title">Contractor Induction</p>

          <a
            href="http://3.27.123.86:3001/"
            className="website-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            www.konnect.com.au
          </a>

          <p className="powered-by">
            Powered by <strong>Konnect</strong>
          </p>

          <Button className="next-button" variant="light" onClick={handleNext}>
            Next &gt;
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeStart;
