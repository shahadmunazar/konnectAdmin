import React from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { styles } from './styles';

const PublicLiability = ({
    formData,
    setFormData,
    shouldShowError,
    setTouched,
    handleFileUpload,
    uploadedFileName,
    uploadedFileSize,
    handleViewFile,
    handleRemoveFile,
    showUploadModal,
    setShowUploadModal,
    liabilityEndDate,
    setLiabilityEndDate,
    loading
}) => {
    const publicLiabilityFileError = shouldShowError('publicLiabilityFile');

    const handleModalUpload = () => {
        if (!formData.publicLiabilityFile || !liabilityEndDate) {
            return;
        }
        setShowUploadModal(false);
    };

    return (
        <div style={styles.insuranceSection}>
            <p style={styles.instructionText}>Please complete the following questions and then click the 'Next' button.</p>
            <h5 style={styles.sectionTitle}>Insurances</h5>
            <div style={{ ...styles.questionContainer, display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: 600 }}>
                <div>
                    <div style={{ ...styles.question, alignItems: 'center', marginBottom: 10 }}>
                        <span style={styles.questionNumber}>16.</span>
                        <span style={styles.questionText}>Please attach a copy of your Public Liability Insurance certificate of currency:</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 12 }}>
                        {!formData.publicLiabilityFile ? (
                            <button
                                type="button"
                                style={{ ...styles.uploadButton, minWidth: 320, justifyContent: 'center' }}
                                onClick={() => setShowUploadModal(true)}
                            >
                                <span style={styles.fileIcon}>⬆</span>
                                Click here to attach a file
                            </button>
                        ) : (
                            <div style={{ ...styles.uploadedFileContainer, marginLeft: 0, marginTop: 8, width: '100%' }}>
                                <div style={styles.fileInfo}>
                                    <span style={styles.fileIcon}>📎</span>
                                    <span style={styles.fileName}>{uploadedFileName}</span>
                                    <span style={styles.fileSize}>({uploadedFileSize})</span>
                                    <span style={{ marginLeft: '10px', color: '#666', fontSize: '0.9rem' }}>Expiry: {liabilityEndDate ? liabilityEndDate.toLocaleDateString() : ''}</span>
                                </div>
                                <div style={styles.fileActions}>
                                    <button
                                        style={styles.btnView}
                                        onClick={handleViewFile}
                                    >
                                        View
                                    </button>
                                    <button
                                        style={styles.btnRemove}
                                        onClick={handleRemoveFile}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        )}
                        {publicLiabilityFileError && (
                            <div style={styles.errorMessage}>
                                {publicLiabilityFileError}
                            </div>
                        )}
                    </div>
                </div>
                {/* Upload Modal */}
                <Modal show={showUploadModal} onHide={() => setShowUploadModal(false)}>
                    <Modal.Header closeButton style={styles.modalHeader}>
                        <Modal.Title>Attach Document</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group style={styles.formGroup}>
                                <Form.Label style={styles.formLabel}>File:</Form.Label>
                                <input
                                    type="file"
                                    accept=".pdf,.jpg,.jpeg,.png"
                                    onChange={handleFileUpload}
                                    style={styles.input(false, 'file')}
                                />
                            </Form.Group>
                            <Form.Group style={styles.formGroup}>
                                <Form.Label style={styles.formLabel}>Expiry Date:</Form.Label>
                                <DatePicker
                                    selected={liabilityEndDate}
                                    onChange={date => setLiabilityEndDate(date)}
                                    dateFormat="dd/MM/yyyy"
                                    minDate={new Date()}
                                    style={styles.input(false, 'date')}
                                    placeholderText="Select expiry date"
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer style={styles.modalFooter}>
                        <Button variant="secondary" onClick={() => setShowUploadModal(false)}>
                            Cancel
                        </Button>
                        <Button
                            variant="primary"
                            onClick={handleModalUpload}
                            disabled={loading || !formData.publicLiabilityFile || !liabilityEndDate}
                        >
                            Upload
                        </Button>
                    </Modal.Footer>
                </Modal>
                {/* End Modal */}
                <div>
                    <div style={{ ...styles.question, alignItems: 'center', marginBottom: 10 }}>
                        <span style={styles.questionNumber}>17.</span>
                        <span style={styles.questionText}>Enter the amount covered (numbers only): $</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 4, maxWidth: 250 }}>
                        <input
                            type="text"
                            value={formData.coverageAmount}
                            onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, ''); // Only allow numbers
                                setFormData({ ...formData, coverageAmount: value });
                            }}
                            onBlur={() => setTouched(prev => ({ ...prev, coverageAmount: true }))}
                            style={{
                                border: '1px solid #ced4da',
                                borderRadius: '4px',
                                padding: '8px 12px',
                                width: '100%',
                                fontSize: '14px'
                            }}
                            placeholder="Enter amount"
                        />
                        {shouldShowError('coverageAmount') && (
                            <div style={{ color: '#dc3545', fontSize: '14px', marginTop: '2px' }}>
                                {shouldShowError('coverageAmount')}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PublicLiability; 