import express from 'express';
import artifactController from '../controllers/artifactController.js';
import uploadMiddleware from '../middelware/uploadMiddleware.js';
import path from 'path';
const router = express.Router();
router.post('/upload', uploadMiddleware, artifactController.uploadArtifact);

router.get('/', artifactController.retrieveArtifact);

router.delete('/:id', artifactController.deleteArtifact);

router.get('/:filename', async (req, res) => {
    const artifactPath = path.join(__dirname, '../uploads', req.params.filename);
    res.sendFile(artifactPath);
});

export default router;
