import { useState } from 'react';
import { Routes, Route, useParams, useNavigate } from 'react-router-dom';

import useParticipantStudy from '../../hooks/useParticipantStudy';
import { createSession } from '../../services/sessionService';

import ConsentForm from './ConsentForm';
import DemographicsForm from './DemographicsForm';
import StudyOverview from './StudyOverview';
import ParticipantQuestions from './ParticipantQuestions';
import ThankYou from './ThankYou';

function ParticipantFlow() {
  const { studyId } = useParams();
  const navigate = useNavigate();

  const { study, loading, error } = useParticipantStudy(studyId);

  const [consent, setConsent] = useState(false);
  const [demographics, setDemographics] = useState({ age: '', gender: '' });
  const [sessionData, setSessionData] = useState(null);

  const handleConsentNext = () => {
    if (!consent) return;
    navigate(`/participant/${studyId}/demographics`);
  };

  const handleDemographicsSubmit = async () => {
    try {
      const session = await createSession(studyId, demographics);
      setSessionData(session);
      navigate(`/participant/${studyId}/info`);
    } catch (err) {
      console.error(err);
      alert('Failed to start session, please try again.');
    }
  };

  const handleOverviewNext = () => {
    navigate(`/participant/${studyId}/questions/0`);
  };

  const handleQuestionsComplete = () => {
    navigate(`/participant/${studyId}/thanks`);
  };

  if (loading) return <div>Loading…</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <Routes>
        <Route index element={
            <ConsentForm
              agreeConsent={consent}
              onConsentChange={setConsent}
              onNext={handleConsentNext}
              consentTitle={study.consent.title}
              consentAuthor={study.consent.author}
              consentSubtitle={study.consent.subtitle}
              consentText={study.consent.text}
            />
          }
        />

        <Route path="demographics" element={
          <DemographicsForm
            demographicsList={study.demographics || []}
            demographics={demographics}
            onChange={setDemographics}
            onSubmit={handleDemographicsSubmit}
          />
        }
        />

        <Route path="info" element={
          <StudyOverview
            study={study}
            onNext={handleOverviewNext}
          />
        }
        />

        <Route path="questions/:questionIndex" element={
          <ParticipantQuestions
            questions={study.questions}
            sessionData={sessionData}
            studyId={studyId}
            onComplete={handleQuestionsComplete}
          />
        }
        />

        <Route path="thanks" element={<ThankYou />} />
      </Routes>
    </div>
  );
}

export default ParticipantFlow;
