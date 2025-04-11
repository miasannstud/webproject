import { useState } from "react";
import { createStudy } from "../../services/studyService";
import StudyPreview from "./studyPreview/StudyPreview";
import ArtifactApp from "./artifactCard/ArtifactCard";
import QuestionsCard from "./questionCard/QuestionsCard";
import styles from "./createStudy.module.css";

function CreateStudy() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState([]);
  const [artifacts, setArtifacts] = useState([]);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleAddQuestion = (newQuestion) => {
    setQuestions([...questions, newQuestion]);
  };

  const handleRemoveQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleSaveStudy = async () => {
    if (!title.trim() || !description.trim()) {
      setError("Title and description are required.");
      return;
    }

    if (questions.length === 0) {
      setError("At least one question is required.");
      return;
    }

    setError("");
    try {
      const studyData = {
        studyTitle: title,
        description,
        questions,
      };

      await createStudy(studyData);
      setSuccessMessage("Study created successfully!");
      setTitle("");
      setDescription("");
      setQuestions([]);
      setArtifacts([]);
    } catch (err) {
      console.error("Error creating study:", err);
      setError("Failed to create study. Please try again.");
    }
  };

  return (
    <div className={styles.createStudyContainer}>
      <h1 className={styles.createStudyText}>Create Study</h1>
      {error && <p className={`${styles.message} ${styles.error}`}>{error}</p>}
      {successMessage && <p className={`${styles.message} ${styles.success}`}>{successMessage}</p>}
      <div className={styles.studyPreviewContainer}>
        <StudyPreview
          title={title}
          description={description}
          onTitleChange={setTitle}
          onDescriptionChange={setDescription}
        />
      </div>
      <div className={styles.artifactContainer}>
        <ArtifactApp onArtifactsChange={setArtifacts} />
      </div>
      <div className={styles.questionContainer}>
        <QuestionsCard
          onAddQuestion={handleAddQuestion}
          onRemoveQuestion={handleRemoveQuestion}
          questions={questions}
          artifacts={artifacts}
        />
      </div>
      <button className={styles.saveButton} onClick={handleSaveStudy}>
        Save Study
      </button>
    </div>
  );
}

export default CreateStudy;
