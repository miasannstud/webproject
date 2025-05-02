import express from 'express';
import artifactController from '../controllers/artifactController.js';
import uploadMiddleware from '../middelware/uploadMiddleware.js';
import path from 'path';

/* testing area */ 
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
/* testing area */

const router = express.Router();

router.post('/upload', uploadMiddleware, artifactController.uploadArtifact);

router.get('/', async (req, res) => {
    try {
        const artifacts = await artifactController.getAllArtifacts(); // Use the new method
        res.json(artifacts);
    } catch (error) {
        console.error('Error retrieving artifacts:', error.message);
        res.status(500).json({ message: 'Error retrieving artifacts' });
    }
});

router.delete('/:id', artifactController.deleteArtifact);

router.get('/:filename', async (req, res) => {
    const artifactPath = path.join(__dirname, '../uploads', req.params.filename);
    res.sendFile(artifactPath);
});

export default router;
