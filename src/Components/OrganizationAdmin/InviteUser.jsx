import React, { useEffect, useState } from 'react';
import Layout from '../Layout/Layout';
import { Modal, Button, Form } from 'react-bootstrap';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;


function InviteUser() {
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
                body: JSON.stringify({ email, "isResend": true }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to send invitation.');
            }

            setFormSuccess('Invitation sent successfully!');
            setTimeout(() => setFormSuccess(''), 3000); // Clear success message after 3 seconds
            setShowModal(false);
            setEmail('');
            setMessage('You are invited to join as a Contractor Admin.');
            fetchInvitations(); // Optionally refresh list
        } catch (error) {
            setFormError(error.message || 'Something went wrong.');
            console.error('Invitation error:', error);
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
            setTimeout(() => setFormSuccess(''), 3000); // Clear success message after 3 seconds
            setShowModal(false);
            setEmail('');
            setMessage('You are invited to join as a Contractor Admin.');
            fetchInvitations(); // Optionally refresh list
        } catch (error) {
            setFormError(error.message || 'Something went wrong.');
            console.error('Invitation error:', error);
        }
    };

    return (
        <Layout>
            <div className="container mt-5" style={{ paddingTop: '2rem' }}>
                <h2>Contractor Admin Invitations</h2>
                {/* Top Left Button */}
                <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '1rem' }}>
                    <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                        Invite Contractor Admin
                    </button>
                </div>

                {error && <div className="alert alert-danger">{error}</div>}
                {formSuccess && <div className="alert alert-success">{formSuccess}</div>}
                <table className="table table-bordered" style={{ marginTop: '1rem' }}>
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

                {/* Modal for Invite User */}
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

                            {/* <Form.Group className="mb-3">
                                <Form.Label>Invitation Message</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                />
                            </Form.Group> */}

                            {formError && <div className="alert alert-danger">{formError}</div>}
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                                <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
                                <Button variant="primary" type="submit">Send Invite</Button>
                            </div>
                        </Form>
                    </Modal.Body>
                </Modal>
            </div>
        </Layout>
    );
}

export default InviteUser;
