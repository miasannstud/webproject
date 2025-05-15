import express from "express";
import artifactController from "../controllers/artifactController.js";
import uploadMiddleware from "../middelware/uploadMiddleware.js";
import path from "path";

/* for puppeteer */
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
/* normal code below */

const router = express.Router();

router.post("/upload", (req, res) => {
  uploadMiddleware(req, res, function (err) {
    if (err) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res
          .status(400)
          .json({ error: "File is too large. Max size is 10MB." });
      }
      return res.status(400).json({ error: err.message });
    }
    artifactController.uploadArtifacts(req, res);
  });
});

router.get("/", async (req, res) => {
  try {
    const artifacts = await artifactController.getAllArtifacts(); // Use the new method
    res.json(artifacts);
  } catch (error) {
    console.error("Error retrieving artifacts:", error.message);
    res.status(500).json({ message: "Error retrieving artifacts" });
  }
});

router.get("/study/:studyId", artifactController.getArtifactsByStudy);

router.delete("/:id", artifactController.deleteArtifact);

router.patch("/:artifactId/study", artifactController.updateArtifactStudyId);

router.get("/:filename", async (req, res) => {
  const artifactPath = path.join(__dirname, "../uploads", req.params.filename);
  res.sendFile(artifactPath);
});

export default router;
