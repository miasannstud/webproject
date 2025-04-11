import { useState, useEffect, useRef, useCallback } from 'react';
import { fetchArtifacts, uploadArtifact, deleteArtifact, renderArtifactContent } from '../../../services/ArtifactService';
import styles from './ArtifactCard.module.css';

function ArtifactApp({ onArtifactsChange }) {
  const [artifacts, setArtifacts] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState('');
  const fileInputRef = useRef(null);

  const fetchArtifactsList = useCallback(async () => {
    try {
      const data = await fetchArtifacts();
      setArtifacts(data);
      onArtifactsChange(data); 
    } catch (error) {
      console.error('Error fetching artifacts:', error);
      setMessage("Couldn't fetch artifacts");
    }
  }, [onArtifactsChange]);

  useEffect(() => {
    fetchArtifactsList();
  }, [fetchArtifactsList]);

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
      await uploadArtifact(selectedFile);
      setMessage('Artifact has been uploaded');
      setSelectedFile(null);
      fileInputRef.current.value = '';
      fetchArtifactsList();
    } catch (error) {
      console.error('Error uploading artifact:', error);
      setMessage('There was an error uploading the artifact');
    }
  };

  const handleDelete = async (artifactId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this artifact?');
    if (!confirmDelete) return;

    try {
      await deleteArtifact(artifactId);
      setMessage('Artifact was deleted');
      fetchArtifactsList(); 
    } catch (error) {
      console.error('Error deleting artifact:', error);
      setMessage('There was an error deleting the artifact');
    }
  };

  return (
    <div className={styles.artifactContainer}>
      <div className={styles.artifactCard}>
        <h2>Upload Artifacts</h2>
        {message && <p className={styles.message}>{message}</p>}
        <form className={styles.uploadForm} onSubmit={handleUpload}>
          <label className={styles.customFileInput} htmlFor="fileInput">
            Choose File
          </label>
          <input id="fileInput" type="file" onChange={handleFileChange} ref={fileInputRef} />
          {selectedFile && <p className={styles.fileName}>{selectedFile.name}</p>}
          <button type="submit">Upload</button>
        </form>
        <ul className={styles.artifactList}>
          {artifacts.map((artifact) => (
            <li key={artifact._id}>
              <p>
                <strong>Name:</strong> {artifact.filename ? artifact.filename.replace(/\.[^/.]+$/, '') : 'Unknown'}
              </p>
              <p>
                <strong>Type:</strong> {artifact.mimetype || 'Unknown'}
              </p>
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
