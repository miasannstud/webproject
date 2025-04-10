import styles from './StudyOverview.module.css';

function StudyOverview({ study }) {
  return (
    <div className={styles.overviewContainer}>
      <h2>{study.studyTitle}</h2>
      <p>{study.description}</p>
    </div>
  );
}

export default StudyOverview;
