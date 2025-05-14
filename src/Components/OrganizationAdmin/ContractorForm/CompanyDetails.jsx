import React from 'react';
import { Form } from 'react-bootstrap';
import { styles } from './styles';

const CompanyDetails = ({ formData, handleInputChange, handleBlur, shouldShowError, copyCompanyName, handleCopyCompanyName }) => {
    const renderFormField = (name, label, type = "text", options = null) => {
        const error = shouldShowError(name);
        return (
            <Form.Group style={styles.formGroup}>
                <Form.Label className="contractor-label" style={styles.formLabel}>
                    {label}
                    <span style={styles.requiredAsterisk}>*</span>
                </Form.Label>
                {type === "select" ? (
                    <Form.Select
                        className="contractor-input"
                        name={name}
                        value={formData[name]}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        style={styles.input(error, name)}
                        required
                    >
                        {options}
                    </Form.Select>
                ) : type === "textarea" ? (
                    <Form.Control
                        as="textarea"
                        rows={3}
                        className="contractor-input"
                        name={name}
                        value={formData[name]}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        style={styles.textarea(error)}
                        required
                    />
                ) : (
                    <Form.Control
                        type={type}
                        className="contractor-input"
                        name={name}
                        value={formData[name]}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        style={styles.input(error, name)}
                        required
                    />
                )}
                {error && <div className="contractor-error" style={styles.errorMessage}>{error}</div>}
            </Form.Group>
        );
    };

    return (
        <>
            <style>{`
                .contractor-section-title {
                    font-size: 24px;
                    font-weight: 700;
                    color: #444;
                    margin-bottom: 24px;
                    letter-spacing: 0.5px;
                }
                .contractor-label {
                    font-size: 15px;
                    font-weight: 500;
                    color: #555;
                }
                .contractor-input {
                    font-size: 17px;
                    font-weight: 400;
                    color: #222;
                }
                .contractor-error {
                    font-size: 14px;
                    color: #d32f2f;
                    font-weight: 500;
                    margin-top: 4px;
                }
                @media (max-width: 700px) {
                    .contractor-section-title {
                        font-size: 18px;
                    }
                    .contractor-label {
                        font-size: 13px;
                    }
                    .contractor-input {
                        font-size: 15px;
                    }
                }
            `}</style>
            <div>
                <div className="contractor-section-title">Company Details</div>
                {renderFormField("abn", "1. ABN:")}
                {renderFormField("companyName", "2. Company name:")}
                {renderFormField("tradingName", "3. Trading name(s):")}
                <Form.Check
                    type="checkbox"
                    label="As above"
                    checked={copyCompanyName}
                    onChange={handleCopyCompanyName}
                    style={styles.checkbox}
                />
                {renderFormField("companyStructure", "4. Company structure:", "select",
                    <>
                        <option value="">Choose One ...</option>
                        <option value="Sole Trader">Sole Trader</option>
                        <option value="2-10 Employees">2–10 employees</option>
                        <option value="11-50 Employees">11–50 employees</option>
                        <option value="51-100 Employees">51–100 employees</option>
                        <option value="Over 100 Employees">Over 100 employees</option>
                    </>
                )}
                {renderFormField("firstName", "5. Company representative first name:")}
                {renderFormField("lastName", "6. Company representative last name:")}
                {renderFormField("position", "7. Position:")}
                {renderFormField("address", "8. Address:")}
                {renderFormField("street", "9. Street:")}
                {renderFormField("suburb", "10. Suburb:")}
                {renderFormField("state", "11. State:", "select",
                    <>
                        <option value="">Choose One ...</option>
                        <option value="Australian Capital Territory">Australian Capital Territory</option>
                        <option value="New South Wales">New South Wales</option>
                        <option value="Northern Territory">Northern Territory</option>
                        <option value="Queensland">Queensland</option>
                        <option value="South Australia">South Australia</option>
                        <option value="Tasmania">Tasmania</option>
                        <option value="Victoria">Victoria</option>
                        <option value="Western Australia">Western Australia</option>
                    </>
                )}
                {renderFormField("postal_code", "12. postal_code:")}
                {renderFormField("phone", "13. Phone:")}
                {renderFormField("services", "14. Services to be provided:", "textarea")}
            </div>
        </>
    );
};

export default CompanyDetails; 