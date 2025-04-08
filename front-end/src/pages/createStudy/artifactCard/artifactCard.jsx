import { useState, useEffect, useRef } from 'react';
import styles from './artifactCard.module.css';

function ArtifactApp() {
    const [artifacts, setArtifacts] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [message, setMessage] = useState('');
    const fileInputRef = useRef(null);

    const fetchArtifacts = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/artifact');
            if (!response.ok) {
                throw new Error("Couldn't fetch artifacts");
            }
            const data = await response.json();
            setArtifacts(data);
        } catch (error) {
            console.error(error);
            setMessage("Couldn't fetch artifacts");
        }
    };

    useEffect(() => {
        fetchArtifacts();
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
        const formData = new FormData();
        formData.append('artifact', selectedFile);

        try {
            const response = await fetch('http://localhost:8080/api/artifact/upload', {
                method: 'POST',
                body: formData
            });
            if (!response.ok) {
                throw new Error("Couldn't upload artifact, try again");
            }
            setMessage('Artifact has been uploaded');
            setSelectedFile(null);
            fileInputRef.current.value = '';
            fetchArtifacts();
        } catch (error) {
            console.error(error);
            setMessage('There was an error uploading the artifact');
        }
    };

    const handleDelete = async (artifactId) => {
        try {
            const response = await fetch(`http://localhost:8080/api/artifact/${artifactId}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Delete failed');
            }
            setMessage('Artifact was deleted');
            fetchArtifacts();
        } catch (error) {
            console.error(error);
            setMessage('There was an error deleting the artifact');
        }
    };

    const renderArtifactContent = (artifact) => {
        if (!artifact.mimetype) {
            return <p>Unknown artifact type</p>; // Handle missing MIME type
        }

        if (artifact.mimetype.startsWith('image/')) {
            // Render image
            return <img src={artifact.url} alt={artifact.filename} style={{ maxWidth: '200px', maxHeight: '200px' }} />;
        } else if (artifact.mimetype === 'text/plain') {
            // Render text file
            return (
                <iframe src={artifact.url} title={artifact.filename} style={{ width: '300px', height: '200px' }} />
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
                <video controls width="300">
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
            <h1>Artifact Management</h1>
            {message && <p>{message}</p>}
            <form className={styles.uploadForm} onSubmit={handleUpload}>
                <label className={styles.customFileInput} htmlFor="fileInput">Choose File</label>
                <input id="fileInput" type="file" onChange={handleFileChange} ref={fileInputRef} />
                {selectedFile && <p className={styles.fileName}>{selectedFile.name}</p>}
                <button type="submit">Upload</button>
            </form>
            <h2>Uploaded Artifacts</h2>
            <ul className={styles.artifactList}>
                {artifacts.map((artifact) => (
                    <li key={artifact._id} className={styles.artifactCard}>
                        <p><strong>Name:</strong> {artifact.filename ? artifact.filename.replace(/\.[^/.]+$/, '') : 'Unknown'}</p>
                        <p><strong>Type:</strong> {artifact.mimetype || 'Unknown'}</p>
                        {renderArtifactContent(artifact)}
                        <br></br>
                        <button onClick={() => handleDelete(artifact._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ArtifactApp;
