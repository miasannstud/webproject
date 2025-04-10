import styles from "./createStudy.module.css";
import React, { useState } from "react";
import StudyPreview from "./studyPreview/studyPreview";
import ArtifactApp from "./artifactCard/ArtifactCard";
// import QuestionCard from "./questionCard/QuestionCard";

function CreateStudy() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div className={styles.createStudyContainer}>
      <h1 className={styles.createStudyText}>Create Study</h1>
      <div className={styles.studyPreviewContainer}>
        <StudyPreview
          title={title}
          description={description}
          onTitleChange={setTitle}
          onDescriptionChange={setDescription}
        />
      </div>
      <div className={styles.artifactContainer}>
        <ArtifactApp />
      </div>
      {/* <div className={styles.questionContainer}>
        <QuestionCard />
      </div> */}
      
      {/* <button className={styles.saveButton} onClick={handleSaveStudy}> */}
      <button className={styles.saveButton}>
        Save Study
      </button>
    </div>
  );
}

export default CreateStudy;
