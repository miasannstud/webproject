import { useState } from "react";
import { renderArtifactContent } from "../../../services/ArtifactService";

import styles from "./QuestionsCard.module.css";
import artifactStyles from "../artifactCard/ArtifactCard.module.css";

import ReorderButton from "../../../components/shared/reorderButton/ReorderButton.jsx";

function QuestionsCard({ onAddQuestion, onRemoveQuestion, questions, artifacts }) {
  const [questionText, setQuestionText] = useState("");
  const [questionType, setQuestionType] = useState("multiple-choice");

  const [options, setOptions] = useState([""]);

  const [sliderMinLabel, setSliderMinLabel] = useState("");
  const [sliderMaxLabel, setSliderMaxLabel] = useState("");

  const [rankedMinLabel, setRankedMinLabel] = useState("");
  const [rankedMaxLabel, setRankedMaxLabel] = useState("");

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

  const ChangeSelectedArtifactOrder = (index, direction) =>{
    const newOrder = [...selectedArtifacts];

  if (direction === "left" && index > 0) {
    [newOrder[index - 1], newOrder[index]] = [newOrder[index], newOrder[index - 1]];
  }
  if (direction === "right" && index < newOrder.length - 1) {
    [newOrder[index + 1], newOrder[index]] = [newOrder[index], newOrder[index + 1]];
  }
    setSelectedArtifacts(newOrder);
  }

  const handleAddQuestion = () => {
    if (!questionText.trim()) {
      setError("Question text is required");
      return;
    }

    if (questionType === "multiple-choice" && options.some((opt) => !opt.trim())) {
      setError("All options must be filled out");
      return;
    }

    if (questionType === "slider" && (!sliderMinLabel.trim() || !sliderMaxLabel.trim())) {
      setError("Both slider labels must be filled out");
      return;
    }

    if (questionType === "ranked" && (!rankedMinLabel.trim() || !rankedMaxLabel.trim())) {
      setError("Both ranked labels must be filled out");
      return;
    }

    const mappedArtifacts = selectedArtifacts.map(a => ({
      artId:   a._id,
      artUrl:  a.url,
      artType: a.mimetype
    }));

    setError("");
    
    const newQuestion = {
      questionText,
      questionType,
      options: questionType === "multiple-choice" ? options : [],
      artifact: mappedArtifacts,
      ...(questionType === "slider" && {
        sliderRange: {
          minLabel: sliderMinLabel,
          maxLabel: sliderMaxLabel,
          minValue: 0,
          maxValue: 10,
        }
      }),
      ...(questionType === "ranked" && {
        rankedLabels: {
          minLabel: rankedMinLabel,
          maxLabel: rankedMaxLabel,
        }
      })
    };

    onAddQuestion(newQuestion);
    setQuestionText("");
    setOptions([""]);
    setSelectedArtifacts([]);
    setQuestionType("multiple-choice");

    if (questionType === "slider") {
      setSliderMinLabel("");
      setSliderMaxLabel("");
    }

    if (questionType === "ranked") {
      setRankedMinLabel("");
      setRankedMaxLabel("");
    }
  };

  const renderQuestionCard = (question, index) => {
    const seen = new Set();
    const uniqueArtifacts = question.artifact.filter(artifactRef => {
      const id = artifactRef._id || artifactRef.artId;
      if (seen.has(id)) return false;
      seen.add(id);
      return true;
    });

    return (
      <div key={index} className={styles.questionCard}>
        <h4>{question.questionText}</h4>
        {uniqueArtifacts.map((artifactRef, i) => {
          let artifactObj = null;
          if (artifactRef._id) {
            artifactObj = artifacts.find(a => a._id === artifactRef._id);
          }
          if (!artifactObj && artifactRef.artId) {
            artifactObj = artifacts.find(a => a._id === artifactRef.artId);
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

        {question.questionType === "slider" && question.sliderRange && (
          <div className={styles.sliderLabels}>
            <span>Minimun Label: {question.sliderRange.minLabel}</span>
            <span>Maximun Label: {question.sliderRange.maxLabel}</span>
          </div>
        )}

        {question.questionType === "ranked" && question.rankedLabel && (
          <div className={styles.rankedLabels}>
            <span>Minimun Label: {question.rankedLabel.minLabel}</span>
            <span>Maximun Label: {question.rankedLabel.maxLabel}</span>
          </div>
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
              <option value="ranked">Ranked</option>
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

        {questionType === "slider" && (
          <div className={styles.sliderLabelInputs}>
            <label>
              Slider Minimum Label:
              <input
                type="text"
                value={sliderMinLabel}
                onChange={(e) => setSliderMinLabel(e.target.value)}
                className={styles.input}
              />
            </label>
            <label>
              Slider Maximum Label:
              <input
                type="text"
                value={sliderMaxLabel}
                onChange={(e) => setSliderMaxLabel(e.target.value)}
                className={styles.input}
              />
            </label>
          </div>
        )}

        {questionType === "ranked" && (
          <div className={styles.RankedLabelInputs}>
            <label>
              Ranked Minimum Label:
              <input
                type="text"
                value={rankedMinLabel}
                onChange={(e) => setRankedMinLabel(e.target.value)}
                className={styles.input}
              />
            </label>
            <label>
              Ranked Maximum Label:
              <input
                type="text"
                value={rankedMaxLabel}
                onChange={(e) => setRankedMaxLabel(e.target.value)}
                className={styles.input}
              />
            </label>
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

        <div className={styles.inputGroup}>
          <h4>Selected Artifacts Order:</h4>
          <ul className={artifactStyles.artifactList}>
            {selectedArtifacts.map((artifact, i) => (
              <li key={artifact._id} className={artifactStyles.artifactItem}>
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
                <ReorderButton
                  onMoveLeft={() => ChangeSelectedArtifactOrder(i, "left")}
                  onMoveRight={() => ChangeSelectedArtifactOrder(i, "right")}
                  disableLeft={i === 0}
                  disableRight={i === selectedArtifacts.length - 1}
                />
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

