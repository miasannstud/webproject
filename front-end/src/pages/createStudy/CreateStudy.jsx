import { useEffect, useState } from "react";
import { createStudy } from "../../services/studyService";
import StudyPreview from "./studyPreview/StudyPreview";
import ArtifactApp from "./artifactCard/ArtifactCard";
import QuestionsCard from "./questionCard/QuestionsCard";
import ExpireDate from "./expireCard/ExpireDate";
import styles from "./CreateStudy.module.css";
import { updateStudy } from "../../services/studyService";
import DemographicsCard from "./demographicsCard/DemographicsCard";

function CreateStudy() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [questions, setQuestions] = useState([]);
  const [artifacts, setArtifacts] = useState([]);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [studyId, setStudyId] = useState(null);
  const [demographics, setDemographics] = useState([]);

  useEffect(() => {
    if (!studyId) {
      const researcherId = localStorage.getItem("researcherId");
      createStudy({
        studyTitle: "Draft Study",
        description: "Draft description",
        questions: [],
        createdBy: researcherId,
        expirationDate,
        draft: true,
      }).then((draft) => {
        setStudyId(draft._id);
      });
    }
  }, [studyId, expirationDate]);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (
        (title.trim() ||
          description.trim() ||
          questions.length > 0 ||
          artifacts.length > 0) &&
        !successMessage
      ) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [title, description, questions, artifacts, successMessage]);

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

    const researcherId = localStorage.getItem("researcherId");
    if (!researcherId) {
      setError("You must be logged in to create a study.");
      return;
    }

    setError("");
    try {
      const formattedQuestions = questions.map((q) => ({
        ...q,
        options: Array.isArray(q.options)
          ? q.options.map((opt) =>
              typeof opt === "string" ? { text: opt } : opt
            )
          : [],
      }));

      const studyData = {
        studyTitle: title,
        description,
        questions: formattedQuestions,
        demographics,
        expirationDate: expirationDate || null,
        createdBy: researcherId,
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
      setExpirationDate("");
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
      {successMessage && (
        <p className={`${styles.message} ${styles.success}`}>
          {successMessage}
        </p>
      )}
      <div className={styles.studyPreviewContainer}>
        <StudyPreview
          title={title}
          description={description}
          onTitleChange={setTitle}
          onDescriptionChange={setDescription}
        />
      </div>
      <div className={styles.demographicsContainer}>
        <DemographicsCard
        demographics={demographics}
        setDemographics={setDemographics}
        />
      </div>
      <div className={styles.demographicsContainer}></div>
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
      <ExpireDate
        expirationDate={expirationDate}
        onChange={setExpirationDate}
      />
      <button className={styles.saveButton} onClick={handleSaveStudy}>
        Save Study
      </button>
    </div>
  );
}

export default CreateStudy;
