import { API_BASE_URL } from '../config';

// create a new session for a study
export async function createSession(studyId, demographics) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/studies/${studyId}/sessions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ demographics }),
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error("Error creating session:", error);
    throw error;
  }
}

// fetch the session count for a given study
export async function fetchSessionCount(studyId) {
  try {
    const res = await fetch(
      `${API_BASE_URL}/api/studies/${studyId}/sessions/count`
    );
    if (!res.ok) {
      throw new Error(`HTTP error. status: ${res.status}`);
    }
    const data = await res.json();
    return data.count;
  } catch (error) {
    console.error("Error fetching session count:", error);
    throw error;
  }
}

// answer a specific question for a session in a study
export async function answerQuestions(studyId, sessionId, questionId, answers) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/studies/${studyId}/sessions/${sessionId}/answers/${questionId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ answers }),
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error("Error answering questions:", error);
    throw error;
  }
}