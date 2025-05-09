import { useEffect, useState } from "react";
import { createStudy } from "../../services/studyService";
import StudyPreview from "./studyPreview/StudyPreview";
import ArtifactApp from "./artifactCard/ArtifactCard";
import QuestionsCard from "./questionCard/QuestionsCard";
import styles from "./CreateStudy.module.css";
import { updateStudy } from "../../services/studyService";

function CreateStudy() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState([]);
  const [artifacts, setArtifacts] = useState([]);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [studyId, setStudyId] = useState(null);

  useEffect(() => {
    if (!studyId) {
      const userId = localStorage.getItem("userId");
      createStudy({
        studyTitle: "Draft Study",
        description: "Draft description",
        questions: [],
        createdBy: userId,
        draft: true,
      }).then((draft) => {
        setStudyId(draft._id);
      });
    }
  }, [studyId]);
  
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

  const userId = localStorage.getItem("userId");
  if (!userId) {
    setError("You must be logged in to create a study.");
    return;
  }

  setError("");
  try {
    const formattedQuestions = questions.map(q => ({
      ...q,
      options: Array.isArray(q.options)
        ? q.options.map(opt =>
            typeof opt === "string" ? { text: opt } : opt
          )
        : [],
    }));

    const studyData = {
      studyTitle: title,
      description,
      questions: formattedQuestions,
      createdBy: userId,
      draft: false,
    };

    const updatedStudy = await updateStudy(studyId, studyData);
    if (!updatedStudy || !updatedStudy._id) {
      setError("Failed to update study. No study ID returned.");
      return;
    }
    setSuccessMessage("Study saved successfully!");
    setTitle("");
    setDescription("");
    setQuestions([]);
    setArtifacts([]);
  } catch (err) {
    console.error("Error updating study:", err);
    setError("Failed to save study. Please try again.");
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
        <ArtifactApp onArtifactsChange={setArtifacts} studyId={studyId} />
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
