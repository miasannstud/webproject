import { useState, useEffect, useRef } from 'react';
import styles from './artifactCard.module.css';
import { fetchArtifacts, uploadArtifact, deleteArtifact } from '../../../services/artifactService';

function ArtifactApp() {
    const [artifacts, setArtifacts] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [message, setMessage] = useState('');
    const fileInputRef = useRef(null);

    const fetchArtifactsList = async () => {
        try {
            const data = await fetchArtifacts(); // Fetch artifacts using the service
            setArtifacts(data);
        } catch (error) {
            console.error('Error fetching artifacts:', error);
            setMessage("Couldn't fetch artifacts");
        }
    };

    useEffect(() => {
        fetchArtifactsList();
    }, []);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!selectedFile) {
            setMessage('You must select a file to upload');
            return;
        }

        try {
            await uploadArtifact(selectedFile); // Upload artifact using the service
            setMessage('Artifact has been uploaded');
            setSelectedFile(null);
            fileInputRef.current.value = '';
            fetchArtifactsList(); // Refresh the artifact list
        } catch (error) {
            console.error('Error uploading artifact:', error);
            setMessage('There was an error uploading the artifact');
        }
    };

    const handleDelete = async (artifactId) => {
        try {
            await deleteArtifact(artifactId); // Delete artifact using the service
            setMessage('Artifact was deleted');
            fetchArtifactsList(); // Refresh the artifact list
        } catch (error) {
            console.error('Error deleting artifact:', error);
            setMessage('There was an error deleting the artifact');
        }
    };

    const renderArtifactContent = (artifact) => {
        if (!artifact.mimetype) {
            return <p>Unknown artifact type</p>; // Handle missing MIME type
        }

        if (artifact.mimetype.startsWith('image/')) {
            // Render image
            return <img src={artifact.url} alt={artifact.filename} style={{ maxWidth: '100px', maxHeight: '100px' }} />;
        } else if (artifact.mimetype === 'text/plain') {
            // Render text file
            return (
                <iframe src={artifact.url} title={artifact.filename} style={{ width: '100px', height: '100px' }} />
            );
        } else if (artifact.mimetype.startsWith('audio/')) {
            return (
                <audio controls>
                    <source src={artifact.url} type={artifact.mimetype} />
                    Your browser does not support the audio element.
                </audio>
            );
        } else if (artifact.mimetype.startsWith('video/')) {
            return (
                <video controls width="100px" height="100px">
                    <source src={artifact.url} type={artifact.mimetype} />
                    Your browser does not support the video tag.
                </video>
            );
        } else {
            return (
                <a href={artifact.url} download={artifact.filename}>
                    Download {artifact.filename}
                </a>
            );
        }
    };

    return (
        <div className={styles.artifactContainer}>
            <div className={styles.artifactCard}>
                <h2>Upload Artifacts</h2>
                {message && <p className={styles.message}>{message}</p>}
                <form className={styles.uploadForm} onSubmit={handleUpload}>
                    <label className={styles.customFileInput} htmlFor="fileInput">Choose File</label>
                    <input id="fileInput" type="file" onChange={handleFileChange} ref={fileInputRef} />
                    {selectedFile && <p className={styles.fileName}>{selectedFile.name}</p>}
                    <button type="submit">Upload</button>
                </form>
                <ul className={styles.artifactList}>
                    {artifacts.map((artifact) => (
                        <li key={artifact._id}>
                            <p><strong>Name:</strong> {artifact.filename ? artifact.filename.replace(/\.[^/.]+$/, '') : 'Unknown'}</p>
                            <p><strong>Type:</strong> {artifact.mimetype || 'Unknown'}</p>
                            {renderArtifactContent(artifact)}
                            <br />
                            <button onClick={() => handleDelete(artifact._id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default ArtifactApp;
