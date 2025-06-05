import React, { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import Select from 'react-select';
import Layout from '../../Layout/Layout';

const SendInduction = () => {
  const [selectedOption, setSelectedOption] = useState('specific');
  const [selectedContractor, setSelectedContractor] = useState(null);
  const [email, setEmail] = useState('');
  const [additionalComments, setAdditionalComments] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [customEmails, setCustomEmails] = useState([]);

  const contractorOptions = [
    { value: 'abril', label: 'ABRIL RESTORATIONS PTY LTD', email: 'info@abril.com.au' },
    { value: 'adcare', label: 'ADCARE PTY LTD', email: 'contact@adcare.com' },
    { value: 'allstyle', label: 'ALL-Style DOORS PTY LTD', email: 'support@allstyle.com' },
  ];

  const handleContractorChange = (selected) => {
    setSelectedContractor(selected);
    setEmail(selected.email);
  };

  const handleOpenModal = () => {
    setCustomEmails(email ? [email] : ['']);
    setShowModal(true);
  };

  const handleCustomEmailChange = (value, index) => {
    const updated = [...customEmails];
    updated[index] = value;
    setCustomEmails(updated);
  };

  const handleAddRow = () => {
    setCustomEmails([...customEmails, '']);
  };

  const handleRemoveRow = (index) => {
    const updated = [...customEmails];
    updated.splice(index, 1);
    setCustomEmails(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Data:', {
      selectedOption,
      selectedContractor,
      email,
      additionalComments,
    });
  };

  // Custom styles for react-select to make it clean and aligned left
  const customSelectStyles = {
    control: (provided) => ({
      ...provided,
      minHeight: '38px',
      fontSize: '14px',
      boxShadow: 'none',
      borderColor: '#ced4da',
      '&:hover': { borderColor: '#86b7fe' },
    }),
    menu: (provided) => ({
      ...provided,
      fontSize: '14px',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#212529',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#6c757d',
    }),
  };

  return (
    <Layout>
      <div
        className="container mt-5 p-4 shadow-sm rounded bg-white"
        style={{ maxWidth: '650px', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}
      >
        <h4 className="mb-4 fw-bold text-primary">Send Email</h4>
        <Form onSubmit={handleSubmit}>

          <Form.Group className="mb-4 row align-items-center">
            <Form.Label column sm={4} className="fw-semibold">
              Select Course:
            </Form.Label>
            <div className="col-sm-8">
              <Form.Select aria-label="Select Course" className="shadow-sm">
                <option>Contractor Registration</option>
              </Form.Select>
            </div>
          </Form.Group>

          <Form.Group className="mb-4 row align-items-center">
            <Form.Label column sm={4} className="fw-semibold">
              Select Option:
            </Form.Label>
            <div className="col-sm-8">
              <Form.Select
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
                aria-label="Select Option"
                className="shadow-sm"
              >
                <option value="">Choose Option</option>
                <option value="specific">I want to email a specific contractor</option>
                <option value="all">I want to email all 65 contractors</option>
              </Form.Select>
            </div>
          </Form.Group>

          {selectedOption === 'specific' && (
            <>
              <Form.Group className="mb-4 row align-items-center">
                <Form.Label column sm={4} className="fw-semibold">
                  Select Contractor:
                </Form.Label>
                <div className="col-sm-8">
                  <Select
                    options={contractorOptions}
                    value={selectedContractor}
                    onChange={handleContractorChange}
                    placeholder="Choose One"
                    isSearchable
                    styles={customSelectStyles}
                    aria-label="Select Contractor"
                  />
                </div>
              </Form.Group>

              <Form.Group className="mb-4 row align-items-center">
                <Form.Label column sm={4} className="fw-semibold">
                  Send to:
                </Form.Label>
                <div className="col-sm-8">
                  <Form.Control
                    type="email"
                    value={email}
                    readOnly
                    onClick={handleOpenModal}
                    style={{ cursor: 'pointer', backgroundColor: '#e9ecef' }}
                    aria-label="Send to Email"
                    title="Click to override email addresses"
                  />
                  <Form.Text className="text-muted" style={{ fontSize: '0.85rem' }}>
                    Click the email to override or add multiple email addresses
                  </Form.Text>
                </div>
              </Form.Group>
            </>
          )}

          <Form.Group className="mb-4 row align-items-start">
            <Form.Label column sm={4} className="fw-semibold pt-0">
              Additional Comments:
            </Form.Label>
            <div className="col-sm-8">
              <Form.Control
                as="textarea"
                value={additionalComments}
                onChange={(e) => setAdditionalComments(e.target.value)}
                placeholder="(This will appear in the body of the email)"
                maxLength={500}
                rows={4}
                className="shadow-sm"
                aria-label="Additional Comments"
              />
              <Form.Text muted className="text-end d-block" style={{ fontSize: '0.8rem' }}>
                {additionalComments.length} / 500 characters
              </Form.Text>
            </div>
          </Form.Group>

          <div className="text-start">
            <Button type="submit" variant="primary" className="px-4 py-2 shadow-sm fw-semibold">
              Send Emails
            </Button>
          </div>

          <p className="mt-3 text-muted small fst-italic">
            Note: You will receive a copy of emails.
          </p>
        </Form>

        {/* Email Override Modal */}
        <Modal
          show={showModal}
          onHide={() => setShowModal(false)}
          centered
          size="md"
          aria-labelledby="email-override-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title id="email-override-modal" className="fw-bold text-primary">
              Override E-mail Addresses
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="fs-6 fw-semibold text-secondary">
                Enter as many e-mail addresses as needed:
              </div>
              <Button variant="outline-primary" size="sm" onClick={handleAddRow}>
                + Add Row
              </Button>
            </div>
            {customEmails.map((email, index) => (
              <div key={index} className="d-flex align-items-center mb-2 gap-2">
                <Form.Control
                  type="email"
                  value={email}
                  placeholder="email@example.com"
                  onChange={(e) => handleCustomEmailChange(e.target.value, index)}
                  isInvalid={email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)}
                />
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => handleRemoveRow(index)}
                  aria-label={`Remove email ${index + 1}`}
                >
                  ✕
                </Button>
              </div>
            ))}
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              onClick={() => {
                // Filter valid emails only and update main email with first valid email
                const validEmails = customEmails.filter(
                  (em) => em && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)
                );
                if (validEmails.length) {
                  setEmail(validEmails[0]);
                } else {
                  setEmail('');
                }
                setShowModal(false);
              }}
              disabled={customEmails.some(
                (em) => em && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)
              )}
            >
              OK
            </Button>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </Layout>
  );
};

export default SendInduction;
