// src/hooks/participant/useParticipantNavigation.js
import { useState } from 'react';

function useParticipantNavigation(initialStep = 0) {
  const [currentStep, setCurrentStep] = useState(initialStep);

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => (prev > 0 ? prev - 1 : 0));
  const goToStep = (step) => setCurrentStep(step);

  return { currentStep, nextStep, prevStep, goToStep };
}

export default useParticipantNavigation;
