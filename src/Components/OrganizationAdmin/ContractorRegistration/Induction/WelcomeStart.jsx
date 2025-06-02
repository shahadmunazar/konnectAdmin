import React from 'react';
import { Button } from 'react-bootstrap';
import logo from '../../../../assets/logo.png'; // Update path if needed


const WelcomeStart = () => {
  return (
    <div className="welcome-container">
      <div className="welcome-card">
        {/* Top logo row */}
        <div className="top-logo-row">
          <img src={logo} alt="Logo" className="top-logo" />
        </div>

        {/* Header Bar */}
        <div className="header-bar">Contractor Induction</div>

        {/* Main Content */}
        <div className="main-content text-center">
          <h5 className="welcome-text">Welcome to the</h5>

          <img src={logo} alt="Main Logo" className="main-logo" />

          <p className="induction-title">Contractor Induction</p>

          <a
            href="https://www.jamesmilsonvillage.com.au"
            className="website-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            www.jamesmilsonvillage.com.au
          </a>

          <p className="powered-by">
            Powered by <strong>LinkSafe</strong>
          </p>

          <Button className="next-button" variant="light">
            Next &gt;
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeStart;
