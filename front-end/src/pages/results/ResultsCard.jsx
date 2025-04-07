// displays the study title, number of questions, created date, and session count (how many have answered the study)
// has a "Download" button that uses the studies/:studyId/sessions/download endpoint

import styles from './ResultsCard.module.css';
import { downloadStudyData } from '../../services/studyService';

function ResultsCard({ study }) {
    const { _id, studyTitle, questions, createdAt, sessions } = study;

    async function handleDownload() {
        try {
            // i dont know if i am going to keep this code, i have to fix the controlle for this endpoint first and see if it even works..
            // call the download endpoint and expect a blob in response, what is a blob?
            const blob = await downloadStudyData(_id);
            // create a temporaru url for the blob
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${studyTitle}_results.csv`;
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Download failed:', error);
            alert('Download failed. Try again');
        }
    }

    return (
        <div className={styles.card}>
        <h2 className={styles.title}>{studyTitle}</h2>
        <p className={styles.info}>
          <strong>Questions:</strong> {questions ? questions.length : 0}
        </p>
        <p className={styles.info}>
          <strong>Created At:</strong> {new Date(createdAt).toLocaleString()}
        </p>
        <p className={styles.info}>
          <strong>Answered:</strong> {sessions ? sessions.length : 0}
        </p>
        <button className={styles.downloadButton} onClick={handleDownload}>
          Download
        </button>
      </div>
    );
}

export default ResultsCard;