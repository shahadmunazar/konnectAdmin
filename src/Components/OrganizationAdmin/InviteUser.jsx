import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Modal } from "react-bootstrap";
import Layout from '../Layout/Layout';
import { useNavigate } from 'react-router-dom';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const InviteUser = () => {
    const [formId, setFormId] = useState("");
    const [formStatus, setFormStatus] = useState("");
    const [contractorStatus, setContractorStatus] = useState("");
    const [keyword, setKeyword] = useState('');
    const [invitations, setInvitations] = useState([]);
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('You are invited to join as a Contractor Admin.');
    const [formError, setFormError] = useState('');
    const [formSuccess, setFormSuccess] = useState('');
    const [activeTab, setActiveTab] = useState("Details");
    const [selectedForm, setSelectedForm] = useState(null);
    const [showReviewModal, setShowReviewModal] = useState(false);

    const handleSearch = () => {
        console.log("Search clicked with:", { formId, formStatus, contractorStatus, keyword });
    };
    const handleClear = () => {
        setFormId("");
        setFormStatus("");
        setContractorStatus("");
        setKeyword("");
    };

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

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

            if (!response.ok) throw new Error(data.message || 'Failed to send invitation.');

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

    const fetchInvitations = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('Authentication token missing.');
                return;
            }

            const response = await fetch(`${BASE_URL}/api/orginazation/get-all-invitation-link`, {
                headers: { 'Authorization': `Bearer ${token}` },
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

    console.log("selectedForm:", selectedForm);

    const tabList = ["Details", "Submission", "Revision History", "Comments"];

    return (
        <Layout>
            <div className="container mt-6">
                <h4 className='mb-2'>Manage Forms</h4>
                <Row className="align-items-center mb-3">
                    <Col md={2}>
                        <Form.Select value={formId} onChange={(e) => setFormId(e.target.value)}>
                            <option>Form ID</option>
                            <option value="101">101</option>
                            <option value="102">102</option>
                        </Form.Select>
                    </Col>
                    <Col md={2}>
                        <Form.Select value={formStatus} onChange={(e) => setFormStatus(e.target.value)}>
                            <option>Form Status</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </Form.Select>
                    </Col>
                    <Col md={2}>
                        <Form.Select value={contractorStatus} onChange={(e) => setContractorStatus(e.target.value)}>
                            <option>Contractor Status</option>
                            <option value="approved">Approved</option>
                            <option value="pending">Pending</option>
                        </Form.Select>
                    </Col>
                    <Col md={3}>
                        <Form.Control
                            placeholder="Enter keywords here"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                        />
                    </Col>
                    <Col md={3}>
                        <Button variant="dark" className="me-2" onClick={handleSearch}>Search</Button>
                        <Button variant="outline-dark" onClick={handleClear}>Clear</Button>
                    </Col>
                </Row>

                <table className="table">
                    <thead className="table-light">
                        <tr>
                            <th>Form #</th>
                            <th>Contractor / Trading Name</th>
                            <th>Email</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>State</th>
                            <th>Form Status</th>
                            <th>Created On</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invitations?.map((item, idx) => (
                            <tr
                                key={idx}
                                style={{ cursor: 'pointer' }}
                                onClick={() => {
                                    setSelectedForm(item);
                                    setShowReviewModal(true);
                                }}
                            >
                                <td>{item.id}</td>
                                <td>{item.contractor_name}</td>
                                <td>{item.contractor_email}</td>
                                <td>{item.contractor_name}</td>
                                <td>{item.lastName}</td>
                                <td>{item.state}</td>
                                <td>{item.status}</td>
                                <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <p className="text-muted mt-3">Displaying records 1 to {invitations?.length}</p>

                <div className="d-flex gap-2 mt-3 flex-wrap">
                    <button className="btn btn-primary" onClick={() => setShowModal(true)}>Single Invite</button>
                    <button className="btn btn-primary">Bulk Invite</button>
                    <button className="btn btn-primary">Request Completion</button>
                    <button className="btn btn-primary">Answers Report</button>
                    <button className="btn btn-primary">Templates</button>
                    <button className="btn btn-primary">Bulk Updates</button>
                </div>
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

            {/* Review Modal */}
            <Modal
                show={showReviewModal}
                onHide={() => setShowReviewModal(false)}
                size="xl"
                dialogClassName="modal-90w"
                aria-labelledby="review-modal"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="review-modal">Review - Form #{selectedForm.id}</Modal.Title>
                </Modal.Header>

                <div className="modal-body-wrapper p-3" style={{
                    maxHeight: '75vh',
                    overflowY: 'auto'
                }}>
                    {/* Tabs Header */}
                    <div className="d-flex border-bottom mb-3 mt-3" style={{ gap: '1rem' }}>
                        {tabList.map((tab) => (
                            <div
                                key={tab}
                                className={`pb-2 px-3 cursor-pointer ${activeTab === tab ? 'border-bottom border-primary fw-bold text-primary' : 'text-muted'}`}
                                style={{ cursor: 'pointer' }}
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab}
                            </div>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <div className="tab-content p-3">
                        {activeTab === "Details" && (
                            <div>
                                <p><strong>Form ID:</strong> {selectedForm?.id}</p>
                                <p><strong>Status:</strong> {selectedForm?.status}</p>
                                <p><strong>Created On:</strong> {new Date(selectedForm?.createdAt).toLocaleString()}</p>
                            </div>
                        )}

                        {activeTab === "Submission" && (
                            <div>
                                <p><strong>Contractor Name:</strong> {selectedForm?.contractor_name}</p>
                                <p><strong>Email:</strong> {selectedForm?.contractor_email}</p>
                                <p><strong>Status:</strong> {selectedForm?.status}</p>
                                <p><strong>Created On:</strong> {new Date(selectedForm?.createdAt).toLocaleString()}</p>
                                <hr />
                          
                                <Form.Group className="mt-3">
                                    <Form.Label>Rejection Comments</Form.Label>
                                    <Form.Control as="textarea" rows={3} placeholder="Enter comments if rejecting..." />
                                </Form.Group>
                            </div>
                        )}

                        {activeTab === "Revision History" && (
                            <p>No revision history available.</p>
                        )}

                        {activeTab === "Comments" && (
                            <Form.Group>
                                <Form.Label>Comments</Form.Label>
                                <Form.Control as="textarea" rows={3} placeholder="Add your comments here..." />
                            </Form.Group>
                        )}
                    </div>
                </div>

                <div className="d-flex justify-content-end mt-4 mb-3 flex-wrap px-4" style={{ gap: '0.5rem' }}>
                    <Button variant="secondary">Change E-mail Address</Button>
                    <Button variant="secondary">View Change History</Button>
                    <Button variant="secondary">Export to PDF</Button>
                    <Button variant="primary">Save</Button>
                    <Button variant="warning">Pause</Button>
                    <Button variant="success">Approve</Button>
                    <Button variant="danger">Reject</Button>
                    <Button variant="dark">Delete</Button>
                    <Button variant="outline-secondary" onClick={() => setShowReviewModal(false)}>Close</Button>
                </div>
            </Modal>
        </Layout>
    );
};

export default InviteUser;
