
import React, { useState, useEffect } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import Select from 'react-select';
import Layout from '../../Layout/Layout';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const SendInduction = () => {
  const [selectedOption, setSelectedOption] = useState('specific');
  const [selectedContractor, setSelectedContractor] = useState(null);
  const [email, setEmail] = useState('');
  const [customEmails, setCustomEmails] = useState([]);
  const [additionalComments, setAdditionalComments] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [contractorOptions, setContractorOptions] = useState([]);

  // const contractorOptions = [
  //   { value: 'abril', label: 'ABRIL RESTORATIONS PTY LTD', email: 'info@abril.com.au' },
  //   { value: 'adcare', label: 'ADCARE PTY LTD', email: 'contact@adcare.com' },
  //   { value: 'allstyle', label: 'ALL-Style DOORS PTY LTD', email: 'support@allstyle.com' },
  // ];

  const GetAllContractors = async () => {
    try {
      const token = localStorage.getItem('token'); // or however you store it

      const response = await fetch(`${BASE_URL}/api/orginazation/all-contractor-admins`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // sending token here
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      const options = data.map(contractor => ({
        value: contractor.id,
        label: contractor.name,
        email: contractor.email || '',
      }));

      setContractorOptions(options);
    } catch (error) {
      console.error('Error fetching contractors:', error);
    }
  };

  useEffect(() => {
    GetAllContractors();
  }, []);


  const handleContractorChange = (selected) => {
    setSelectedContractor(selected);
    setEmail(selected.email);
    setCustomEmails([selected.email]);
  };

  const handleOpenModal = () => {
    setCustomEmails(email ? email.split(', ') : ['']);
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

    const recipients = selectedOption === 'specific' ? customEmails : ['ALL_CONTRACTORS'];

    console.log('Submitted Data:', {
      selectedOption,
      contractor: selectedContractor?.label,
      emailRecipients: recipients,
      additionalComments,
    });

    alert('Email sent to: ' + recipients.join(', '));
  };

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
  };

  return (
    <Layout>
      <div className="mt-5 p-4 rounded" style={{ maxWidth: '650px', fontFamily: "'Segoe UI', sans-serif" }}>
        <h4 className="mb-4 fw-bold text-primary">Send Email</h4>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-4 row align-items-center">
            <Form.Label column sm={4} className="fw-semibold">Select Course:</Form.Label>
            <div className="col-sm-8">
              <Form.Select>
                <option>Contractor Registration</option>
              </Form.Select>
            </div>
          </Form.Group>

          <Form.Group className="mb-4 row align-items-center">
            <Form.Label column sm={4} className="fw-semibold">Select Option:</Form.Label>
            <div className="col-sm-8">
              <Form.Select
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
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
                <Form.Label column sm={4} className="fw-semibold">Select Contractor:</Form.Label>
                <div className="col-sm-8">
                  <Select
                    options={contractorOptions}
                    value={selectedContractor}
                    onChange={handleContractorChange}
                    placeholder="Choose One"
                    isSearchable
                    styles={customSelectStyles}
                  />
                </div>
              </Form.Group>

              <Form.Group className="mb-4 row align-items-center">
                <Form.Label column sm={4} className="fw-semibold">Send to:</Form.Label>
                <div className="col-sm-8">
                  <Form.Control
                    type="text"
                    readOnly
                    value={customEmails.join(', ')}
                    onClick={handleOpenModal}
                    style={{ cursor: 'pointer', backgroundColor: '#e9ecef' }}
                    title="Click to override email addresses"
                  />
                  <Form.Text className="text-muted" style={{ fontSize: '0.85rem' }}>
                    Click to edit or add multiple email addresses
                  </Form.Text>
                </div>
              </Form.Group>
            </>
          )}

          <Form.Group className="mb-4 row align-items-start">
            <Form.Label column sm={4} className="fw-semibold pt-0">Additional Comments:</Form.Label>
            <div className="col-sm-8">
              <Form.Control
                as="textarea"
                value={additionalComments}
                onChange={(e) => setAdditionalComments(e.target.value)}
                placeholder="(This will appear in the body of the email)"
                maxLength={500}
                rows={4}
              />
              <Form.Text muted className="text-end d-block" style={{ fontSize: '0.8rem' }}>
                {additionalComments.length} / 500 characters
              </Form.Text>
            </div>
          </Form.Group>

          <div className="text-start">
            <Button
              type="submit"
              variant="primary"
              className="px-4 py-2"
              disabled={selectedOption === 'specific' && (!selectedContractor || customEmails.some(e => !e))}
            >
              Send Email
            </Button>
          </div>

          <p className="mt-3 text-muted small fst-italic">Note: You will receive a copy of this email.</p>
        </Form>

        {/* Modal to manage emails */}
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title className="fw-bold text-primary">Override Email Addresses</Modal.Title>
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
              <div key={index} className="d-flex mb-2 align-items-center gap-2">
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => handleCustomEmailChange(e.target.value, index)}
                  placeholder="email@example.com"
                  isInvalid={email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)}
                />
                {customEmails.length > 1 && (
                  <Button variant="outline-danger" size="sm" onClick={() => handleRemoveRow(index)}>
                    ✕
                  </Button>
                )}
              </div>
            ))}

          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              onClick={() => {
                const validEmails = customEmails.filter(
                  (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)
                );
                setCustomEmails(validEmails);
                setEmail(validEmails.join(', '));
                setShowModal(false);
              }}
              disabled={customEmails.some(e => e && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e))}
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
