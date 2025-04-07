// studyService.js:
// This file is your API service layer. 
// It contains functions that make raw API calls (e.g., using fetch). 
// These functions focus solely on communicating with the backend (e.g., fetchStudies(), deleteStudy(id), etc.).

// need to read on this, i understand it but i want to know if it is neccesary
// const API_BASE_URL = import.meta.env.VITE_API_URL;
const API_BASE_URL = 'http://localhost:8080/api';

export async function fetchStudies() {
    try {
        const res = await fetch(`${API_BASE_URL}/studies`);
        // const res = await fetch('http://localhost:8080/api/studies');
        if (!res.ok) {
            throw new Error(`HTTP error. status: ${res.status}`);
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error fetching studies:', error);
        throw error;
    }
}

export async function deleteStudy(_id) {
    try {
        const res = await fetch(`${API_BASE_URL}/studies/${_id}`, {
            method: 'DELETE',
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

// add more functions later, like createStudy, editStudy, osv..