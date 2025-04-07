import React from 'react';
import styles from './DashCard.module.css';
import { deleteStudy } from '../../services/studyService';
import { useNavigate } from 'react-router-dom';

function DashCard({study, onStudyDeleted}) {
    const navigate = useNavigate();
    const {_id, text, published} = study;

    // navigate to the edit page
    async function handleEdit() {
        navigate(`/edit/${_id}`);
    }

    // navigate to the results page
    async function handleResults() {
        navigate(`/results/${_id}`);
    }

    // delete the study and notify the parent component
    async function handleDelete() {
        if (window.confirm(`Are you sure you want to delete "${text}"?`)) {
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

    // i think what to do here is to get a link that will be used to display the study for the participants
    function handleGetLink() {
        // some stuff
    }

    return (
        <div className={styles.card}>
            <h2>{text}</h2>
            <p>Published: {published.toString()}</p>
            <div className={styles.actions}>
                <button onClick={handleEdit}>Edit</button>
                <button onClick={handleResults}>Results</button>
                <button onClick={handleDelete}>Delete</button>
                <button onClick={handleGetLink}>Get Link</button>
            </div>
        </div>
    );
}

export default DashCard;