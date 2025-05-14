
function ConsentCard({
  consentTitle,
  consentSubtitle,
  consentText,
  onTitleChange,
  onSubtitleChange,
  onTextChange,
}) {
  return (
    <div>

      <div>
        <label htmlFor="consent-title">Title</label>
        <input
          id="consent-title"
          type="text"
          value={consentTitle}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="Welcome to the Study"
        />
      </div>

      <div>
        <label htmlFor="consent-subtitle">Subtitle</label>
        <input
          id="consent-subtitle"
          type="text"
          value={consentSubtitle}
          onChange={(e) => onSubtitleChange(e.target.value)}
          placeholder="Please read carefully"
        />
      </div>

      <div>
        <label htmlFor="consent-text">Description</label>
        <textarea
          id="consent-text"
          rows={6}
          value={consentText}
          onChange={(e) => onTextChange(e.target.value)}
          placeholder="Full consent information goes here..."
        />
      </div>
    </div>
  );
}

export default ConsentCard;
