import React, { useState, useEffect } from "react";
import { Form, Button, Card, Row, Col, Alert, Nav } from "react-bootstrap";
import {
  FaUserCircle,
  FaEnvelope,
  FaKey,
  FaShieldAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import Layout from "../Layout/Layout";

const AccountSettings = () => {
  const [activeSection, setActiveSection] = useState("profile");
  const [profile, setProfile] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
  });

  const [formState, setFormState] = useState({
    newEmail: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [twoFAEnabled, setTwoFAEnabled] = useState("");
  console.log("TwoFAEnabled", twoFAEnabled);
  const [message, setMessage] = useState("");
  const [emailVerificationSent, setEmailVerificationSent] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const response = {
        name: "Super Admin",
        address: "123 Admin St",
        phone: "9876543210",
        email: "admin@example.com",
      };
      setProfile(response);
    };

    fetchProfile();
  }, []);

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleUpdateProfile = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:5000/api/superadmin/profile-update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: profile.name,
          email: profile.email,
          phone: profile.phone,
          address: profile.address,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || "Profile updated successfully.");
      } else {
        setMessage(data.message || "Failed to update profile.");
      }
    } catch (error) {
      console.error("Profile update error:", error);
      setMessage("Something went wrong. Please try again.");
    }
  };

  const handleToggle2FA = async () => {
    const token = localStorage.getItem("token");
    const updatedValue = !twoFAEnabled;

    try {
      const response = await fetch("http://localhost:5000/api/superadmin/active-multi-factor", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ is_two_factor_enabled: updatedValue }),
      });

      const data = await response.json();

      if (response.ok) {
        setTwoFAEnabled(updatedValue);
        setMessage(data.message || `Two-Factor Authentication ${updatedValue ? "enabled" : "disabled"}.`);
      } else {
        setMessage(data.message || "Failed to update 2FA setting.");
      }
    } catch (error) {
      console.error("2FA toggle error:", error);
      setMessage("Something went wrong. Please try again.");
    }
  };

  const handleSendEmailVerification = () => {
    setEmailVerificationSent(true);
    setMessage("Verification link sent to new email.");
  };

  const handleChangePassword = async () => {
    const { currentPassword, newPassword, confirmPassword } = formState;

    if (!currentPassword || !newPassword || !confirmPassword) {
      return setMessage("All password fields are required.");
    }

    if (newPassword !== confirmPassword) {
      return setMessage("New passwords do not match.");
    }

    if (newPassword.length < 8) {
      return setMessage("Password should be at least 8 characters long.");
    }

    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5000/api/superadmin/update-password-by-superadmin", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          current_password: currentPassword,
          password: newPassword,
          confirm_password: confirmPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || "Password updated successfully.");
        setFormState({ currentPassword: "", newPassword: "", confirmPassword: "" });
      } else {
        setMessage(data.message || "Failed to update password.");
      }
    } catch (error) {
      console.error("Password change error:", error);
      setMessage("Something went wrong. Please try again.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  useEffect(() => {
    const fetchTwoFAStatus = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch("http://localhost:5000/api/superadmin/get-status-of-multifactor", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
  
        const data = await response.json();
  
        if (response.ok) {
          console.log("TwoFA Status:", data?.data?.is_two_factor_enabled );
          setTwoFAEnabled(data?.data?.is_two_factor_enabled);
        } else {
          console.error("Failed to fetch 2FA status:", data.message);
        }
      } catch (error) {
        console.error("Error fetching 2FA status:", error);
      }
    };
  
    fetchTwoFAStatus();
  }, []);
  

  const renderSection = () => {
    switch (activeSection) {
      case "profile":
        return (
          <Card>
            <Card.Header>Update Profile</Card.Header>
            <Card.Body>
              <Form>
                <Row>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        name="name"
                        value={profile.name}
                        onChange={handleProfileChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Phone</Form.Label>
                      <Form.Control
                        name="phone"
                        value={profile.phone}
                        onChange={handleProfileChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Address</Form.Label>
                      <Form.Control
                        name="address"
                        value={profile.address}
                        onChange={handleProfileChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        name="email"
                        value={profile.email}
                        onChange={handleProfileChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Button className="mt-3" onClick={handleUpdateProfile} style={{ backgroundColor: "#66d1d1", borderColor: "#66d1d1" }}>
                  Save Changes
                </Button>
              </Form>
            </Card.Body>
          </Card>
        );

      case "2fa":
        return (
          <Card>
            <Card.Header>Two-Factor Authentication (2FA)</Card.Header>
            <Card.Body>
              <Form.Check
                type="switch"
                id="2fa-switch"
                label={twoFAEnabled ? "Enabled" : "Disabled"}
                checked={twoFAEnabled}
                onChange={handleToggle2FA}
              />
            </Card.Body>
          </Card>
        );

      case "email":
        return (
          <Card>
            <Card.Header>Change Email</Card.Header>
            <Card.Body>
              <Form>
                <Row>
                  <Col md={8}>
                    <Form.Control
                      type="email"
                      placeholder="Enter new email"
                      value={formState.newEmail}
                      onChange={(e) =>
                        setFormState({ ...formState, newEmail: e.target.value })
                      }
                    />
                  </Col>
                  <Col md={4}>
                    <Button onClick={handleSendEmailVerification} style={{ backgroundColor: "#66d1d1", borderColor: "#66d1d1" }}>
                      Send Verification Link
                    </Button>
                  </Col>
                </Row>
                {emailVerificationSent && (
                  <p className="text-success mt-2">
                    Verification link sent to {formState.newEmail}.
                  </p>
                )}
              </Form>
            </Card.Body>
          </Card>
        );

      case "password":
        return (
          <Card>
            <Card.Header>Change Password</Card.Header>
            <Card.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Current Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={formState.currentPassword}
                    onChange={(e) =>
                      setFormState({ ...formState, currentPassword: e.target.value })
                    }
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={formState.newPassword}
                    onChange={(e) =>
                      setFormState({ ...formState, newPassword: e.target.value })
                    }
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Confirm New Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={formState.confirmPassword}
                    onChange={(e) =>
                      setFormState({ ...formState, confirmPassword: e.target.value })
                    }
                  />
                </Form.Group>

                <Button onClick={handleChangePassword} style={{ backgroundColor: "#66d1d1", borderColor: "#66d1d1" }}>
                  Update Password
                </Button>
              </Form>
            </Card.Body>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="container mt-6">
        <Row>
          <Col md={3}>
            <Nav className="flex-column sidebars">
              <Nav.Link
                className={`link ${activeSection === "profile" ? "active" : ""}`}
                onClick={() => setActiveSection("profile")}
              >
                <FaUserCircle className="me-2" />
                Account Settings
              </Nav.Link>

              <Nav.Link
                className={`link ${activeSection === "email" ? "active" : ""}`}
                onClick={() => setActiveSection("email")}
              >
                <FaEnvelope className="me-2" />
                Change Email
              </Nav.Link>

              <Nav.Link
                className={`link ${activeSection === "password" ? "active" : ""}`}
                onClick={() => setActiveSection("password")}
              >
                <FaKey className="me-2" />
                Change Password
              </Nav.Link>

              <Nav.Link
                className={`link ${activeSection === "2fa" ? "active" : ""}`}
                onClick={() => setActiveSection("2fa")}
              >
                <FaShieldAlt className="me-2" />
                2FA Settings
              </Nav.Link>

              <Nav.Link
                onClick={handleLogout}
                className="link text-danger logout-link"
                style={{ fontWeight: "bold" }}
              >
                <FaSignOutAlt className="me-2" />
                Logout
              </Nav.Link>
            </Nav>
          </Col>
          <Col md={9}>
            <h4 className="mb-3">{activeSection.replace("-", " ").toUpperCase()}</h4>
            {message && <Alert variant="info">{message}</Alert>}
            {renderSection()}
          </Col>
        </Row>
      </div>
    </Layout>
  );
};

export default AccountSettings;
