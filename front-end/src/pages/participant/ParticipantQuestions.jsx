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

  const orderedQuestions = useMemo(() => {
    const n = questions.length;
    const square = generateLatinSquare(n);
    const latinRow = pickLatinIndex(sessionData._id, n);
    const order = square[latinRow];
    return order.map(i => questions[i]);
  }, [questions, sessionData._id]);

  const idx = rawIdx;

  const currentQuestion = orderedQuestions[idx];
  const questionId = currentQuestion._id || currentQuestion.id;

  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

// Use artifact order for ranked question
  const [artifactOrder, setArtifactOrder] = useState(
    currentQuestion.questionType === "ranked" &&
      Array.isArray(currentQuestion.artifact)
      ? [...currentQuestion.artifact]
      : []
  );

  // Reset artifact order when question changes
  useEffect(() => {
    if (
      currentQuestion.questionType === "ranked" &&
      Array.isArray(currentQuestion.artifact)
    ) {
      setArtifactOrder([...currentQuestion.artifact]);
    }
  }, [currentQuestion]);

  const changeArtifactOrder = (index, direction) => {
    const newOrder = [...artifactOrder];
    if (direction === "left" && index > 0) {
      [newOrder[index - 1], newOrder[index]] = [
        newOrder[index],
        newOrder[index - 1],
      ];
    }
    if (direction === "right" && index < newOrder.length - 1) {
      [newOrder[index + 1], newOrder[index]] = [
        newOrder[index],
        newOrder[index + 1],
      ];
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
                  onChange={(e) => setAnswer(e.target.value)}
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
            onChange={(e) => setAnswer(e.target.value)}
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
              onChange={(e) => setAnswer(e.target.value)}
              className={styles.sliderInput}
            />
            <div className={styles.sliderValue}>
              Selected: {answer === "" ? 0 : answer}
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
            onChange={(e) => setAnswer(e.target.value)}
          />
        );
      case "ranked":
        const { rankedLabels } = currentQuestion;
        return (
          <div className={styles.rankedContainer}>
            <div className={styles.rankedRow}>
              {artifactOrder.map((artifact, i) => (
                <div
                  key={artifact.artId || artifact._id}
                  className={styles.artifactItem}
                >
                  {/* Show label above image for first and last */}
                  {i === 0 && rankedLabels && (
                    <div className={styles.rankedLabelTop}>
                      {rankedLabels.minLabel}
                    </div>
                  )}
                  {i === artifactOrder.length - 1 && rankedLabels && (
                    <div className={styles.rankedLabelTop}>
                      {rankedLabels.maxLabel}
                    </div>
                  )}
                  {renderArtifactContent({
                    url: artifact.artId?.url || artifact.artUrl,
                    filename:
                      artifact.artId?.filename ||
                      artifact.filename ||
                      (typeof artifact.artUrl === "string"
                        ? artifact.artUrl.split("/").pop()
                        : undefined),
                    mimetype:
                      artifact.artId?.mimetype ||
                      artifact.artType ||
                      artifact.mimetype,
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
    }
  }

  async function handleNext() {
    if (!questionId) {
      alert("Error: missing question ID.");
      return;
    }

    let answerToSend = answer;

    if (currentQuestion.questionType === "ranked") {
      answerToSend = JSON.stringify(artifactOrder.map(a => a.artId || a._id));
      if (!answerToSend || answerToSend.length === 0) {
        alert("Please rank the artifacts.");
        return;
      }
    } else if (answer.trim() === "") {
      alert("Please provide an answer.");
      return;
    }

    setLoading(true);
    try {
      await answerQuestions(studyId, sessionData._id, questionId, answerToSend);
      setLoading(false);
      setAnswer("");

      if (idx < orderedQuestions.length - 1) {
        // go to next question
        navigate(`../questions/${idx + 1}`);
      } else {
        // all done
        onComplete();
      }
    } catch (err) {
      setLoading(false);
      console.error(err);
      alert("Submission failed. Please try again.");
    }
  }

  useEffect(() => {
    console.log("ARTIFACT ORDER UPDATED:", artifactOrder);
  }, [artifactOrder]);
  
  return (
    <div className={styles.questionsContainer}>
      <h2>
        Question {idx + 1} of {orderedQuestions.length}
      </h2>

      {currentQuestion.questionType !== "ranked" &&
        Array.isArray(currentQuestion.artifact) &&
        currentQuestion.artifact.map((art, i) => {
          const src = art.artId?.url || art.artUrl;
          if (!src) {
            console.warn(`Artifact[${i}] has no URL:`, art);
            return null;
          }

          const filename =
            art.artId?.filename ||
            (typeof art.artUrl === "string"
              ? art.artUrl.split("/").pop()
              : `artifact-${i}`);
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
