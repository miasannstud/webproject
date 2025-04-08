const API_BASE_URL = 'http://localhost:8080/api';

export async function fetchSessionCount(studyId) {;
    try {
      const res = await fetch(`${API_BASE_URL}/studies/${studyId}/sessions/count`);
      if (!res.ok) {
        throw new Error(`HTTP error. status: ${res.status}`);
      }
      const data = await res.json();
      return data.count;
    } catch (error) {
      console.error('Error fetching session count:', error);
      throw error;
    }
  }
  