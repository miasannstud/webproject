// studyService.js:
// This file is your API service layer. 
// It contains functions that make raw API calls (e.g., using fetch). 
// These functions focus solely on communicating with the backend (e.g., fetchStudies(), deleteStudy(id), etc.).

// this is nice because if the API URL ever changes, we only have to update it in one place
const API_BASE_URL = 'http://localhost:8080/api';

// STUDY ROUTES

// for retrieving all studies
export async function fetchStudies() {
  try {
    const res = await fetch(`${API_BASE_URL}/studies`);
    if (!res.ok) {
      throw new Error(`HTTP error. status: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error('Error fetching studies:', error);
    throw error;
  }
}

// for retrieving a specific study
export async function getStudyById(studyId) {
  try {
    const res = await fetch(`${API_BASE_URL}/studies/${studyId}`);
    if (!res.ok) {
      throw new Error(`HTTP error. status: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error('Error fetching study by id:', error);
    throw error;
  }
}

// for creating a study
export async function createStudy(studyData) {
  try {
    const res = await fetch(`${API_BASE_URL}/studies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(studyData)
    });
    if (!res.ok) {
      throw new Error(`HTTP error. status: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error('Error creating study:', error);
    throw error;
  }
}

// for updating a study
export async function updateStudy(studyId, studyData) {
  try {
    const res = await fetch(`${API_BASE_URL}/studies/${studyId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(studyData)
    });
    if (!res.ok) {
      throw new Error(`HTTP error. status: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error('Error updating study:', error);
    throw error;
  }
}

// for deleting a study
export async function deleteStudy(studyId) {
  try {
    const res = await fetch(`${API_BASE_URL}/studies/${studyId}`, {
      method: 'DELETE'
    });
    if (!res.ok) {
      throw new Error(`HTTP error. status: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error('Error deleting study:', error);
    throw error;
  }
}

// for marking/updating a study as published
export async function publishStudy(studyId, publishData) {
  try {
    const res = await fetch(`${API_BASE_URL}/studies/${studyId}/public`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(publishData)
    });
    if (!res.ok) {
      throw new Error(`HTTP error. status: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error('Error publishing study:', error);
    throw error;
  }
}

// for getting a link for a study, for participants
export async function getStudyLink(studyId) {
  try {
    const res = await fetch(`${API_BASE_URL}/studies/${studyId}/studyUrl`);
    if (!res.ok) {
      throw new Error(`HTTP error. status: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error('Error getting study link:', error);
    throw error;
  }
}

// for downloading session data from a study
export async function downloadStudyData(studyId) {
  try {
    const res = await fetch(`${API_BASE_URL}/studies/${studyId}/sessions/download`);
    if (!res.ok) {
      throw new Error(`HTTP error. status: ${res.status}`);
    }
    // For file downloads, you might handle the response as a blob:
    return await res.blob();
  } catch (error) {
    console.error('Error downloading study data:', error);
    throw error;
  }
}

// QUESTION ROUTES

// for creating a question
export async function createQuestion(studyId, questionData) {
  try {
    const res = await fetch(`${API_BASE_URL}/studies/${studyId}/questions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(questionData)
    });
    if (!res.ok) {
      throw new Error(`HTTP error. status: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error('Error creating question:', error);
    throw error;
  }
}

// for updating a question
export async function updateQuestion(studyId, questionId, questionData) {
  try {
    const res = await fetch(`${API_BASE_URL}/studies/${studyId}/questions/${questionId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(questionData)
    });
    if (!res.ok) {
      throw new Error(`HTTP error. status: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error('Error updating question:', error);
    throw error;
  }
}

// for deleting a question
export async function deleteQuestion(studyId, questionId) {
  try {
    const res = await fetch(`${API_BASE_URL}/studies/${studyId}/questions/${questionId}`, {
      method: 'DELETE'
    });
    if (!res.ok) {
      throw new Error(`HTTP error. status: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error('Error deleting question:', error);
    throw error;
  }
}


// The function parameters (studyId, questionId, questionData) in your updateQuestion function are meant to identify 
// which study and which question to update, and to carry the new data, respectively. The names of these parameters themselves 
// don't need to match the field names in your schema. What matters is that the properties inside the questionData object align
// with your schema's field names.
// When you call updateQuestion, ensure that the questionData object contains keys that match these names
// if you're trying to update them. For instance:
// const updatedData = {
//     questionText: 'Updated question text',
//     questionType: 'multiple-choice',
//     // add other fields as needed, e.g., artifact, options
//   };
  
//   updateQuestion(studyId, questionId, updatedData);
