const API_BASE_URL = 'http://localhost:8080/api';

export async function uploadArtifact(file) {
  const formData = new FormData();
  formData.append('artifact', file);

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

export function getArtifactContent(artifact) {
  if (!artifact.mimetype) {
    return { type: 'unknown', content: 'Unknown artifact type' };
  }

  if (artifact.mimetype.startsWith('image/')) {
    return { type: 'image', url: artifact.url, alt: artifact.filename };
  } else if (artifact.mimetype === 'text/plain') {
    return { type: 'text', url: artifact.url, title: artifact.filename };
  } else if (artifact.mimetype.startsWith('audio/')) {
    return { type: 'audio', url: artifact.url, mimetype: artifact.mimetype };
  } else if (artifact.mimetype.startsWith('video/')) {
    return { type: 'video', url: artifact.url, mimetype: artifact.mimetype };
  } else {
    return { type: 'download', url: artifact.url, filename: artifact.filename };
  }
}
