import React, { useEffect, useState } from 'react';
import Layout from '../Layout/Layout';
import { Modal, Button, Form, Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function InviteUser() {
    const navigate = useNavigate();
    const tabs = [
        'Home',
        'Prequalification',
        'Inductions',
        'Compliance',
        'Manage',
        'Pending Documents',
        'Reports',
        'Admin'
    ];

    const [activeTab, setActiveTab] = useState('Prequalification');
    const [invitations, setInvitations] = useState([]);
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('You are invited to join as a Contractor Admin.');
    const [formError, setFormError] = useState('');
    const [formSuccess, setFormSuccess] = useState('');

    const fetchInvitations = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('Authentication token missing.');
                return;
            }

            const response = await fetch(`${BASE_URL}/api/orginazation/get-all-invitation-link`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            const result = await response.json();

            if (response.ok && result.status === 200) {
                setInvitations(result.data);
            } else {
                throw new Error(result.message || 'Failed to fetch invitations.');
            }
        } catch (err) {
            setError(err.message || 'Something went wrong.');
            setInvitations([]);
        }
    };

    useEffect(() => {
        fetchInvitations();
    }, []);

    const handleResend = async (email) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setFormError('Authentication token missing.');
                return;
            }

            const response = await fetch(`${BASE_URL}/api/orginazation/send-contract-invitation-link`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ email, isResend: true }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to send invitation.');
            }

            setFormSuccess('Invitation sent successfully!');
            setTimeout(() => setFormSuccess(''), 3000);
            setShowModal(false);
            setEmail('');
            setMessage('You are invited to join as a Contractor Admin.');
            fetchInvitations();
        } catch (error) {
            setFormError(error.message || 'Something went wrong.');
        }
    };

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const handleInviteSubmit = async (e) => {
        e.preventDefault();
        setFormError('');
        setFormSuccess('');

        if (!validateEmail(email)) {
            setFormError('Please enter a valid email address.');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setFormError('Authentication token missing.');
                return;
            }

            const response = await fetch(`${BASE_URL}/api/orginazation/send-contract-invitation-link`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to send invitation.');
            }

            setFormSuccess('Invitation sent successfully!');
            setTimeout(() => setFormSuccess(''), 3000);
            setShowModal(false);
            setEmail('');
            setMessage('You are invited to join as a Contractor Admin.');
            fetchInvitations();
        } catch (error) {
            setFormError(error.message || 'Something went wrong.');
        }
    };

    return (
        <Layout>
            {/* Top Tab Bar with Dropdown */}
            <div className="bg-dark py-2 mt-6">
                <div className="d-flex justify-content-center flex-wrap gap-4">
                    {tabs.map((tab) => {
                        if (tab === 'Prequalification') {
                            return (
                                <Dropdown
                                    key={tab}
                                    onToggle={(isOpen) => {
                                        if (isOpen) setActiveTab(tab);
                                    }}
                                >
                                    <Dropdown.Toggle
                                        className={`px-3 py-2 rounded fw-medium ${activeTab === tab ? 'bg-info text-dark' : 'text-light'}`}
                                        variant="dark"
                                        style={{
                                            border: 'none',
                                            cursor: 'pointer',
                                            borderBottom: activeTab === tab ? '3px solid #0dcaf0' : '3px solid transparent',
                                        }}
                                        id="dropdown-basic"
                                    >
                                        {tab}
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => navigate('/manage-forms')}>Manage Forms</Dropdown.Item>
                                        <Dropdown.Item onClick={() => setShowModal(true)}>Invite History</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>

                            );
                        } else {
                            return (
                                <span
                                    key={tab}
                                    className={`px-3 py-2 rounded text-white fw-medium ${activeTab === tab ? 'bg-info text-dark' : 'text-light'
                                        }`}
                                    style={{
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease-in-out',
                                        borderBottom: activeTab === tab ? '3px solid #0dcaf0' : '3px solid transparent',
                                    }}
                                    onClick={() => setActiveTab(tab)}
                                >
                                    {tab}
                                </span>
                            );
                        }
                    })}
                </div>
            </div>

            {/* Page Content */}
            <div className="container mt-4">
                {activeTab === 'Prequalification' && (
                    <>
                        <h2>Contractor Admin Invitations</h2>
                        <div className="mb-3 text-start">
                            <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                                Invite Contractor Admin
                            </button>
                        </div>

                        {error && <div className="alert alert-danger">{error}</div>}
                        {formSuccess && <div className="alert alert-success">{formSuccess}</div>}

                        <table className="table table-bordered mt-3">
                            <thead className="thead-dark">
                                <tr>
                                    <th>Email</th>
                                    <th>Invited By</th>
                                    <th>Invited At</th>
                                    <th>Status</th>
                                    <th>Invitation Link</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {invitations.length === 0 ? (
                                    <tr><td colSpan="6" className="text-center">No Invitations</td></tr>
                                ) : (
                                    invitations.map((invite, idx) => (
                                        <tr key={idx}>
                                            <td>{invite.contractor_email}</td>
                                            <td>{invite.contractor_name || `User ID ${invite.invited_by}`}</td>
                                            <td>{new Date(invite.sent_at).toLocaleString()}</td>
                                            <td>{invite.status}</td>
                                            <td>
                                                <a
                                                    href={`https://example.com/invite/${invite.invite_token}`}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >
                                                    Link
                                                </a>
                                            </td>
                                            <td>
                                                {invite.status === 'expired' ? (
                                                    <button className="btn btn-sm btn-warning" onClick={() => handleResend(invite.contractor_email)}>
                                                        Resend
                                                    </button>
                                                ) : (
                                                    '-'
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </>
                )}
            </div>

            {/* Invite Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Invite Contractor Admin</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleInviteSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Email Address <span style={{ color: 'red' }}>*</span></Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>
                        {formError && <div className="alert alert-danger">{formError}</div>}
                        <div className="d-flex justify-content-end gap-2">
                            <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
                            <Button variant="primary" type="submit">Send Invite</Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </Layout>
    );
}

export default InviteUser;
