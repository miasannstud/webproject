import { useState, useEffect } from "react";
import { fetchSessionCount } from "../services/sessionService";

function useFetchSessionCount(studyId) {
  const [sessionCount, setSessionCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!studyId) return;

    async function loadSessionCount() {
      try {
        const count = await fetchSessionCount(studyId);
        setSessionCount(count);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    loadSessionCount();
  }, [studyId]);

  return { sessionCount, loading, error };
}

export default useFetchSessionCount;
