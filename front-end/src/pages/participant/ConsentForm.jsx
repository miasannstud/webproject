import styles from './ConsentForm.module.css';

function TermsStep({ agreeTerms, onTermsChange, onNext }) {
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
        I agree
      </label>
      <button disabled={!agreeTerms} onClick={onNext}>Next</button>
    </div>
  );
}

export default TermsStep;
