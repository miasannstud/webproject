// const API_BASE_URL = 'http://localhost:8080/api';
const API_BASE_URL = window.location.hostname === 'localhost' ? 'http://localhost:8080/api' : 'https://group6.sustainability.it.ntnu.no/api';

export async function uploadArtifacts(files, studyId) {
  const formData = new FormData();
  for (const file of files) {
    formData.append('artifact', file);
  }
  formData.append('studyId', studyId);

  try {
    const res = await fetch(`${API_BASE_URL}/artifact/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) {
      throw new Error(`HTTP error. status: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error('Error uploading artifact:', error);
    throw error;
  }
}

export async function fetchArtifacts() {
  try {
    const res = await fetch(`${API_BASE_URL}/artifact`);
    if (!res.ok) {
      throw new Error(`HTTP error. status: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error('Error fetching artifacts:', error);
    throw error;
  }
}

export async function fetchArtifactsByStudy(studyId) {
  try {
    const res = await fetch(`${API_BASE_URL}/artifact/study/${studyId}`);
    if (!res.ok) {
      throw new Error(`HTTP error. status: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error('Error fetching artifacts:', error);
    throw error;
  }
}

export async function deleteArtifact(artifactId) {
  try {
    const res = await fetch(`${API_BASE_URL}/artifact/${artifactId}`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      throw new Error(`HTTP error. status: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error('Error deleting artifact:', error);
    throw error;
  }
}

export function renderArtifactContent(artifact) {
  const mimetype = artifact.mimetype;
  if (!mimetype) {
    return <p>Unknown artifact type</p>;
  }

  if (mimetype.startsWith('image/')) {
    return <img src={artifact.url || artifact.artUrl} alt={artifact.filename} style={{ maxWidth: '100px', maxHeight: '100px' }} />;
  } else if (mimetype === 'text/plain') {
    return <iframe src={artifact.url || artifact.artUrl} title={artifact.filename} style={{ width: '100px', height: '100px' }} />;
  } else if (mimetype.startsWith('audio/')) {
    return (
      <audio controls>
        <source src={artifact.url || artifact.artUrl} type={mimetype} />
        Your browser does not support the audio element.
      </audio>
    );
  } else if (mimetype.startsWith('video/')) {
    return (
      <video controls width="100px" height="100px">
        <source src={artifact.url || artifact.artUrl} type={mimetype} />
        Your browser does not support the video tag.
      </video>
    );
  } else {
    return (
      <a href={url} download={filename} target="_blank" rel="noopener noreferrer">
        Download {filename} ({mimetype})
      </a>
    );
  }
}