import styles from "./ConsentCard.module.css";

function ConsentCard({
  consentTitle,
  consentAuthor,
  consentSubtitle,
  consentText,
  onTitleChange,
  onAuthorChange,
  onSubtitleChange,
  onTextChange,
}) {
  return (
    <div className={styles.consentContainer}>
      <div className={styles.consentCard}>
        <div className={styles.optionsItem}>
          <label htmlFor="consent-title">Consent Title</label>
          <input
            id="consent-title"
            type="text"
            required
            value={consentTitle}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder="Welcome to the Study"
            className={styles.input}
          />
        </div>

        <div className={styles.optionsItem}>
          <label htmlFor="consent-author">Author</label>
          <input
            id="consent-author"
            type="text"
            value={consentAuthor}
            onChange={(e) => onAuthorChange(e.target.value)}
            placeholder="Add your name"
            className={styles.input}
          />
        </div>

        <div className={styles.optionsItem}>
          <label htmlFor="consent-subtitle">Consent Subtitle</label>
          <input
            id="consent-subtitle"
            type="text"
            value={consentSubtitle}
            onChange={(e) => onSubtitleChange(e.target.value)}
            placeholder="Please read carefully"
            className={styles.input}
          />
        </div>

        <div className={styles.optionsItem}>
          <label htmlFor="consent-text">Consent Description</label>
          <textarea
            id="consent-text"
            required
            rows={6}
            value={consentText}
            onChange={(e) => onTextChange(e.target.value)}
            placeholder="Full consent information goes here..."
            className={styles.input}
          />
        </div>
      </div>
    </div>
  );
}

export default ConsentCard;
