import { useState, useEffect } from 'react';
import { createQuestion } from '../../../services/studyService';
import { fetchArtifacts } from '../../../services/ArtifactService';
import styles from './questionsCard.module.css';

function QuestionsCard() {
  const [questionText, setQuestionText] = useState('');
  const [questionType, setQuestionType] = useState('multiple-choice');
  const [options, setOptions] = useState(['']);
  const [artifacts, setArtifacts] = useState([]);
  const [selectedArtifacts, setSelectedArtifacts] = useState([]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    async function loadArtifacts() {
      try {
        const data = await fetchArtifacts();
        setArtifacts(data);
      } catch (err) {
        console.error('Error fetching artifacts:', err);
        setError('Failed to load artifacts. Please try again.');
      }
    }
    loadArtifacts();
  }, []);

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const addOption = () => setOptions([...options, '']);

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

  const handleCreateQuestion = async () => {
    if (!questionText.trim()) {
      setError('Question text is required.');
      return;
    }

    if (questionType === 'multiple-choice' && options.some((opt) => !opt.trim())) {
      setError('All options must be filled out.');
      return;
    }

    setError('');
    try {
      const questionData = {
        questionText,
        questionType,
        options: questionType === 'multiple-choice' ? options : [],
        artifact: selectedArtifacts.map((artifact) => ({
          arttId: artifact._id,
          artUrl: artifact.url,
          artType: artifact.mimetype,
        })),
      };

      await createQuestion('studyId-placeholder', questionData); // Replace 'studyId-placeholder' with actual studyId logic
      setSuccessMessage('Question added successfully!');
      setQuestionText('');
      setOptions(['']);
      setSelectedArtifacts([]);
      setQuestionType('multiple-choice');
    } catch (err) {
      console.error('Error creating question:', err);
      setError('Failed to create question. Please try again.');
    }
  };

  const renderArtifactContent = (artifact) => {
    if (!artifact.mimetype) {
      return <p>Unknown artifact type</p>;
    }

    if (artifact.mimetype.startsWith('image/')) {
      return <img src={artifact.url} alt={artifact.filename} style={{ maxWidth: '100px', maxHeight: '100px' }} />;
    } else if (artifact.mimetype === 'text/plain') {
      return <iframe src={artifact.url} title={artifact.filename} style={{ width: '100px', height: '100px' }} />;
    } else if (artifact.mimetype.startsWith('audio/')) {
      return (
        <audio controls>
          <source src={artifact.url} type={artifact.mimetype} />
          Your browser does not support the audio element.
        </audio>
      );
    } else if (artifact.mimetype.startsWith('video/')) {
      return (
        <video controls width="100px" height="100px">
          <source src={artifact.url} type={artifact.mimetype} />
          Your browser does not support the video tag.
        </video>
      );
    } else {
      return (
        <a href={artifact.url} download={artifact.filename}>
          Download {artifact.filename}
        </a>
      );
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {error && <p className={`${styles.message} ${styles.error}`}>{error}</p>}
        {successMessage && <p className={`${styles.message} ${styles.success}`}>{successMessage}</p>}
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
        {questionType === 'multiple-choice' && (
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
          <div className={styles.artifactContainer}>
            <ul className={styles.artifactList}>
              {artifacts.map((artifact) => (
                <li key={artifact._id} className={styles.artifactItem}>
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedArtifacts.includes(artifact)}
                      onChange={() => toggleArtifactSelection(artifact)}
                    />
                    <div>
                      <p><strong>Name:</strong> {artifact.filename ? artifact.filename.replace(/\.[^/.]+$/, '') : 'Unknown'}</p>
                      <p><strong>Type:</strong> {artifact.mimetype || 'Unknown'}</p>
                      {renderArtifactContent(artifact)}
                    </div>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <button onClick={handleCreateQuestion} className={styles.submitButton}>
          Add Question
        </button>
      </div>
    </div>
  );
}

export default QuestionsCard;

