import React, { useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import axios from "axios";

const UploadCredentials = ({ mandatoryCredentials, optionalCredentials, contractorId }) => {
  const [step, setStep] = useState(0);
  const [formValues, setFormValues] = useState({});
  const [files, setFiles] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [optionalStep, setOptionalStep] = useState(0);

  const handleFileChange = (e, name) => {
    const file = e.target.files[0];
    if (file) {
      setFiles((prev) => ({ ...prev, [name]: file }));
    }
  };

  const handleInputChange = (e, name) => {
    const { value, name: fieldName } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: { ...prev[name], [fieldName]: value },
    }));
  };

  const uploadDocument = async (credential, isOptional = false) => {
    const file = files[credential.name];
    if (!file) {
      alert("Please upload a file.");
      return;
    }

    const values = formValues[credential.name] || {};
    const formData = new FormData();
    formData.append("file", file);
    formData.append("VerificationId", credential.name);
    formData.append("issue_date", values.issue_date || "");
    formData.append("reference_number", values.reference_number || "");
    formData.append("trade_type_id", values.trade_type_id || "");
    formData.append("contractor_id", contractorId);

    try {
      setLoading(true);
      const res = await axios.post("/api/orginazation/upload-contractor-documents", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 200) {
        if (isOptional) {
          if (optionalStep + 1 < optionalCredentials.length) {
            setOptionalStep(optionalStep + 1);
          } else {
            alert("All optional credentials uploaded.");
          }
        } else {
          if (step + 1 < mandatoryCredentials.length) {
            setStep(step + 1);
          } else {
            setShowSuccess(true);
          }
        }
      } else {
        alert("Upload failed");
      }
    } catch (err) {
      console.error(err);
      alert("Upload error");
    } finally {
      setLoading(false);
    }
  };

  const renderForm = (credential, isOptional = false) => (
    <Form>
      <h5 className="text-primary mb-3">{credential.label}</h5>

      <Form.Group>
        <Form.Label>Reference Number</Form.Label>
        <Form.Control
          type="text"
          name="reference_number"
          value={formValues[credential.name]?.reference_number || ""}
          onChange={(e) => handleInputChange(e, credential.name)}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Issue Date</Form.Label>
        <Form.Control
          type="date"
          name="issue_date"
          value={formValues[credential.name]?.issue_date || ""}
          onChange={(e) => handleInputChange(e, credential.name)}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Trade Type ID</Form.Label>
        <Form.Control
          type="text"
          name="trade_type_id"
          value={formValues[credential.name]?.trade_type_id || ""}
          onChange={(e) => handleInputChange(e, credential.name)}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Upload File</Form.Label>
        <Form.Control
          type="file"
          accept=".pdf,image/*"
          onChange={(e) => handleFileChange(e, credential.name)}
        />
        {files[credential.name] && (
          <div className="mt-2 text-success">{files[credential.name].name}</div>
        )}
      </Form.Group>

      <Button
        className="mt-3"
        onClick={() => uploadDocument(credential, isOptional)}
        disabled={loading}
      >
        {loading ? <Spinner size="sm" animation="border" /> : "Upload & Continue"}
      </Button>
    </Form>
  );

  return (
    <div className="container py-4">
      {!showSuccess ? (
        step < mandatoryCredentials.length ? (
          renderForm(mandatoryCredentials[step])
        ) : optionalStep < optionalCredentials.length ? (
          renderForm(optionalCredentials[optionalStep], true)
        ) : (
          <div className="text-center">
            <h5>All credentials uploaded successfully!</h5>
          </div>
        )
      ) : (
        <div className="text-center">
          <h4 className="text-success">Mandatory documents uploaded!</h4>
          {optionalCredentials.length > 0 && (
            <Button
              variant="secondary"
              className="mt-3"
              onClick={() => setShowSuccess(false)}
            >
              Upload Optional Credentials
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default UploadCredentials;
