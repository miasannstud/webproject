// src/hooks/participant/useParticipantStudy.js
import { useState, useEffect } from 'react';
import { getParticipantStudy } from '../services/studyService';

function useParticipantStudy(studyId) {
  const [study, setStudy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!studyId) return;
    async function fetchStudy() {
      try {
        const data = await getParticipantStudy(studyId);
        setStudy(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    fetchStudy();
  }, [studyId]);

  return { study, loading, error };
}

export default useParticipantStudy;
