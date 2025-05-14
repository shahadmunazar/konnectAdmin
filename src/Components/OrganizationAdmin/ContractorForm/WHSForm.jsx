import React, { useState } from "react";
import { Container, Form, Modal, Button } from "react-bootstrap";
import "./WHSForm.css";

const WHSForm = ({ formData, setFormData, validationErrors }) => {
  // State for Q21 file upload modal
  const [showQ21Modal, setShowQ21Modal] = useState(false);
  const [q21File, setQ21File] = useState(null);
  const [q21FileName, setQ21FileName] = useState("");
  const [q21FileError, setQ21FileError] = useState("");
  // State for Q22 textarea
  const [q22Details, setQ22Details] = useState(formData.provide_name_position_mobile_no || "");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Map the form field names to the API payload field names
    const fieldMapping = {
      q21: 'work_health_safety_management_system',
      q22: 'is_staff_member_nominated',
      q23: 'are_employees_provided_with_health_safety',
      q24: 'are_employees_appropriately_licensed_qualified_safety',
      q25: 'are_employees_confirmed_as_competent_to_undertake_work',
      q26: 'do_you_all_sub_contractor_qualified_to_work',
      q27: 'do_you_all_sub_contractor_required_insurance_public_liability',
      q28: 'have_you_identified_all_health_safety_legislation',
      q29: 'do_you_have_emergency_response',
      q30: 'do_you_have_procedures_to_notify_the_applicable',
      q31: 'do_you_have_SWMS_JSAS_or_safe_work'
    };

    const apiFieldName = fieldMapping[name];
    if (apiFieldName) {
      setFormData((prev) => ({ ...prev, [apiFieldName]: value }));
    }

    if (name === "q22" && value !== "Yes") {
      setQ22Details("");
      setFormData((prev) => ({ ...prev, provide_name_position_mobile_no: "" }));
    }
  };

  const handleQ21UploadClick = () => {
    setShowQ21Modal(true);
  };

  const handleQ21FileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ["application/pdf", "image/jpeg", "image/png"];
      if (!validTypes.includes(file.type)) {
        setQ21FileError("Please upload a PDF, JPEG, or PNG file");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setQ21FileError("File size should be less than 5MB");
        return;
      }
      setQ21File(file);
      setQ21FileName(file.name);
      setQ21FileError("");
    }
  };

  const handleQ21ModalUpload = () => {
    if (!q21File) {
      setQ21FileError("Please select a file");
      return;
    }
    setFormData((prev) => ({ ...prev, q21File: q21File, q21FileName: q21FileName }));
    setShowQ21Modal(false);
  };

  const handleQ21ModalCancel = () => {
    setShowQ21Modal(false);
    setQ21File(null);
    setQ21FileName("");
    setQ21FileError("");
  };

  const handleQ22DetailsChange = (e) => {
    setQ22Details(e.target.value);
    setFormData((prev) => ({ ...prev, provide_name_position_mobile_no: e.target.value }));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  // Add file view and remove handlers for Q21
  const handleQ21ViewFile = () => {
    if (formData.q21File) {
      const fileBlob = new Blob([formData.q21File], { type: formData.q21File.type });
      const fileUrl = URL.createObjectURL(fileBlob);
      window.open(fileUrl, '_blank');
      setTimeout(() => URL.revokeObjectURL(fileUrl), 100);
    }
  };

  const handleQ21RemoveFile = () => {
    setFormData((prev) => ({ ...prev, q21File: null, q21FileName: "" }));
    setQ21File(null);
    setQ21FileName("");
  };

  // Map the form data back to the UI state
  const getFormValue = (apiFieldName) => {
    return formData[apiFieldName] || "";
  };

  return (
    <Container>
      <div>
        <div className="instructions">
          <div className="pt-2 pb-2">
            Please complete the following questions and then click the 'Submit' button.
          </div>
        </div>
        <div className="section-info">
          <div className="section-heading">Work Health & Safety</div>
        </div>
        <div className="scrollable">
          {/* Q21 */}
          <div className="question-row" style={{ alignItems: 'flex-start', marginBottom: 8 }}>
            <div className="question-cell" style={{ minWidth: 350, color: '#333', fontWeight: 500, fontSize: 16, display: 'flex', alignItems: 'left' }}>
              <span className="qnt" style={{ color: '#666', fontWeight: 600, fontSize: 16, marginRight: 8 }}>
                <span>21.</span>
              </span>
              <span style={{ color: '#333', fontWeight: 400, fontSize: 16 }}>Does your organisation have a work health and safety management system in place? <span style={{ color: 'red' }}>*</span></span>
            </div>
            <div className="answer-cell" style={{ display: 'flex', gap: 32, marginLeft: 32, marginTop: 2 }}>
              {["Yes", "No"].map(opt => (
                <label key={opt} style={{ display: 'flex', alignItems: 'left', gap: 6, fontSize: 16, color: '#333', fontWeight: 400 }}>
                  <input
                    type="radio"
                    name="q21"
                    value={opt}
                    checked={getFormValue('work_health_safety_management_system') === opt}
                    onChange={handleInputChange}
                    style={{ width: 20, height: 20, accentColor: '#4f5bd5', marginRight: 4 }}
                  />
                  {opt}
                </label>
              ))}
            </div>
          </div>
          {validationErrors?.work_health_safety_management_system && (
            <div style={{ color: 'red', marginLeft: 60, marginTop: 4, fontSize: 14 }}>{validationErrors.work_health_safety_management_system}</div>
          )}
          {/* Q21 Upload UI */}
          {getFormValue('work_health_safety_management_system') === "Yes" && !formData.q21File && (
            <div style={{ marginLeft: 60, marginTop: 8, marginBottom: 16 }}>
              <div style={{ background: '#e6f9f0', border: '1px solid #b2f2d7', color: '#218838', borderRadius: 6, padding: '12px 18px', display: 'flex', alignItems: 'left', gap: 12, fontWeight: 500, fontSize: 16 }}>
                <span style={{ fontSize: 22, color: '#34c759' }}>⬆</span>
                <span>Please attach a copy of your organisation's safety policy <span style={{ color: 'red' }}>*</span></span>
                <Button variant="outline-success" style={{ marginLeft: 16 }} onClick={handleQ21UploadClick}>
                  Upload File
                </Button>
              </div>
            </div>
          )}
          {validationErrors?.q21File && (
            <div style={{ color: 'red', marginLeft: 60, marginTop: 4, fontSize: 14 }}>{validationErrors.q21File}</div>
          )}
          {/* Q21 File Info Row */}
          {getFormValue('work_health_safety_management_system') === "Yes" && formData.q21File && (
            <div style={{ marginLeft: 60, marginTop: 8, marginBottom: 16 }}>
              <div style={{ background: '#f8f9fa', border: '1px solid #b2f2d7', borderRadius: 6, padding: '12px 18px', display: 'flex', alignItems: 'left', gap: 16, fontWeight: 500, fontSize: 16 }}>
                <span style={{ fontSize: 20, color: '#34c759' }}>📎</span>
                <span style={{ color: '#333', fontSize: 15 }}>{formData.q21FileName}</span>
                <Button variant="link" style={{ color: '#00a7b5', textDecoration: 'underline', fontWeight: 400, fontSize: 15 }} onClick={handleQ21ViewFile}>View</Button>
                <Button variant="link" style={{ color: '#dc3545', textDecoration: 'underline', fontWeight: 400, fontSize: 15 }} onClick={handleQ21RemoveFile}>Remove</Button>
              </div>
            </div>
          )}
          {/* Q21 Upload Modal */}
          <Modal show={showQ21Modal} onHide={handleQ21ModalCancel}>
            <Modal.Header closeButton>
              <Modal.Title>Attach Safety Policy</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group>
                <Form.Label>File: <span style={{ color: 'red' }}>*</span></Form.Label>
                <Form.Control type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={handleQ21FileChange} />
                {q21FileError && <div style={{ color: '#dc3545', marginTop: 4 }}>{q21FileError}</div>}
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleQ21ModalCancel}>Cancel</Button>
              <Button variant="success" onClick={handleQ21ModalUpload} disabled={!q21File}>Upload</Button>
            </Modal.Footer>
          </Modal>
          {/* Q22 */}
          <div className="question-row" style={{ alignItems: 'flex-start', marginBottom: 8 }}>
            <div className="question-cell" style={{ minWidth: 350, color: '#333', fontWeight: 500, fontSize: 16, display: 'flex', alignItems: 'left' }}>
              <span className="qnt" style={{ color: '#666', fontWeight: 600, fontSize: 16, marginRight: 8 }}>
                <span>22.</span>
              </span>
              <span style={{ color: '#333', fontWeight: 400, fontSize: 16 }}>Is a staff member nominated to be responsible for health and safety and supervision of health and safety activities? <span style={{ color: 'red' }}>*</span></span>
            </div>
            <div className="answer-cell" style={{ display: 'flex', gap: 32, marginLeft: 32, marginTop: 2 }}>
              {["Yes", "No"].map(opt => (
                <label key={opt} style={{ display: 'flex', alignItems: 'left', gap: 6, fontSize: 16, color: '#333', fontWeight: 400 }}>
                  <input
                    type="radio"
                    name="q22"
                    value={opt}
                    checked={getFormValue('is_staff_member_nominated') === opt}
                    onChange={handleInputChange}
                    style={{ width: 20, height: 20, accentColor: '#4f5bd5', marginRight: 4 }}
                  />
                  {opt}
                </label>
              ))}
            </div>
          </div>
          {validationErrors?.is_staff_member_nominated && (
            <div style={{ color: 'red', marginLeft: 60, marginTop: 4, fontSize: 14 }}>{validationErrors.is_staff_member_nominated}</div>
          )}
          {/* Q22 Textarea */}
          {getFormValue('is_staff_member_nominated') === "Yes" && (
            <div style={{ marginLeft: 60, marginTop: 8, marginBottom: 16 }}>
              <div style={{ color: '#666', fontStyle: 'italic', marginBottom: 4 }}>Please provide their name, position and mobile number: <span style={{ color: 'red' }}>*</span></div>
              <Form.Control
                as="textarea"
                rows={2}
                value={q22Details}
                onChange={handleQ22DetailsChange}
                placeholder="Name, position, mobile number"
                style={{ maxWidth: 500 }}
              />
              {validationErrors?.provide_name_position_mobile_no && (
                <div style={{ color: 'red', marginTop: 4, fontSize: 14 }}>{validationErrors.provide_name_position_mobile_no}</div>
              )}
            </div>
          )}
          {/* Remaining questions 23-31 */}
          {[
            {
              num: 23,
              text: 'Are employees provided with health and safety induction and training into contractor safety arrangements?',
              name: 'q23',
              apiField: 'are_employees_provided_with_health_safety',
              options: ['Yes', 'No']
            },
            {
              num: 24,
              text: 'Are employees appropriately licensed, qualified or certified where required?',
              name: 'q24',
              apiField: 'are_employees_appropriately_licensed_qualified_safety',
              options: ['Yes', 'No', 'N/A']
            },
            {
              num: 25,
              text: 'Are employees confirmed as competent to undertake work?',
              name: 'q25',
              apiField: 'are_employees_confirmed_as_competent_to_undertake_work',
              options: ['Yes', 'No']
            },
            {
              num: 26,
              text: 'Do you confirm all sub-contractors employed by you are competent and qualified to perform the work?',
              name: 'q26',
              apiField: 'do_you_all_sub_contractor_qualified_to_work',
              options: ['Yes', 'No', 'N/A']
            },
            {
              num: 27,
              text: 'Do you confirm all sub-contractors have required insurance including public liability and worker compensation?',
              name: 'q27',
              apiField: 'do_you_all_sub_contractor_required_insurance_public_liability',
              options: ['Yes', 'No', 'N/A']
            },
            {
              num: 28,
              text: 'Have you identified all health and safety risks associated with the work to be undertaken, and eliminated or controlled those risks so far as is reasonably practicable and in accordance with relevant health and safety legislation?',
              name: 'q28',
              apiField: 'have_you_identified_all_health_safety_legislation',
              options: ['Yes', 'No']
            },
            {
              num: 29,
              text: 'Do you have emergency response arrangements in place including trained first aiders?',
              name: 'q29',
              apiField: 'do_you_have_emergency_response',
              options: ['Yes', 'No', 'N/A']
            },
            {
              num: 30,
              text: 'Do you have procedures to notify the applicable regulator in the event of a notifiable incident?',
              name: 'q30',
              apiField: 'do_you_have_procedures_to_notify_the_applicable',
              options: ['Yes', 'No', 'N/A']
            },
            {
              num: 31,
              text: 'Do you have SWMS, JSAs or Safe Work Procedures for all tasks you will be carrying out?',
              name: 'q31',
              apiField: 'do_you_have_SWMS_JSAS_or_safe_work',
              options: ['Yes', 'No']
            }
          ].map(q => (
            <div key={q.num}>
              <div className="question-row" style={{ alignItems: 'flex-start', marginBottom: 8 }}>
                <div className="question-cell" style={{ minWidth: 350, color: '#333', fontWeight: 500, fontSize: 16, display: 'flex', alignItems: 'left' }}>
                  <span className="qnt" style={{ color: '#666', fontWeight: 600, fontSize: 16, marginRight: 8 }}>
                    <span>{q.num}.</span>
                  </span>
                  <span style={{ color: '#333', fontWeight: 400, fontSize: 16 }}>{q.text} <span style={{ color: 'red' }}>*</span></span>
                </div>
                <div className="answer-cell" style={{ display: 'flex', gap: 32, marginLeft: 32, marginTop: 2 }}>
                  {q.options.map(opt => (
                    <label key={opt} style={{ display: 'flex', alignItems: 'left', gap: 6, fontSize: 16, color: '#333', fontWeight: 400 }}>
                      <input
                        type="radio"
                        name={q.name}
                        value={opt}
                        checked={getFormValue(q.apiField) === opt}
                        onChange={handleInputChange}
                        style={{ width: 20, height: 20, accentColor: '#4f5bd5', marginRight: 4 }}
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              </div>
              {validationErrors?.[q.apiField] && (
                <div style={{ color: 'red', marginLeft: 60, marginTop: 4, fontSize: 14 }}>{validationErrors[q.apiField]}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default WHSForm; 
