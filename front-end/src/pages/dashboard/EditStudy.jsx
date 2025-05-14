import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getStudyById, updateStudy } from "../../services/studyService";
import { fetchArtifactsByStudy } from "../../services/ArtifactService";
import StudyPreview from "../createStudy/studyPreview/StudyPreview";
import ArtifactApp from "../createStudy/artifactCard/ArtifactCard";
import QuestionsCard from "../createStudy/questionCard/QuestionsCard";
import ExpireDate from "../createStudy/expireCard/ExpireDate";
import ConsentCard from "../createStudy/consentCard/ConsentCard";
import styles from "../createStudy/CreateStudy.module.css";

function EditStudy() {
  const { studyId } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [questions, setQuestions] = useState([]);
  const [artifacts, setArtifacts] = useState([]);
  const [consent, setConsent] = useState({ title: "", subtitle: "", text: "", });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    async function fetchStudyAndArtifacts() {
      try {
        const [study, studyArtifacts] = await Promise.all([
          getStudyById(studyId),
          fetchArtifactsByStudy(studyId)
        ]);
        setTitle(study.studyTitle || "");
        setDescription(study.description || "");
        setQuestions(study.questions || []);
        setArtifacts(studyArtifacts || []);
        setExpirationDate(
          study.expirationDate
            ? study.expirationDate.split("T")[0]
            : ""
        );
        setConsent({
          title: study.consent?.title || "",
          subtitle: study.consent?.subtitle || "",
          text: study.consent?.text || "",
        });
      } catch (err) {
        setError("Failed to load study or artifacts. Error: " + err.message);
      }
    }
    fetchStudyAndArtifacts();
  }, [studyId]);

  const handleConsentTitle    = (val) => setConsent(c => ({ ...c, title: val }));
  const handleConsentSubtitle = (val) => setConsent(c => ({ ...c, subtitle: val }));
  const handleConsentText     = (val) => setConsent(c => ({ ...c, text: val }));

  const handleUpdateStudy = async () => {
    if (!title.trim() || !description.trim()) {
      setError("Title and description are required.");
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
        expirationDate: expirationDate || null,
        consent,
      };
      await updateStudy(studyId, studyData);
      setSuccessMessage("Study updated successfully!");
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (err) {
      setError("Failed to update study. Please try again. Error: " + err.message);
    }
  };

  const handleAddQuestion = (newQuestion) => setQuestions([...questions, newQuestion]);
  const handleRemoveQuestion = (index) => setQuestions(questions.filter((_, i) => i !== index));

  return (
    <div className={styles.createStudyContainer}>
      <h1 className={styles.createStudyText}>Edit Study</h1>
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
      <div className={styles.consentContainer}>
        <ConsentCard
          consentTitle={consent.title}
          consentSubtitle={consent.subtitle}
          consentText={consent.text}
          onTitleChange={handleConsentTitle}
          onSubtitleChange={handleConsentSubtitle}
          onTextChange={handleConsentText}
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
      <ExpireDate
        expirationDate={expirationDate}
        onChange={setExpirationDate}
      />
      <button className={styles.saveButton} onClick={handleUpdateStudy}>
        Save Changes
      </button>
    </div>
  );
}

export default EditStudy;
