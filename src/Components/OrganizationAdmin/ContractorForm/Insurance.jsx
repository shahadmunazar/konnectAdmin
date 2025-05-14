import React from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { styles } from './styles';

const Insurance = ({ 
    formData, 
    setFormData, 
    shouldShowError, 
    setTouched, 
    showUploadModal, 
    setShowUploadModal,
    endDate,
    setEndDate,
    handleFileUpload,
    loading,
    uploadedFileName,
    uploadedFileSize,
    handleViewFile,
    handleRemoveFile
}) => {
    const employsOthersError = shouldShowError('employsOthers');
    const compensationFileError = shouldShowError('compensationFile');

    const handleEmploysOthersChange = async (e) => {
        const value = e.target.value;
        console.log("Employs Others Value:", value);
        if (value === "No") {
            setFormData({ 
                ...formData, 
                employsOthers: value,
                compensationFile: null 
            });
        } else {
            setFormData({ 
                ...formData, 
                employsOthers: value
            });
        }
        setTouched(prev => ({ ...prev, employsOthers: true }));
    };

    const handleModalUpload = () => {
        if (!formData.compensationFile || !endDate) {
            return;
        }
        setShowUploadModal(false);
    };

    return (
        <div style={styles.insuranceSection}>
            <p style={styles.instructionText}>Please complete the following questions and then click the 'Next' button.</p>
            
            <h5 style={styles.sectionTitle}>Insurances</h5>
            
            <div style={styles.questionContainer}>
                <div style={styles.question}>
                    <span style={styles.questionNumber}>15.</span>
                    <span style={styles.questionText}>Do you employ people other than independent contractors?</span>
                </div>
                
                <div style={styles.radioGroup}>
                    <div style={styles.customRadio}>
                        <input
                            type="radio"
                            id="yesRadio"
                            name="employsOthers"
                            value="Yes"
                            checked={formData.employsOthers === "Yes"}
                            onChange={handleEmploysOthersChange}
                            onBlur={() => setTouched(prev => ({ ...prev, employsOthers: true }))}
                            style={styles.customRadioInput}
                        />
                        <label htmlFor="yesRadio" style={styles.customRadioLabel}>Yes</label>
                    </div>
                    <div style={styles.customRadio}>
                        <input
                            type="radio"
                            id="noRadio"
                            name="employsOthers"
                            value="No"
                            checked={formData.employsOthers === "No"}
                            onChange={handleEmploysOthersChange}
                            onBlur={() => setTouched(prev => ({ ...prev, employsOthers: true }))}
                            style={styles.customRadioInput}
                        />
                        <label htmlFor="noRadio" style={styles.customRadioLabel}>No</label>
                    </div>
                </div>
                
                {employsOthersError && (
                    <div style={styles.errorMessage}>
                        {employsOthersError}
                    </div>
                )}

                {formData.employsOthers === "Yes" && (
                    <div style={styles.fileUploadSection}>
                        {!formData.compensationFile ? (
                            <button
                                type="button"
                                style={styles.uploadButton}
                                onClick={() => setShowUploadModal(true)}
                            >
                                <span style={styles.fileIcon}>⬆</span>
                                Click here to attach a file
                            </button>
                        ) : (
                            <div style={styles.uploadedFileContainer}>
                                <div style={styles.fileInfo}>
                                    <span style={styles.fileIcon}>📎</span>
                                    <span style={styles.fileName}>{uploadedFileName}</span>
                                    <span style={styles.fileSize}>({uploadedFileSize})</span>
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
                        {compensationFileError && (
                            <div style={styles.errorMessage}>
                                {compensationFileError}
                            </div>
                        )}
                    </div>
                )}
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
                                selected={endDate}
                                onChange={(date) => setEndDate(date)}
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
                        disabled={loading || !formData.compensationFile || !endDate}
                    >
                        Upload
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Insurance; 