

import { useState } from 'react';
import './study.css'; // Import the custom CSS file

const dummyStudies = [
  {
    _id: '1',
    title: 'Institute of design Survey',
    description: 'Help us make the department better.',
    duration: 7,
    questions: [
      {
        _id: 'q1',
        questionText: 'What comes to mind when you see our logo?',
        type: 'text',
        options: []
      },
      {
        _id: 'q2',
        questionText: 'Rate your trust in our brand (1-5)',
        type: 'rating',
        options: []
      },
      {
        _id: 'q3',
        questionText: 'Which of these values do you associate with us?',
        type: 'multiple-choice',
        options: ['Innovation', 'Trust', 'Affordability']
      }
    ]
  }
];

const StudySession = () => {
  const [step, setStep] = useState('welcome');
  const [demographics, setDemographics] = useState({ age: '', gender: '', role: '' });
  const [selectedStudy, setSelectedStudy] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [consentGiven, setConsentGiven] = useState(false);


  const startSession = () => {
    if (!consentGiven) return alert('Please provide consent to continue.');
    setStep('demographics');
  };

  const handleDemographicsSubmit = (e) => {
    e.preventDefault();
    setStep('selectStudy');
  };

  const selectStudy = (study) => {
    setSelectedStudy(study);
    const initialAnswers = study.questions.map((q) => ({ questionId: q._id, response: '' }));
    setAnswers(initialAnswers);
    setStep('answerStudy');
  };

  const handleAnswerChange = (index, value) => {
    const updated = [...answers];
    updated[index].response = value;
    setAnswers(updated);
  };

  const submitStudy = () => {
    const sessionData = {
      studyId: selectedStudy._id,
      demographics,
      answers,
      createdAt: new Date()
    };
    console.log(studyId)
    
    console.log('Session Submitted:', sessionData);
    alert('Thank you for completing the study!');
    setStep('welcome');
    setDemographics({ age: '', gender: '', role: '' });
    setSelectedStudy(null);
    setAnswers([]);
    setConsentGiven(false);
  };

  return (
    <div className="study-session-container">
      {step === 'welcome' && (
        <div>
          <h1 className="title">Welcome to Our Research Portal</h1>
          <p className="description">We conduct short studies to learn about your thoughts and preferences. Your input helps shape our future decisions. Thank you for participating!</p>
          <div className="consent-checkbox">
            <input
              type="checkbox"
              checked={consentGiven}
              onChange={(e) => setConsentGiven(e.target.checked)}
              className="checkbox"
            />
            <label>I consent to participate in this research.</label>
          </div>
          <button
            onClick={startSession}
            className="start-button"
          >
            Start
          </button>
        </div>
      )}

      {step === 'demographics' && (
        <form onSubmit={handleDemographicsSubmit} className="demographics-form">
          <h2 className="form-title">Demographic Info</h2>
          <input
            type="number"
            placeholder="Age"
            value={demographics.age}
            onChange={(e) => setDemographics({ ...demographics, age: e.target.value })}
            className="input-field"
            required
          />
          <select
            value={demographics.gender}
            onChange={(e) => setDemographics({ ...demographics, gender: e.target.value })}
            className="input-field"
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <input
            type="text"
            placeholder="role"
            value={demographics.role}
            onChange={(e) => setDemographics({ ...demographics, role: e.target.value })}
            className="input-field"
          />
          <button
            type="submit"
            className="continue-button"
          >
            Continue
          </button>
        </form>
      )}

      {step === 'selectStudy' && (
        <div>
          <h2 className="form-title">Choose a Study</h2>
          {dummyStudies.map((study) => (
            <div
              key={study._id}
              className="study-card"
              onClick={() => selectStudy(study)}
            >
              <h3 className="study-title">{study.title}</h3>
              <p className="study-description">{study.description}</p>
            </div>
          ))}
        </div>
      )}

      {step === 'answerStudy' && (
        <div>
          <h2 className="form-title">{selectedStudy.title}</h2>
          {selectedStudy.questions.map((q, index) => (
            <div key={q._id} className="question">
              <label className="question-text">{q.questionText}</label>
              {q.type === 'text' && (
                <input
                  type="text"
                  className="input-field"
                  value={answers[index].response}
                  onChange={(e) => handleAnswerChange(index, e.target.value)}
                />
              )}
              {q.type === 'rating' && (
                <select
                  className="input-field"
                  value={answers[index].response}
                  onChange={(e) => handleAnswerChange(index, e.target.value)}
                >
                  <option value="">Select Rating</option>
                  {[1, 2, 3, 4, 5].map((val) => (
                    <option key={val} value={val}>{val}</option>
                  ))}
                </select>
              )}
              {q.type === 'multiple-choice' && (
                <select
                  className="input-field"
                  value={answers[index].response}
                  onChange={(e) => handleAnswerChange(index, e.target.value)}
                >
                  <option value="">Choose an option</option>
                  {q.options.map((opt, i) => (
                    <option key={i} value={opt}>{opt}</option>
                  ))}
                </select>
              )}
            </div>
          ))}
          <button
            onClick={submitStudy}
            className="submit-button"
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default StudySession;
