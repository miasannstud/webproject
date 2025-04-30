// displays the study title, number of questions, created date, and session count (how many have answered the study)
// has a "Download" button that uses the studies/:studyId/sessions/download endpoint

import styles from "./ResultsCard.module.css";
import { downloadStudyDataJSON, downloadStudyDataCSV } from "../../services/studyService";
import useFetchSessionCount from "../../hooks/useFetchSessionCount";

function ResultsCard({ study }) {
  const { _id, studyTitle, questions, createdAt, updatedAt } = study;
  const { sessionCount, loading, error } = useFetchSessionCount(_id);

  async function handleDownloadJSON() {
    try {
      // i dont know if i am going to keep this code, i have to fix the controlle for this endpoint first and see if it even works..
      // call the download endpoint and expect a blob in response, what is a blob?
      const blob = await downloadStudyDataJSON(_id);
      // create a temporaru url for the blob
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      // file extention to .json
      link.download = `${studyTitle}_results.json`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
      alert("Download failed. Try again");
    }
  }

  async function handleDownloadCSV() {
    try {
      const blob = await downloadStudyDataCSV(_id);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      // file extention to .csv
      link.download = `${studyTitle}_results.csv`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("CSV download failed:", error);
      alert("Download failed. Try again");
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
        <strong>Number of participants:</strong>{" "}
        {loading ? "Loading..." : sessionCount}
      </p>
      {error && <p className={styles.error}>Error fetching session count</p>}
      <p className={styles.info}>
        <strong>Expiration Date:</strong> {new Date(updatedAt).toLocaleString()}
      </p>
      <button className={styles.downloadButton} onClick={handleDownloadJSON}>
        Download data as JSON
      </button>
      <button className={styles.downloadButton} onClick={handleDownloadCSV}>
          Download data as CSV
      </button>
    </div>
  );
}

export default ResultsCard;
