import { useState } from "react";
import styles from "./ParticipantQuestions.module.css";
import { answerQuestions } from "../../services/sessionService";

function ParticipantQuestions({ questions, sessionData, studyId, onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  if (!questions || questions.length === 0) {
    return <div>No questions available.</div>;
  }

  const currentQuestion = questions[currentIndex];
  const questionId = currentQuestion._id || currentQuestion.id;

  // helper function to render the input based on question type
  function renderAnswerInput() {
    switch (currentQuestion.questionType) {
      case "multiple-choice":
        if (!currentQuestion.options || currentQuestion.options.length === 0) {
          return <div>No options provided.</div>;
        }
        return (
          <div className={styles.multipleChoiceContainer}>
            {currentQuestion.options.map((option, index) => (
              <label key={index} className={styles.optionLabel}>
                <input
                  type="radio"
                  name="multipleChoice"
                  value={option.text}
                  checked={currentAnswer === option.text}
                  onChange={(e) => setCurrentAnswer(e.target.value)}
                />
                {option.text}
              </label>
            ))}
          </div>
        );
      case "text-box":
        return (
          <input
            type="text"
            className={styles.answerInput}
            value={currentAnswer}
            placeholder="Your answer..."
            onChange={(e) => setCurrentAnswer(e.target.value)}
          />
        );
      case "slider":
        return (
          <div className={styles.sliderContainer}>
            <div className={styles.sliderLabels}>
              <span>1</span>
              <span>10</span>
            </div>
            <input
              type="range"
              min="0"
              max="10"
              value={currentAnswer === "" ? 0 : currentAnswer}
              onChange={(e) => setCurrentAnswer(e.target.value)}
              className={styles.sliderInput}
            />
            <div className={styles.sliderValue}>
              Selected: {currentAnswer === "" ? 0 : currentAnswer}
            </div>
          </div>
        );
      default:
        return (
          <input
            type="text"
            className={styles.answerInput}
            value={currentAnswer}
            placeholder="Your answer..."
            onChange={(e) => setCurrentAnswer(e.target.value)}
          />
        );
    }
  }

  async function handleNext() {
    // Check if we have a valid question id
    if (!questionId) {
      console.error("Question ID is missing:", currentQuestion);
      alert("Error: Question ID is missing. Cannot submit answer.");
      return;
    }
    if (currentAnswer === "") {
      alert("Please provide an answer.");
      return;
    }

    // Call the endpoint to submit this answer.
    setLoading(true);
    try {
      await answerQuestions(
        studyId,
        sessionData._id, // assuming sessionData contains _id
        questionId,
        currentAnswer
      );
      // Clear answer, move to next question (or finish).
      setLoading(false);
      setCurrentAnswer("");
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        onComplete();
      }
    } catch (error) {
      setLoading(false);
      console.error("Error submitting answer:", error);
      alert("Error submitting answer. Please try again.");
    }
  }

  return (
    <div className={styles.questionsContainer}>
      {/* Conditionally display different images for slider and text-box questions */}
      {currentQuestion.questionType === "slider" && (
        <div className={styles.imageContainer}>
          <img
            src="http://localhost:8080/uploads/1744368271870-dessert.png"
            alt="Slider question related"
            className={styles.questionImage}
          />
        </div>
      )}
      {currentQuestion.questionType === "text-box" && (
        <div className={styles.imageContainer}>
          <img
            src="http://localhost:8080/uploads/1744368277783-beaver.png"
            alt="Text question related"
            className={styles.questionImage}
          />
        </div>
      )}

      <h2>
        Question {currentIndex + 1} of {questions.length}
      </h2>
      <p>{currentQuestion.questionText || 'No question text provided.'}</p>
      
      {/* render the input based on question type */}
      {renderAnswerInput()}
      
      <div className={styles.buttonContainer}>
        <button
          onClick={handleNext}
          className={styles.nextButton}
          disabled={loading || currentAnswer.trim() === ''}
        >
          {currentIndex === questions.length - 1 ? 'Submit' : 'Next'}
        </button>
      </div>
    </div>
  );
}

export default ParticipantQuestions;
