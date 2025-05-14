import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { answerQuestions } from "../../services/sessionService";
import { renderArtifactContent } from "../../services/ArtifactService";
import ReorderButton from "../../components/shared/reorderButton/ReorderButton";
import styles from "./ParticipantQuestions.module.css";
import { generateLatinSquare } from "../../utils/latinSquare";
import { pickLatinIndex } from "../../utils/pickLatinIndex";

function ParticipantQuestions({ questions, sessionData, studyId, onComplete }) {
  if (!sessionData || !sessionData._id) {
    return <div>Loading session…</div>;
  }

  const { questionIndex } = useParams();
  const navigate = useNavigate();
  const rawIdx = parseInt(questionIndex, 10);

  // questions in original order
  const orderedQuestions = questions;
  const idx = rawIdx;
  const currentQuestion = orderedQuestions[idx];
  const questionId = currentQuestion._id || currentQuestion.id;

  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  // latin-square order for artifacts
  const initialArtifacts = useMemo(() => {
    const arts = Array.isArray(currentQuestion.artifact) ? currentQuestion.artifact : [];
    const n = arts.length;
    if (n <= 1) return arts;

    const square = generateLatinSquare(n);
    const row = pickLatinIndex(sessionData._id, n);
    return square[row].map(i => arts[i]);
  }, [currentQuestion.artifact, sessionData._id]);

  // allow participant to reorder artifacts (for ranked questions)
  const [artifactOrder, setArtifactOrder] = useState(initialArtifacts);

  // reset artifact order when question changes
  useEffect(() => {
    setArtifactOrder(initialArtifacts);
  }, [initialArtifacts]);

  const changeArtifactOrder = (index, direction) => {
    const newOrder = [...artifactOrder];
    if (direction === "left" && index > 0) {
      [newOrder[index - 1], newOrder[index]] = [newOrder[index], newOrder[index - 1]];
    }
    if (direction === "right" && index < newOrder.length - 1) {
      [newOrder[index + 1], newOrder[index]] = [newOrder[index], newOrder[index + 1]];
    }
    setArtifactOrder(newOrder);
  };

  if (!orderedQuestions || orderedQuestions.length === 0) {
    return <div>No questions available.</div>;
  }

  function renderAnswerInput() {
    switch (currentQuestion.questionType) {
      case "multiple-choice":
        return (
          <div className={styles.multipleChoiceContainer}>
            {currentQuestion.options.map((opt, i) => (
              <label key={i} className={styles.optionLabel}>
                <input
                  type="radio"
                  name="mc"
                  value={opt.text}
                  checked={answer === opt.text}
                  onChange={e => setAnswer(e.target.value)}
                />
                {opt.text}
              </label>
            ))}
          </div>
        );
      case "text-box":
        return (
          <input
            type="text"
            className={styles.answerInput}
            value={answer}
            placeholder="Your answer..."
            onChange={e => setAnswer(e.target.value)}
          />
        );
      case "slider":
        const { sliderRange } = currentQuestion;
        return (
          <div className={styles.sliderContainer}>
            {sliderRange && (
              <div className={styles.sliderLabels}>
                <span>{sliderRange.minLabel}</span>
                <span>{sliderRange.maxLabel}</span>
              </div>
            )}
            <input
              type="range"
              min="0"
              max="10"
              value={answer === "" ? 0 : answer}
              onChange={e => setAnswer(e.target.value)}
              className={styles.sliderInput}
            />
            <div className={styles.sliderValue}>
              Selected: {answer === "" ? 0 : answer}
            </div>
          </div>
        );
      case "ranked":
        const { rankedLabels } = currentQuestion;
        return (
          <div className={styles.rankedContainer}>
            <div className={styles.rankedRow}>
              {artifactOrder.map((artifact, i) => (
                <div key={artifact.artId || artifact._id} className={styles.artifactItem}>
                  {i === 0 && rankedLabels && (
                    <div className={styles.rankedLabelTop}>{rankedLabels.minLabel}</div>
                  )}
                  {i === artifactOrder.length - 1 && rankedLabels && (
                    <div className={styles.rankedLabelTop}>{rankedLabels.maxLabel}</div>
                  )}
                  {renderArtifactContent({
                    url: artifact.artId?.url || artifact.artUrl,
                    filename:
                      artifact.artId?.filename ||
                      artifact.filename ||
                      (typeof artifact.artUrl === "string" ? artifact.artUrl.split("/").pop() : undefined),
                    mimetype: artifact.artId?.mimetype || artifact.artType || artifact.mimetype,
                  })}
                  <ReorderButton
                    onMoveLeft={() => changeArtifactOrder(i, "left")}
                    onMoveRight={() => changeArtifactOrder(i, "right")}
                    disableLeft={i === 0}
                    disableRight={i === artifactOrder.length - 1}
                  />
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return (
          <input
            type="text"
            className={styles.answerInput}
            value={answer}
            placeholder="Your answer..."
            onChange={e => setAnswer(e.target.value)}
          />
        );
    }
  }

  async function handleNext() {
    if (!questionId) {
      alert("Error: missing question ID.");
      return;
    }

    let answerToSend;

    if (currentQuestion.questionType === "ranked") {
      answerToSend = artifactOrder.map(a => a.artId || a._id);
      if (!answerToSend.length) {
        alert("Please rank the artifacts.");
        return;
      }
    } else {
      if (answer.trim() === "") {
        alert("Please provide an answer.");
        return;
      }
      answerToSend = answer;
    }

    setLoading(true);
    try {
      await answerQuestions(studyId, sessionData._id, questionId, answerToSend);
      setLoading(false);
      setAnswer("");

      if (idx < orderedQuestions.length - 1) {
        navigate(`../questions/${idx + 1}`);
      } else {
        onComplete();
      }
    } catch (err) {
      setLoading(false);
      console.error(err);
      alert("Submission failed. Please try again.");
    }
  }

  return (
    <div className={styles.questionsContainer}>
      <h2>
        Question {idx + 1} of {orderedQuestions.length}
      </h2>

      {currentQuestion.questionType !== "ranked" &&
        Array.isArray(currentQuestion.artifact) &&
        initialArtifacts.map((art, i) => {
          const src = art.artId?.url || art.artUrl;
          if (!src) return null;

          const filename =
            art.artId?.filename ||
            (typeof art.artUrl === "string" ? art.artUrl.split("/").pop() : `artifact-${i}`);
          const mimetype = art.artId?.mimetype || art.mimetype;

          return (
            <div key={i} className={styles.imageContainer}>
              {renderArtifactContent({ url: src, filename, mimetype })}
            </div>
          );
        })}

      <p>{currentQuestion.questionText || "No question text provided."}</p>
      {renderAnswerInput()}
      <div className={styles.buttonContainer}>
        <button
          onClick={handleNext}
          className={styles.nextButton}
          disabled={loading || (currentQuestion.questionType !== "ranked" && answer.trim() === "")}
        >
          {idx === orderedQuestions.length - 1 ? "Submit" : "Next"}
        </button>
      </div>
    </div>
  );
}

export default ParticipantQuestions;