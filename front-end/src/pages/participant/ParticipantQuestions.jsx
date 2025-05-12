import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./ParticipantQuestions.module.css";
import { answerQuestions } from "../../services/sessionService";

function ParticipantQuestions({ questions, sessionData, studyId, onComplete }) {
  const { questionIndex } = useParams();
  const navigate = useNavigate();
  const idx = parseInt(questionIndex, 10);

  const currentQuestion = questions[idx];
  const questionId = currentQuestion._id || currentQuestion.id;

  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  if (!questions || questions.length === 0) {
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
        return (
          <div className={styles.sliderContainer}>
            <div className={styles.sliderLabels}>
              <span>1</span><span>10</span>
            </div>
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
    if (answer.trim() === "") {
      alert("Please provide an answer.");
      return;
    }

    setLoading(true);
    try {
      await answerQuestions(
        studyId,
        sessionData._id,
        questionId,
        answer
      );
      setLoading(false);
      setAnswer("");

      if (idx < questions.length - 1) {
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

  return (
    <div className={styles.questionsContainer}>
      <h2>
        Question {idx + 1} of {questions.length}
      </h2>
      <p>{currentQuestion.questionText || "No question text provided."}</p>
      {renderAnswerInput()}
      <div className={styles.buttonContainer}>
        <button
          onClick={handleNext}
          className={styles.nextButton}
          disabled={loading || answer.trim() === ""}
        >
          {idx === questions.length - 1 ? "Submit" : "Next"}
        </button>
      </div>
    </div>
  );
}

export default ParticipantQuestions;
