// this is the container component for the results page
// It will render the ResultsCard component, passing the study data as props

import { useParams } from 'react-router-dom';
import useFetchSingleStudy from '../../hooks/useFetchSingleStudy';
import ResultsCard from './ResultsCard';
import styles from './ResultsPage.module.css';

function ResultsPage() {
    const { studyId } = useParams();
    const { study, loading, error } = useFetchSingleStudy(studyId);

    if (loading) return <div className={styles.loading}>Loading...</div>;
    if (error) return <div className={styles.error}>Error: {error.message}</div>;

    return (
        <div className={styles.resultsContainer}>
            {study ? <h1>{study.studyTitle} results</h1> : <h1>Study Results</h1>}
            <div className={styles.cardsContainer}>
                {study ? <ResultsCard study={study} /> : <p>No study data found</p>}
            </div>
        </div>
    );
}

export default ResultsPage;