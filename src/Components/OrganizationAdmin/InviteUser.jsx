import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Modal, Card, Table } from "react-bootstrap";
import Layout from '../Layout/Layout';
import { useNavigate } from 'react-router-dom';
import { FaFilePdf } from 'react-icons/fa'
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
import Swal from 'sweetalert2';

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
    const [selectedForm, setSelectedForm] = useState([]);
    const [showReviewModal, setShowReviewModal] = useState(false);
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [rejectionComments, setRejectionComments] = useState('');
    const [showApproveModal, setShowApproveModal] = useState(false);
    const [approvalType, setApprovalType] = useState("Full");
    const [inclusionList, setInclusionList] = useState("Contractor Registration");
    const [minHours, setMinHours] = useState("");
    const [comments, setComments] = useState("");
    const [bcc, setBcc] = useState("");
    const [showInductionModal, setShowInductionModal] = useState(false);
    const [showEmailModal, setShowEmailModal] = useState(false);
    const [showChangeHistoryModal, setShowChangeHistoryModal] = useState(false);

    const [thisId, setThisId] = useState("");

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
            // Show success SweetAlert
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Invitation sent successfully!',
                timer: 3000,
                showConfirmButton: false
            });

            setFormSuccess('Invitation sent successfully!');
            setTimeout(() => setFormSuccess(''), 3000);
            setShowModal(false);
            setEmail('');
            setMessage('You are invited to join as a Contractor Admin.');
            fetchInvitations();
        } catch (error) {
            // Show error SweetAlert
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.message || 'Something went wrong.',
            });
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

            const response = await fetch(`${BASE_URL}/api/orginazation/get-all-submission-prequalification`, {
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

    const tabList = ["Details", "Submission", "Revision History", "Comments"];

    const getDetails = async (id) => {
        console.log("Fetching details for ID:#####", id);
        try {
            setThisId(id)
            const token = localStorage.getItem('token');
            if (!token) {
                setFormError('Authentication token missing.');
                return;
            }

            const response = await fetch(`${BASE_URL}/api/orginazation/get-details-of-invitation?req_id=${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            const data = await response.json();
            console.log("Details fetched:%%%%", data.data);
            setSelectedForm(data?.data);
        } catch (error) {
            console.error("Error fetching details:", error);
        }
        setShowReviewModal(true);
    }

    const updateSubmissionStatus = async (reqId, comments) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setFormError('Authentication token missing.');
                return;
            }

            console.log("Updating submission status for ID:", reqId);

            const response = await fetch(`${BASE_URL}/api/orginazation/update-submission-status`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    req_id: reqId,
                    submission_status: "rejected",
                    comments: comments || "",
                }),
            });

            if (!response.ok) {
                const error = await response.json();
                console.error(`${status} failed:`, error);
                alert(`Failed to update status: ${status}`);
                return false;
            } else {
                const data = await response.json();
                console.log(`${status} successful:`, data);
                alert(`Submission ${status} successfully.`);
                return true;
            }
        } catch (error) {
            console.error("API error:", error);
            alert("An error occurred while updating submission status.");
            return false;
        }
    };

    // const handleApprove = async (reqId) => {
    //     try {
    //         const token = localStorage.getItem('token');
    //         if (!token) {
    //             setFormError('Authentication token missing.');
    //             return;
    //         }

    //         console.log("Updating submission status for ID:", reqId);

    //         const response = await fetch(`${BASE_URL}/api/orginazation/update-submission-status`, {
    //             method: "PUT",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 Authorization: `Bearer ${token}`,
    //             },
    //             body: JSON.stringify({
    //                 req_id: reqId,
    //                 submission_status: "approved",
    //                 approval_type: approvalType,
    //                 inclusion_list: inclusionList,
    //                 minimum_hours: minHours,
    //                 bcc_email: bcc,
    //                 comments: comments
    //             }),
    //         });

    //         if (!response.ok) {

    //             const error = await response.json();
    //             Swal.fire({
    //                 icon: 'error',
    //                 title: 'Error',
    //                 text: error.message || 'Failed to approve submission.',
    //             });
    //             return false;
    //         } else {
    //             const data = await response.json();
    //             console.log(`${status} successful:`, data);
    //             Swal.fire({
    //                 icon: 'success',
    //                 title: 'Success!',
    //                 text: 'Submission approved successfully!',
    //                 timer: 3000,
    //                 showConfirmButton: false
    //             });
    //             getDetails();
    //             setShowApproveModal(false)
    //             return true;
    //         }
    //     } catch (error) {
    //         console.error("API error:", error);
    //         alert("An error occurred while updating submission status.");
    //         return false;
    //     }
    // };

    const handleApprove = async (reqId) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Authentication token missing.',
                });
                return;
            }

            const response = await fetch(`${BASE_URL}/api/orginazation/update-submission-status`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    req_id: reqId,
                    submission_status: "approved",
                    approval_type: approvalType,
                    inclusion_list: inclusionList,
                    minimum_hours: minHours,
                    bcc_email: bcc,
                    comments: comments
                }),
            });

            if (!response.ok) {
                const error = await response.json();
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: error.message || 'Failed to approve submission.',
                });
                return false;
            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Submission approved successfully!',
                    timer: 3000,
                    showConfirmButton: false
                }).then(() => {
                    // Fetch invitations again after the alert is closed
                    getDetails(thisId);
                });

                setShowApproveModal(false);
                // setShowReviewModal(false);
                return true;
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.message || 'An error occurred while approving submission.',
            });
            return false;
        }
    };
    const handleSend = async (reqId) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setFormError('Authentication token missing.');
                return;
            }

            const response = await fetch(`${BASE_URL}/api/orginazation/send-induction-email`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    "contractor_id": reqId,

                }),
            });

            if (!response.ok) {

                const error = await response.json();
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: error.message || 'Failed to send induction.',
                });
                return false;
            } else {
                setShowReviewModal(false)
                setShowInductionModal(false)
                const data = await response.json();
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Send induction successfully!',
                    timer: 3000,
                    showConfirmButton: false
                });
                return true;
            }
        } catch (error) {
            console.error("API error:", error);
            alert("An error occurred while updating submission status.");
            return false;
        }
    };

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
                                onClick={() => getDetails(item.id)}
                            >
                                <td>{item.id}</td>
                                <td>{item.contractor_trading_name}</td>
                                <td>{item.contractor_email}</td>
                                <td>{item.company_representative_first_name}</td>
                                <td>{item.company_representative_last_name}</td>
                                <td>{item.state}</td>
                                <td className='text-success'>{item.submission_status}</td>
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
                    <Modal.Title id="review-modal">Review - Form #{selectedForm?.id}</Modal.Title>
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
                            <Card className="shadow-sm border-0">

                                <Row className="mb-2">
                                    <Col sm={2} className="label">Form:</Col>
                                    <Col sm={10} className="value">Contractor Pre-qualification Questionnaire</Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col sm={2} className="label">Company:</Col>
                                    <Col sm={10} className="value">{selectedForm?.company_name}</Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col sm={2} className="label">Invited By:</Col>
                                    <Col sm={10} className="value">{selectedForm?.invitedBy}</Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col sm={2} className="label">Name:</Col>
                                    <Col sm={10} className="value">{selectedForm?.Name}</Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col sm={2} className="label">Email:</Col>
                                    <Col sm={10} className="value">{selectedForm?.Email_Address}</Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col sm={2} className="label">Phone:</Col>
                                    <Col sm={10} className="value">{selectedForm?.Phone_No}</Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col sm={2} className="label">Status:</Col>
                                    <Col sm={10} className="value">{selectedForm?.Status}</Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col sm={2} className="label">Expires:</Col>
                                    <Col sm={10} className="value">{selectedForm?.Expires}</Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col sm={2} className="label">Renewal:</Col>
                                    <Col sm={10} className="value">{selectedForm?.Renewal}</Col>
                                </Row>

                            </Card>
                        )}

                        {activeTab === "Submission" && (
                            <div>
                                <h5 className="mb-3">Company Details</h5>
                                <Card className="shadow-sm border-0">
                                    <Row className="mb-2">
                                        <Col sm={4} className="label">ABN:</Col>
                                        <Col sm={8} className="value">{selectedForm?.contractor_abn}</Col>
                                    </Row>
                                    <Row className="mb-2">
                                        <Col sm={4} className="label">Company name:</Col>
                                        <Col sm={8} className="value">{selectedForm?.company_name}</Col>
                                    </Row>
                                    <Row className="mb-2">
                                        <Col sm={4} className="label">Trading name(s):</Col>
                                        <Col sm={8} className="value">{selectedForm?.invitedBy}</Col>
                                    </Row>
                                    <Row className="mb-2">
                                        <Col sm={4} className="label">Company structure:</Col>
                                        <Col sm={8} className="value">{selectedForm?.company_structure}</Col>
                                    </Row>
                                    <Row className="mb-2">
                                        <Col sm={4} className="label">Company representative first name:</Col>
                                        <Col sm={8} className="value">{selectedForm?.company_representative_first_name}</Col>
                                    </Row>
                                    <Row className="mb-2">
                                        <Col sm={4} className="label">Company representative last name:</Col>
                                        <Col sm={8} className="value">{selectedForm?.company_representative_last_name}</Col>
                                    </Row>
                                    <Row className="mb-2">
                                        <Col sm={4} className="label">Your position:</Col>
                                        <Col sm={8} className="value">{selectedForm?.position_at_company}</Col>
                                    </Row>
                                    <Row className="mb-2">
                                        <Col sm={4} className="label">Address:</Col>
                                        <Col sm={8} className="value">{selectedForm?.address}</Col>
                                    </Row>
                                    <Row className="mb-2">
                                        <Col sm={4} className="label">Street:</Col>
                                        <Col sm={8} className="value">{selectedForm?.street}</Col>
                                    </Row>
                                    <Row className="mb-2">
                                        <Col sm={4} className="label">suburb:</Col>
                                        <Col sm={8} className="value">{selectedForm?.suburb}</Col>
                                    </Row>
                                    <Row className="mb-2">
                                        <Col sm={4} className="label">state:</Col>
                                        <Col sm={8} className="value">{selectedForm?.state}</Col>
                                    </Row>
                                    <Row className="mb-2">
                                        <Col sm={4} className="label">Postcode:</Col>
                                        <Col sm={8} className="value">{selectedForm?.postal_code}</Col>
                                    </Row>
                                    <Row className="mb-2">
                                        <Col sm={4} className="label">Phone:</Col>
                                        <Col sm={8} className="value">{selectedForm?.contractor_phone_number}</Col>
                                    </Row>
                                    <Row className="mb-2">
                                        <Col sm={4} className="label">Services to be provided:</Col>
                                        <Col sm={8} className="value">{selectedForm?.service_to_be_provided}</Col>
                                    </Row>
                                </Card>
                                <hr />
                                <h5 className="mb-3">Insurances </h5>
                                <Card className="shadow-sm border-0">
                                    <Row className="mb-3">
                                        <Col sm={9} className="label">
                                            Do you employ people other than independent contractors?:</Col>

                                        <Col sm={3} className="value d-flex align-items-center">
                                            {selectedForm?.InsuranceDoc_full_url ? (
                                                <a href={selectedForm.InsuranceDoc_full_url} target="_blank" rel="noopener noreferrer" download>
                                                    <FaFilePdf size={20} style={{ color: 'red', marginRight: '8px' }} />
                                                    Download PDF
                                                </a>
                                            ) : (
                                                'No'
                                            )}
                                        </Col>
                                    </Row>
                                    <Row className="mb-3">
                                        <Col sm={9} className="label">
                                            Please attach a copy of your Public Liability Insurance certificate of currency:</Col>

                                        <Col sm={3} className="value d-flex align-items-center">
                                            {selectedForm?.PublicLiability_doc_url ? (
                                                <a href={selectedForm.PublicLiability_doc_url} target="_blank" rel="noopener noreferrer" download>
                                                    <FaFilePdf size={20} style={{ color: 'red', marginRight: '8px' }} />
                                                    Download PDF
                                                </a>
                                            ) : (
                                                'No'
                                            )}
                                        </Col>

                                    </Row>
                                    <Row className="mb-3">
                                        <Col sm={9} className="label">Enter the amount covered (numbers only) $:</Col>
                                        <Col sm={3} className="value">{selectedForm?.covered_amount}</Col>
                                    </Row>
                                    <Row className="mb-3">
                                        <Col sm={9} className="label">
                                            Do you have Professional Indemnity Insurance?:</Col>
                                        <Col sm={3} className="value">{selectedForm?.have_professional_indemnity_insurance}</Col>
                                    </Row>
                                </Card>
                                <hr />
                                <h5 className="mb-3">Work Health & Safety</h5>
                                <Card className="shadow-sm border-0">
                                    <Row className="mb-3">
                                        <Col sm={9} className="label">
                                            Does your organisation have a work health and safety management system in place?:</Col>
                                        <Col sm={3} className="value">
                                            {selectedForm?.SafetyManagement_doc_url ? (
                                                <a
                                                    href={selectedForm.SafetyManagement_doc_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    download
                                                    className="d-flex align-items-center"
                                                >
                                                    <FaFilePdf size={18} style={{ color: 'red', marginRight: '8px' }} />
                                                    Download File
                                                </a>
                                            ) : (
                                                'No'
                                            )}
                                        </Col>
                                    </Row>
                                    <Row className="mb-3">
                                        <Col sm={9} className="label">
                                            Is a staff member nominated to be responsible for health and safety and supervision of health and safety activities? :</Col>
                                        <Col sm={3} className="value">{selectedForm?.is_staff_member_nominated}</Col>
                                    </Row>
                                    <Row className="mb-3">
                                        <Col sm={9} className="label">Are employees provided with health and safety induction and training into contractor safety arrangements?:</Col>
                                        <Col sm={3} className="value">{selectedForm?.are_employees_provided_with_health_safety}</Col>
                                    </Row>
                                    <Row className="mb-3">
                                        <Col sm={9} className="label">
                                            Are employees appropriately licensed, qualified or certified where required?:</Col>
                                        <Col sm={3} className="value">{selectedForm?.are_employees_appropriately_licensed_qualified_safety}</Col>
                                    </Row>
                                    <Row className="mb-3">
                                        <Col sm={9} className="label">
                                            Are employees confirmed as competent to undertake work?:</Col>
                                        <Col sm={3} className="value">{selectedForm?.are_employees_confirmed_as_competent_to_undertake_work}</Col>
                                    </Row>
                                    <Row className="mb-3">
                                        <Col sm={9} className="label">
                                            Do you confirm all sub-contractors employed by you are competent and qualified to perform the work?:</Col>
                                        <Col sm={3} className="value">{selectedForm?.do_you_all_sub_contractor_qualified_to_work}</Col>
                                    </Row>
                                    <Row className="mb-3">
                                        <Col sm={9} className="label">
                                            Have you identified all health and safety risks associated with the work to be undertaken, and eliminated or controlled those risks so far as is reasonably practicable and in accordance with relevant health and safety legislation?:</Col>
                                        <Col sm={3} className="value">{selectedForm?.have_you_identified_all_health_safety_legislation}</Col>
                                    </Row>
                                    <Row className="mb-3">
                                        <Col sm={9} className="label">
                                            Do you have emergency response arrangements in place including trained first aiders?:</Col>
                                        <Col sm={3} className="value">{selectedForm?.do_you_have_emergency_response}</Col>
                                    </Row>
                                    <Row className="mb-3">
                                        <Col sm={9} className="label">
                                            Do you have procedures to notify the applicable regulator in the event of a notifiable incident?:</Col>
                                        <Col sm={3} className="value">{selectedForm?.do_you_have_procedures_to_notify_the_applicable}</Col>
                                    </Row>
                                    <Row className="mb-3">
                                        <Col sm={9} className="label">
                                            Do you have SWMS, JSAs or Safe Work Procedures for all tasks you will be carrying out?:</Col>
                                        <Col sm={3} className="value">{selectedForm?.do_you_have_SWMS_JSAS_or_safe_work}</Col>
                                    </Row>

                                </Card>
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
                    <Button variant="secondary" onClick={() => setShowEmailModal(true)}>Change E-mail Address</Button>
                    <Button variant="secondary" onClick={() => setShowChangeHistoryModal(true)}>View Change History</Button>
                    <Button variant="secondary">Export to PDF</Button>
                    <Button variant="primary">Save</Button>
                    <Button variant="warning">Pause</Button>
                    {selectedForm?.submission_status == "approved" ? <Button variant="success" onClick={() => setShowInductionModal(true)}>Send Induction Invitation</Button> : <>   <Button variant="success" onClick={() => setShowApproveModal(true)}>Approve</Button>
                        <Button variant="danger" onClick={() => setShowRejectModal(true)}>Reject</Button></>}

                    <Button variant="dark">Delete</Button>
                    <Button variant="outline-secondary" onClick={() => setShowReviewModal(false)}>Close</Button>
                </div>
                <Modal show={showRejectModal} onHide={() => setShowRejectModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Reject Form #{selectedForm?.id}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mt-3">
                                <Form.Label>Rejection Comments</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    placeholder="Enter comments if rejecting..."
                                    value={rejectionComments}
                                    onChange={(e) => setRejectionComments(e.target.value)}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowRejectModal(false)}>
                            Cancel
                        </Button>
                        <Button
                            variant="danger"
                            onClick={() => updateSubmissionStatus(selectedForm?.id, rejectionComments)}
                        >
                            Submit Rejection
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={showApproveModal} onHide={() => setShowApproveModal(false)} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Approve Submission</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            {/* Submitter */}
                            <Form.Group as={Row} className="mb-3 align-items-center">
                                <Form.Label column sm="4">Submitter</Form.Label>
                                <Col sm="8">
                                    <Form.Control type="text" value={selectedForm?.company_representative_first_name + " " + selectedForm?.company_representative_last_name} readOnly />
                                </Col>
                            </Form.Group>

                            {/* Approval Type */}
                            <Form.Group as={Row} className="mb-3 align-items-center">
                                <Form.Label column sm="4">Approval Type</Form.Label>
                                <Col sm="8">
                                    <Form.Select value={approvalType} onChange={(e) => setApprovalType(e.target.value)}>
                                        <option value="Full">Full</option>
                                        <option value="Partial">Partial</option>
                                    </Form.Select>
                                </Col>
                            </Form.Group>

                            {/* Inclusion List */}
                            <Form.Group as={Row} className="mb-3 align-items-center">
                                <Form.Label column sm="4">Inclusion List</Form.Label>
                                <Col sm="8">
                                    <Form.Select value={inclusionList} onChange={(e) => setInclusionList(e.target.value)}>
                                        <option>Contractor Registration</option>
                                        <option>Health & Safety</option>
                                        <option>Compliance</option>
                                    </Form.Select>
                                </Col>
                            </Form.Group>

                            {/* Minimum Hours */}
                            <Form.Group as={Row} className="mb-3 align-items-center">
                                <Form.Label column sm="4">Minimum Hours</Form.Label>
                                <Col sm="8">
                                    <Form.Control
                                        type="text"
                                        placeholder="Ask"
                                        value={minHours}
                                        onChange={(e) => setMinHours(e.target.value)}
                                    />
                                </Col>
                            </Form.Group>

                            {/* Comments */}
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm="4">Comments</Form.Label>
                                <Col sm="8">
                                    <Form.Control
                                        as="textarea"
                                        rows={2}
                                        placeholder="Any comments you enter here are for internal viewing only."
                                        value={comments}
                                        onChange={(e) => setComments(e.target.value)}
                                    />
                                </Col>
                            </Form.Group>

                            {/* BCC */}
                            <Form.Group as={Row} className="mb-3 align-items-center">
                                <Form.Label column sm="4">BCC</Form.Label>
                                <Col sm="8">
                                    <Form.Control
                                        type="text"
                                        placeholder=""
                                        value={bcc}
                                        onChange={(e) => setBcc(e.target.value)}
                                    />
                                </Col>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowApproveModal(false)}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={() => handleApprove(selectedForm?.id)}>
                            OK
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={showInductionModal} onHide={() => setShowInductionModal(false)} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Send Induction Link to Contractor </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>


                            {/* Inclusion List */}
                            <Form.Group as={Row} className="mb-3 align-items-center">
                                <Form.Label column sm="4">Course</Form.Label>
                                <Col sm="8">
                                    <Form.Select value={inclusionList} onChange={(e) => setInclusionList(e.target.value)}>
                                        <option>Contractor Registration</option>
                                        <option>Health & Safety</option>
                                        <option>Compliance</option>
                                    </Form.Select>
                                </Col>
                            </Form.Group>


                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowInductionModal(false)}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={() => handleSend(selectedForm?.id)}>
                            Send Email
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={showEmailModal} onHide={() => setShowEmailModal(false)} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Contractor's Email Address</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Current e-mail address:</Form.Label>
                                <Form.Control type="email" value={selectedForm?.Email_Address} disabled />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>New e-mail address:</Form.Label>
                                <Form.Control type="email" placeholder="Enter new e-mail" />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowEmailModal(false)}>
                            Cancel
                        </Button>
                        <Button variant="primary">
                            OK
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={showChangeHistoryModal} onHide={() => setShowChangeHistoryModal(false)} size="lg" centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Change History</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>Actioned By</th>
                                    <th>Date/Time</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Guest Account</td>
                                    <td>14-May-2025 21:05</td>
                                    <td>Changed status to: Submitted</td>
                                </tr>
                                <tr>
                                    <td>avdeshy213@gmail.com</td>
                                    <td>07-May-2025 17:20</td>
                                    <td>Changed status to: In progress (renewal)</td>
                                </tr>
                            </tbody>
                        </Table>
                        <div className="text-muted">Displaying records 1 to 2 of 2</div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowChangeHistoryModal(false)}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </Modal>
        </Layout>
    );
};

export default InviteUser;
