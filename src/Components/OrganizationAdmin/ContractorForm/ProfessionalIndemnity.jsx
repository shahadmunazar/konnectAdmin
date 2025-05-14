import React from 'react';
import { styles } from './styles';

const ProfessionalIndemnity = ({ value, setValue }) => (
  <div style={styles.insuranceSection}>
    <p style={styles.instructionText}>
      Please complete the following questions and then click the 'Next' button.
    </p>
    <h5 style={styles.sectionTitle}>Insurances</h5>
    <div style={{
      ...styles.questionContainer,
      maxWidth: 900,
     
      border: '1px solid #e0e0e0',
      borderRadius: 12,
      padding: 32,
      background: '#fff'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
        <span style={styles.questionNumber}>18.</span>
        <span style={styles.questionText}>Do you have Professional Indemnity Insurance?</span>
      </div>
      <div style={{ display: 'flex', gap: 32, marginLeft: 32 }}>
        {['Yes', 'No', 'N/A'].map(option => (
          <label key={option} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 18 }}>
            <input
              type="radio"
              name="professionalIndemnity"
              value={option}
              checked={value === option}
              onChange={() => setValue(option)}
              style={{ width: 22, height: 22, accentColor: '#00a7b5' }}
            />
            {option}
          </label>
        ))}
      </div>
    </div>
  </div>
);

export default ProfessionalIndemnity; 