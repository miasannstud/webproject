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
      setError("Question text is required");
      return;
    }

    if (questionType === "multiple-choice" && options.some((opt) => !opt.trim())) {
      setError("All options must be filled out");
      return;
    }

    setError("");
    const newQuestion = {
      questionText,
      questionType,
      options: questionType === "multiple-choice" ? options : [],
      artifact: selectedArtifacts.map((artifact) => ({
        _id: artifact._id,
        filename: artifact.filename,
        mimetype: artifact.mimetype,
        url: artifact.url,
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
        {question.artifact.map((artifactRef, i) => {
          let artifactObj = null;
          if (artifactRef._id) {
            artifactObj = artifacts.find(a => a._id === artifactRef._id);
          }
          if (!artifactObj && artifactRef.arttId) {
            artifactObj = artifacts.find(a => a._id === artifactRef.arttId);
          }
          const artifactToRender = artifactObj || artifactRef;
          return (
            <div key={i} className={artifactStyles.artifactItem}>
              {renderArtifactContent(artifactToRender)}
            </div>
          );
        })}
        {question.questionType === "multiple-choice" && (
          <ul className={styles.optionsList}>
            {question.options.map((option, i) => (
              <li key={i} className={styles.optionItem}>
                {typeof option === "object" && option !== null ? option.text : option}
              </li>
            ))}
          </ul>
        )}
        <button data-testid="create-study-removeQuestionButton" onClick={() => onRemoveQuestion(index)} className={styles.removeButton}>
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
              data-testid="create-study-questionText"
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
              data-testid="create-study-selectQuestionType"
              value={questionType}
              onChange={(e) => setQuestionType(e.target.value)}
              className={styles.input}
            >
              <option value="multiple-choice">Multiple Choice</option>
              <option value="text-box">Text</option>
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
                  data-testid="create-study-questionOption"
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  className={styles.input}
                />
                <button data-testid="create-study-removeOptionButton" onClick={() => removeOption(index)} className={styles.removeButton}>
                  Remove
                </button>
              </div>
            ))}
            <button data-testid="create-study-addOptionButton" onClick={addOption} className={styles.addOptionButton}>
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
                    data-testid="create-study-selectArtifactCheckbox"
                    type="checkbox"
                    checked={selectedArtifacts.includes(artifact)}
                    onChange={() => toggleArtifactSelection(artifact)}
                  />
                  <div>
                    <p>
                      Name:{" "}
                      {artifact.filename ? artifact.filename.replace(/\.[^/.]+$/, "") : "Unknown"}
                    </p>
                    <p>
                      Type: {artifact.mimetype || "Unknown"}
                    </p>
                    {renderArtifactContent(artifact)}
                  </div>
                </label>
              </li>
            ))}
          </ul>
        </div>
        <button data-testid="create-study-addQuestionButton" onClick={handleAddQuestion} className={styles.submitButton}>
          Add Question
        </button>
      </div>
      <div className={styles.addedQuestionsCard}>
        <h3>Added Questions</h3>
        <div className={styles.questionsContainer}>
          {questions.length > 0 ? (
            questions.map((question, index) => renderQuestionCard(question, index))
          ) : (
            <p className={styles.noQuestionsMessage}>No questions added yet</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default QuestionsCard;

