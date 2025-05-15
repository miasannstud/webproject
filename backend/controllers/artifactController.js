import Artifact from "../models/artifactSchema.js";
import fs from "fs";

export const uploadArtifacts = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No artifact uploaded" });
    }

    const { studyId } = req.body;

    const savedArtifacts = [];
    for (const file of req.files) {
      const artifactData = new Artifact({
        filename: file.originalname,
        mimetype: file.mimetype,
        path: file.path,
        size: file.size,
        url: `http://localhost:8286/uploads/${file.filename}`,
        studyId: studyId || null,
      });
      await artifactData.save();
      savedArtifacts.push(artifactData);
    }

    res
      .status(201)
      .json({
        message: "Artifacts uploaded successfully",
        artifacts: savedArtifacts,
      });
  } catch (err) {
    console.error("Error uploading artifact:", err.message);
    res.status(500).json({ error: err.message });
  }
};

export const retrieveArtifact = async (req, res) => {
  try {
    console.log("Fetching artifacts from the database...");
    const artifacts = await Artifact.find();
    console.log("Artifacts retrieved:", artifacts);
    res.status(200).json(artifacts);
  } catch (err) {
    console.error("Error retrieving artifacts:", err.message);
    res.status(500).json({ error: "Failed to retrieve artifacts" });
  }
};

export const deleteArtifact = async (req, res) => {
  try {
    const artifact = await Artifact.findByIdAndDelete(req.params.id);

    if (!artifact)
      return res.status(404).json({ message: "Artifact not found" });

    fs.unlink(artifact.path, (err) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({
            error:
              "Error: Metadata wiped from server, but artifact could not be deleted from disk",
          });
      }
      res.json({ message: "Artifact has been deleted" });
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllArtifacts = async () => {
  try {
    const artifacts = await Artifact.find();
    return artifacts;
  } catch (err) {
    console.error("Error fetching artifacts:", err.message);
    throw new Error("Failed to fetch artifacts");
  }
};

// Add a new controller to get artifacts by studyId
export const getArtifactsByStudy = async (req, res) => {
  try {
    const { studyId } = req.params;
    const artifacts = await Artifact.find({ studyId });
    res.status(200).json(artifacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add a new controller to update an artifact's studyId
export const updateArtifactStudyId = async (req, res) => {
  try {
    const { artifactId } = req.params;
    const { studyId } = req.body;
    console.log("PATCH artifactId:", artifactId, "with studyId:", studyId);
    if (!studyId) {
      return res.status(400).json({ message: "Missing studyId" });
    }
    const artifact = await Artifact.findByIdAndUpdate(
      artifactId,
      { studyId },
      { new: true }
    );
    if (!artifact) {
      return res.status(404).json({ message: "Artifact not found" });
    }
    res.status(200).json({ message: "Artifact updated", artifact });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default {
  uploadArtifacts,
  retrieveArtifact,
  deleteArtifact,
  getAllArtifacts,
  getArtifactsByStudy,
  updateArtifactStudyId,
};
