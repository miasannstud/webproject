// useFetchStudies.jsx (Custom Hook):
// This hook wraps around your service functions and handles the stateful logic. 
// It manages things like loading state, error handling, and storing the fetched data. 
// This way, you encapsulate the data fetching logic and make your component code cleaner.

import { useState, useEffect } from 'react';
import {fetchStudiesByResearcherId} from '../services/studyService';

function useFetchStudies() {
    const [studies, setStudies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadStudies() {
            try {
                const data = await fetchStudiesByResearcherId();
                setStudies(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }
        loadStudies();
    }, []);

    return { studies, loading, error };
}

export default useFetchStudies;