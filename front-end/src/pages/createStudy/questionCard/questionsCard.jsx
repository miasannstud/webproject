import { useState } from "react";
import { renderArtifactContent } from "../../../services/ArtifactService";
import styles from "./QuestionsCard.module.css";
import artifactStyles from "../artifactCard/ArtifactCard.module.css";

function QuestionsCard({ onAddQuestion, onRemoveQuestion, questions, artifacts }) {
  const [questionText, setQuestionText] = useState("");
  const [questionType, setQuestionType] = useState("multiple-choice");
  const [options, setOptions] = useState([""]);
  const [selectedArtifacts, setSelectedArtifacts] = useState([]);
  const [error, setError] = useState("");

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const addOption = () => setOptions([...options, ""]);

  const removeOption = (index) => {
    const updatedOptions = options.filter((_, i) => i !== index);
    setOptions(updatedOptions);
  };

  const toggleArtifactSelection = (artifact) => {
    if (selectedArtifacts.includes(artifact)) {
      setSelectedArtifacts(selectedArtifacts.filter((a) => a !== artifact));
    } else {
      setSelectedArtifacts([...selectedArtifacts, artifact]);
    }
  };

  const handleAddQuestion = () => {
    if (!questionText.trim()) {
      setError("Question text is required.");
      return;
    }

    if (questionType === "multiple-choice" && options.some((opt) => !opt.trim())) {
      setError("All options must be filled out.");
      return;
    }

    setError("");
    const newQuestion = {
      questionText,
      questionType,
      options: questionType === "multiple-choice" ? options : [],
      artifact: selectedArtifacts.map((artifact) => ({
        arttId: artifact._id,
        artUrl: artifact.url,
        artType: artifact.mimetype,
      })),
    };

    onAddQuestion(newQuestion);
    setQuestionText("");
    setOptions([""]);
    setSelectedArtifacts([]);
    setQuestionType("multiple-choice");
  };

  const renderQuestionCard = (question, index) => {
    return (
      <div key={index} className={styles.questionCard}>
        <h4>{question.questionText}</h4>
        {question.artifact.map((artifact, i) => (
          <div key={i} className={artifactStyles.artifactItem}>
            {renderArtifactContent(artifact)}
          </div>
        ))}
        {question.questionType === "multiple-choice" && (
          <ul className={styles.optionsList}>
            {question.options.map((option, i) => (
              <li key={i} className={styles.optionItem}>
                {option}
              </li>
            ))}
          </ul>
        )}
        <button onClick={() => onRemoveQuestion(index)} className={styles.removeButton}>
          Remove
        </button>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {error && <p className={`${styles.message} ${styles.error}`}>{error}</p>}
        <h2>Add Questions</h2>
        <div className={styles.inputGroup}>
          <label>
            Question Text:
            <input
              type="text"
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              className={styles.input}
            />
          </label>
        </div>
        <div className={styles.inputGroup}>
          <label>
            Question Type:
            <select
              value={questionType}
              onChange={(e) => setQuestionType(e.target.value)}
              className={styles.input}
            >
              <option value="multiple-choice">Multiple Choice</option>
              <option value="text">Text</option>
              <option value="slider">Slider</option>
            </select>
          </label>
        </div>
        {questionType === "multiple-choice" && (
          <div className={styles.optionsContainer}>
            <h4>Options:</h4>
            {options.map((option, index) => (
              <div key={index} className={styles.optionItem}>
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  className={styles.input}
                />
                <button onClick={() => removeOption(index)} className={styles.removeButton}>
                  Remove
                </button>
              </div>
            ))}
            <button onClick={addOption} className={styles.addOptionButton}>
              Add Option
            </button>
          </div>
        )}
        <div className={styles.inputGroup}>
          <h4>Select Artifacts:</h4>
          <ul className={artifactStyles.artifactList}>
            {artifacts.map((artifact) => (
              <li key={artifact._id} className={artifactStyles.artifactItem}>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedArtifacts.includes(artifact)}
                    onChange={() => toggleArtifactSelection(artifact)}
                  />
                  <div>
                    <p>
                      <strong>Name:</strong>{" "}
                      {artifact.filename ? artifact.filename.replace(/\.[^/.]+$/, "") : "Unknown"}
                    </p>
                    <p>
                      <strong>Type:</strong> {artifact.mimetype || "Unknown"}
                    </p>
                    {renderArtifactContent(artifact)}
                  </div>
                </label>
              </li>
            ))}
          </ul>
        </div>
        <button onClick={handleAddQuestion} className={styles.submitButton}>
          Add Question
        </button>
      </div>
      <div className={styles.addedQuestionsCard}>
        <h3>Added Questions</h3>
        <div className={styles.questionsContainer}>
          {questions.length > 0 ? (
            questions.map((question, index) => renderQuestionCard(question, index))
          ) : (
            <p className={styles.noQuestionsMessage}>No questions added yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default QuestionsCard;

