import styles from './DashCard.module.css';
import { deleteStudy, getStudyLink, publishStudy } from '../../services/studyService';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function DashCard({ study, onStudyDeleted }) {
    const navigate = useNavigate();
    const { _id, studyTitle, published } = study;
    const [isPublished, setIsPublished] = useState(published);

    // navigate to the edit page
    async function handleEdit() {
        navigate(`/editStudy/${_id}`);
    }

    // navigate to the results page
    async function handleResults() {
        navigate(`/results/${_id}`);
    }

    // delete the study and notify the parent component
    async function handleDelete() {
        if (window.confirm(`Are you sure you want to delete "${studyTitle}"?`)) {
            try {
                await deleteStudy(_id);
                alert('Study deleted');
                // call the callback to update the parent components state
                if (onStudyDeleted) {
                    onStudyDeleted(_id);
                }
            } catch (error) {
                console.error('Error deleting study:', error);
                alert('Failed to delete study');
            }
        }
    }

    // get the link that participant will need to take the study
    async function handleGetLink() {
        try {
            const data = await getStudyLink(_id);
            const { studyUrl } = data;
            // copy the link to clipboard
            await navigator.clipboard.writeText(studyUrl);
            alert(`Study link copied to clipboard:\n${studyUrl}`);
        } catch (error) {
            console.error("Error getting study link:", error);
            alert("Failed to retrieve study link. Try again.");
        }
    }

    // toggle published state
    async function handlePublish() {
        const next = !isPublished;
        setIsPublished(next);
        try {
            await publishStudy(_id, { published: next });
        } catch (error) {
            setIsPublished(!next);
            console.error('Error toggling publish state:', error);
        }
    }

    return (
        <div className={styles.card}>
            <h2>{studyTitle}</h2>
            <p>Status: {isPublished ? 'Published' : 'Unpublished'}</p>
            <div className={styles.actions}>
                <button onClick={handleEdit}>Edit</button>
                <button data-testid="dashcard-results" onClick={handleResults}>Results</button>
                <button data-testid="dashcard-delete" onClick={handleDelete}>Delete</button>
                <button data-testid="dashcard-getlink" onClick={handleGetLink}>Get Link</button>
                <button data-testid="dashcard-publish" onClick={handlePublish}>
                    {isPublished ? 'Unpublish' : 'Publish'}
                </button>
            </div>
        </div>
    );
}

export default DashCard;