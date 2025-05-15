import styles from './StudyOverview.module.css';

function StudyOverview({ study, onNext }) {
  return (
    <div className={styles.overviewContainer}>
      <h2>{study.studyTitle}</h2>
      <p>{study.description}</p>
      <button className={styles.nextButton} onClick={onNext}>Next</button>
    </div>
  );
}

export default StudyOverview;
