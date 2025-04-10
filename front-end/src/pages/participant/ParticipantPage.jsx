// src/pages/participant/ParticipantPage.jsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useParticipantStudy from '../../hooks/useParticipantStudy';
import useParticipantNavigation from '../../hooks/useParticipantNavigation';
import TermsStep from './TermsStep';
import StudyOverview from './StudyOverview';
import DemographicsForm from './DemographicsForm';
import ParticipantQuestions from './ParticipantQuestions';
import { createSession } from '../../services/sessionService';
import styles from './ParticipantPage.module.css';

function ParticipantPage() {
  const { studyId } = useParams();
  const { study, loading, error } = useParticipantStudy(studyId);
  const { currentStep, nextStep, prevStep } = useParticipantNavigation(0);

  // Overall data collected in the wizard
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [demographics, setDemographics] = useState({ age: '', gender: '' });
  const [sessionData, setSessionData] = useState(null);
  const [questionAnswers, setQuestionAnswers] = useState([]); // each: { questionId, answer }

  // Handler for the Demographics step's Next button.
  async function handleDemographicsSubmit() {
    try {
      // Call the createSession endpoint using the demographics data
      const session = await createSession(studyId, demographics);
      setSessionData(session);
      // Move to the next step after successful session creation
      nextStep();
    } catch (error) {
      console.error('Error creating session:', error);
      alert('Error creating session. Please try again.');
    }
  }

  // Handler for final submission
  function handleSubmit() {
    const participantData = {
      questionAnswers,
    };
    console.log("Submitting participant data:", participantData);
    // Here, you might call the createSession endpoint and then answerQuestions for each question.
    alert("Study submitted! (Placeholder)");
  }

  // Render the current step
  function renderStep() {
    if (loading) return <div>Loading study...</div>;
    if (error) return <div>Error loading study: {error.message}</div>;

    switch (currentStep) {
      case 0:
        return (
          <TermsStep 
            agreeTerms={agreeTerms} 
            onTermsChange={setAgreeTerms} 
          />
        );
      case 1:
        return <StudyOverview study={study} />;
      case 2:
        return (
          <DemographicsForm 
            demographics={demographics} 
            onChange={setDemographics}
            onSubmit={handleDemographicsSubmit}
          />
        );
      case 3:
        return (
        <ParticipantQuestions 
        questions={study.questions} 
        sessionData={sessionData} 
        studyId={studyId}
      />
        );
      default:
        return <div>Unknown step</div>;
    }
  }

  return (
<div className={styles.participantContainer}>
{renderStep()}
<div className={styles.navigationButtons}>
  {/* Show Back button for steps > 0 */}
  {currentStep === 1 && (
    <button onClick={prevStep}>Back</button>
  )}
  {/* For all steps except Demographics (step 2) */}
  {currentStep < 3 && currentStep !== 2 && (
    <button 
      onClick={nextStep} 
      disabled={currentStep === 0 && !agreeTerms}
    >
      Next
    </button>
  )}
</div>
</div>
);
}

export default ParticipantPage;
