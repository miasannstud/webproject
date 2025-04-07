import { useState, useEffect } from "react";
import { getStudyById } from "../services/studyService";

function useFetchSingleStudy(studyId) {
    const [study, setStudy] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!studyId) return;

        async function fetchStudy() {
            try {
                const data = await getStudyById(studyId);
                console.log('Fetched study:', data);
                setStudy(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }
        fetchStudy();
    }, [studyId]);

    return { study, loading, error };
}

export default useFetchSingleStudy;