// StepUpload.jsx
import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { FaCloudUploadAlt, FaQuestionCircle } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const StepUpload = ({ credential, onComplete, onCancel }) => {
  const [reference, setReference] = useState('');
  const [issueDate, setIssueDate] = useState(null);
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    setFile(selected);
  };

  const handleSubmit = () => {
    if (!reference || !issueDate || !file) {
      alert('Please fill all fields and upload a document.');
      return;
    }

    const data = {
      id: credential.id,
      name: credential.name,
      reference,
      issueDate,
      file,
    };
    onComplete(data);
  };

  return (
    <Card className="p-4" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h4 className="text-center mb-4">{credential.name}</h4>

      <Form.Group className="mb-3">
        <Form.Label>Enter Reference</Form.Label>
        <div className="d-flex align-items-center">
          <Form.Control
            type="text"
            placeholder="e.g., XXX-12356"
            value={reference}
            onChange={(e) => setReference(e.target.value)}
          />
          <FaQuestionCircle className="ms-2 text-muted" />
        </div>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Enter Issue Date</Form.Label>
        <DatePicker
          selected={issueDate}
          onChange={(date) => setIssueDate(date)}
          placeholderText="Choose a date"
          className="form-control"
        />
      </Form.Group>

      <Form.Group className="mb-3 text-center">
        <Form.Label>Upload Document</Form.Label>
        <div
          className="border p-4 rounded"
          style={{
            borderStyle: 'dashed',
            backgroundColor: '#f8f9fa',
            cursor: 'pointer',
          }}
          onClick={() => document.getElementById('fileInput').click()}
        >
          <FaCloudUploadAlt size={40} className="mb-2" />
          <div>Drag and drop or click to select</div>
          <Form.Control
            type="file"
            accept=".pdf,image/*"
            id="fileInput"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </div>
        {file && <div className="mt-2 text-success">Selected: {file.name}</div>}
      </Form.Group>

      <p className="text-muted text-center">
        We accept PDF and standard image files.
      </p>

      <div className="d-flex justify-content-center gap-3">
        <Button variant="success" onClick={handleSubmit}>
          Next
        </Button>
        <Button variant="secondary" onClick={onCancel}>
          Cancel & Exit
        </Button>
      </div>
    </Card>
  );
};

export default StepUpload;
