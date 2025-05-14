import styles from './ConsentForm.module.css';

function ConsentForm({
  agreeConsent,
  onConsentChange,
  onNext,
  consentTitle,
  consentAuthor,
  consentSubtitle,
  consentText,
}) {
  return (
    <div className={styles.consentContainer}>
      <h2>{consentTitle}</h2>
      {consentAuthor && <p className={styles.author}>Study created by: {consentAuthor}</p>}
      {consentSubtitle && <h4 className={styles.subtitle}>{consentSubtitle}</h4>}
      <p className={styles.body}>{consentText}</p>

      <label className={styles.checkboxLabel}>
        <input
          type="checkbox"
          checked={agreeConsent}
          onChange={e => onConsentChange(e.target.checked)}
        />
        I agree
      </label>

      <button
        className={styles.nextButton}
        disabled={!agreeConsent}
        onClick={onNext}
      >
        Next
      </button>
    </div>
  );
}

export default ConsentForm;