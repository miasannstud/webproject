// src/pages/participant/TermsStep.jsx
import React from 'react';
import styles from './TermsStep.module.css';

function TermsStep({ agreeTerms, onTermsChange }) {
  return (
    <div className={styles.termsContainer}>
      <h2>Welcome to the Study</h2>
      <p>Please read and agree to the following terms before you start:</p>
      <p>
        Some terms and conditions...
      </p>
      <label className={styles.checkboxLabel}>
        <input
          type="checkbox"
          checked={agreeTerms}
          onChange={(e) => onTermsChange(e.target.checked)}
        />
        I agree to the terms and conditions.
      </label>
    </div>
  );
}

export default TermsStep;
