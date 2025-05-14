export const styles = {
    // Common styles
    formGroup: {
        marginBottom: '1.5rem'
    },
    formLabel: {
        marginBottom: '0.5rem',
        color: '#333',
        fontWeight: '400',
        fontSize: '1rem',
        display: 'flex',
        alignItems: 'center'
    },
    requiredAsterisk: {
        color: '#dc3545',
        marginLeft: '3px'
    },
    errorMessage: {
        color: '#dc3545',
        backgroundColor: '#fde8e8',
        padding: '0.25rem 0.5rem',
        borderRadius: '4px',
        fontSize: '0.875rem',
        marginTop: '4px',
        display: 'block',
        textAlign: 'left',
        width: 'fit-content'
    },
    sectionTitle: {
        color: "#00a7b5",
        fontSize: '1.1rem',
        fontWeight: '500',
        marginBottom: '2rem',
        textAlign: 'left'
    },
    checkbox: {
        fontSize: "1rem",
        color: '#333',
        textAlign: "left",
        marginTop: '0.5rem'
    },

    // Input styles
    input: (error, fieldName) => {
        let width = '50%';
        if (['abn', 'tradingName', 'companyStructure', 'state', 'phone'].includes(fieldName)) {
            width = '30%';
        } else if (fieldName === 'services') {
            width = '100%';
        }
        return {
            marginBottom: '0',
            borderColor: error ? '#dc3545' : '#dee2e6',
            height: '38px',
            width: width,
            maxWidth: '100%'
        };
    },
    textarea: (error) => ({
        marginBottom: '0',
        borderColor: error ? '#dc3545' : '#dee2e6',
        height: 'auto',
        width: '100%'
    }),

    // Insurance section styles
    insuranceSection: {
        padding: '20px'
    },
    instructionText: {
        color: '#666',
        marginBottom: '20px'
    },
    questionContainer: {
        background: '#fff',
        borderRadius: '8px',
        padding: '20px'
    },
    question: {
        display: 'flex',
        gap: '10px',
        marginBottom: '15px'
    },
    questionNumber: {
        color: '#333'
    },
    questionText: {
        color: '#333'
    },
    radioGroup: {
        display: 'flex',
        gap: '30px',
        marginLeft: '30px',
        marginBottom: '20px'
    },
    customRadio: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    },
    customRadioInput: {
        width: '18px',
        height: '18px',
        margin: '0'
    },
    customRadioLabel: {
        color: '#333',
        fontSize: '1rem',
        cursor: 'pointer'
    },

    // File upload styles
    fileUploadSection: {
        marginLeft: '30px',
        marginTop: '15px'
    },
    uploadButton: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        background: '#007bff',
        border: 'none',
        padding: '10px 20px',
        color: 'white',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '1rem'
    },
    uploadButtonHover: {
        background: '#0056b3'
    },
    uploadedFileContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#f8f9fa',
        padding: '10px 15px',
        borderRadius: '4px',
        border: '1px solid #dee2e6',
        marginLeft: '30px',
        width: 'fit-content'
    },
    fileInfo: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    },
    fileIcon: {
        fontSize: '1.2rem'
    },
    fileName: {
        color: '#333',
        fontSize: '0.9rem'
    },
    fileSize: {
        color: '#666',
        fontSize: '0.8rem'
    },
    fileActions: {
        display: 'flex',
        gap: '8px',
        marginLeft: '20px'
    },
    btnView: {
        backgroundColor: '#e3fcf7',
        color: '#00a7b5',
        border: 'none',
        padding: '4px 12px',
        fontSize: '0.9rem'
    },
    btnViewHover: {
        backgroundColor: '#d0f7f1',
        color: '#008c99'
    },
    btnRemove: {
        backgroundColor: '#e3fcf7',
        color: '#00a7b5',
        border: 'none',
        padding: '4px 12px',
        fontSize: '0.9rem'
    },
    btnRemoveHover: {
        backgroundColor: '#d0f7f1',
        color: '#008c99'
    },

    // Modal styles
    modalContent: {
        borderRadius: '8px'
    },
    modalHeader: {
        backgroundColor: '#f8f9fa',
        borderBottom: '1px solid #dee2e6'
    },
    modalFooter: {
        backgroundColor: '#f8f9fa',
        borderTop: '1px solid #dee2e6'
    },

    // Amount input styles
    amountInputSection: {
        marginTop: '10px'
    },
    inputGroup: {
        position: 'relative',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'stretch',
        width: '100%'
    },
    inputGroupText: {
        backgroundColor: '#f8f9fa',
        border: '1px solid #ced4da',
        borderRight: 'none',
        color: '#495057',
        padding: '0.375rem 0.75rem',
        borderRadius: '4px 0 0 4px'
    },
    inputGroupFormControl: {
        borderRadius: '0 4px 4px 0',
        border: '1px solid #ced4da'
    },
    inputGroupFormControlFocus: {
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)'
    },
    inputGroupFormControlInvalid: {
        borderColor: '#dc3545'
    }
}; 