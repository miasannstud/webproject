import styles from "./StudyPreview.module.css";

function StudyPreview({ title, description, onTitleChange, onDescriptionChange }) {
  return (
    <div className={styles.previewCard}>
      <label className={styles.label}>Title</label>
      <input
        data-testid="create-study-title"
        type="text"
        className={styles.input}
        placeholder="Study title"
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
      />

      <label className={styles.label}>Description</label>
      <textarea
        data-testid="create-study-description"
        className={styles.textarea}
        placeholder="Short description of your study"
        value={description}
        onChange={(e) => onDescriptionChange(e.target.value)}
      />
    </div>
  );
}

export default StudyPreview;