import { API_BASE_URL } from '../config';

export async function uploadArtifacts(files, studyId) {
  const formData = new FormData();
  for (const file of files) {
    formData.append("artifact", file);
  }
  formData.append("studyId", studyId);

  try {
    const res = await fetch(`${API_BASE_URL}/api/artifact/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) {
      throw new Error(`HTTP error. status: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error uploading artifact:", error);
    throw error;
  }
}

export async function fetchArtifacts() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/artifact`);
    if (!res.ok) {
      throw new Error(`HTTP error. status: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error("Error fetching artifacts:", error);
    throw error;
  }
}

export async function fetchArtifactsByStudy(studyId) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/artifact/study/${studyId}`);
    if (!res.ok) {
      throw new Error(`HTTP error. status: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error("Error fetching artifacts:", error);
    throw error;
  }
}

export async function deleteArtifact(artifactId) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/artifact/${artifactId}`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      throw new Error(`HTTP error. status: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error deleting artifact:", error);
    throw error;
  }
}

export function renderArtifactContent(artifact) {
  const mimetype = artifact.mimetype;
  if (!mimetype) {
    return <p>Unknown artifact type</p>;
  }

  if (mimetype.startsWith("image/")) {
    return (
      <img
        src={artifact.url || artifact.artUrl}
        alt={artifact.filename}
        style={{ width: "7vw", height: "auto" }}
      />
    );
  } else if (mimetype === "text/plain") {
    return (
      <iframe
        src={artifact.url || artifact.artUrl}
        title={artifact.filename}
        style={{ width: "7vw", height: "auto" }}
      />
    );
  } else if (mimetype.startsWith("audio/")) {
    return (
      <audio controls>
        <source
          src={artifact.url || artifact.artUrl}
          type={mimetype}
          style={{ width: "7vw", height: "auto" }}
        />
        Your browser does not support the audio element.
      </audio>
    );
  } else if (mimetype.startsWith("video/")) {
    return (
      <video controls style={{ width: "7vw", height: "auto" }}>
        <source src={artifact.url || artifact.artUrl} type={mimetype} />
        Your browser does not support the video tag.
      </video>
    );
  }
  return <p>Unknown artifact type</p>;
}
