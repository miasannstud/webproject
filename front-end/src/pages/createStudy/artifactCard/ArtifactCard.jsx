import { useState, useEffect, useRef, useCallback } from 'react';
import { fetchArtifactsByStudy, uploadArtifacts, deleteArtifact, renderArtifactContent } from '../../../services/ArtifactService';
import styles from './ArtifactCard.module.css';

function ArtifactApp({ onArtifactsChange, studyId, onSessionArtifactIdsChange }) {
  const [artifacts, setArtifacts] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [message, setMessage] = useState('');
  const [sessionArtifactIds, setSessionArtifactIds] = useState([]);
  const fileInputRef = useRef(null);

  const fetchArtifactsList = useCallback(async () => {
    if (!studyId) return;
    try {
      const data = await fetchArtifactsByStudy(studyId);
      setArtifacts(data);
      onArtifactsChange(data);
    } catch (error) {
      console.error('Error fetching artifacts:', error);
      setMessage("Couldn't fetch artifacts");
    }
  }, [onArtifactsChange, studyId]);

  useEffect(() => {
    fetchArtifactsList();
    if (onSessionArtifactIdsChange) {
      onSessionArtifactIdsChange(sessionArtifactIds);
    }
  }, [fetchArtifactsList, sessionArtifactIds, onSessionArtifactIdsChange]);

  const handleFileChange = (e) => {
    setSelectedFiles(Array.from(e.target.files));
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFiles || selectedFiles.length === 0) {
      setMessage('You must select at least one file to upload');
      return;
    }

    try {
      const res = await uploadArtifacts(selectedFiles, studyId);
      if (res && res.artifact && res.artifact._id) {
        setSessionArtifactIds(ids => [...ids, res.artifact._id]);
      }
      setMessage('Artifact(s) were uploaded');
      setSelectedFiles([]);
      fileInputRef.current.value = '';
      fetchArtifactsList();
    } catch (error) {
      console.error('Error uploading artifact(s):', error);
      setMessage('There was an error uploading the artifact(s)');
    }
  };

  const handleDelete = async (artifactId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this artifact?');
    if (!confirmDelete) return;

    try {
      await deleteArtifact(artifactId);
      setMessage('Artifact was deleted');
      setSessionArtifactIds(ids => ids.filter(id => id !== artifactId));
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
          <input id="fileInput" type="file" multiple onChange={handleFileChange} ref={fileInputRef} />
          {selectedFiles.length > 0 && (
            <ul className={styles.fileName}>
              {selectedFiles.map((file, idx) => (
                <li key={idx}>{file.name}</li>
              ))}
            </ul>
          )}
          <button type="submit">Upload</button>
        </form>
        <ul className={styles.artifactList}>
          {artifacts.map((artifact) => (
            <li key={artifact._id}>
              <p>
                Name: {artifact.filename ? artifact.filename.replace(/\.[^/.]+$/, '') : 'Unknown'}
              </p>
              <p>
                Type: {artifact.mimetype || 'Unknown'}
              </p>
              {renderArtifactContent(artifact)}
              
              <button className={styles.removeButton} onClick={() => handleDelete(artifact._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ArtifactApp;
