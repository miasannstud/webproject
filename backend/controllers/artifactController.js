import Artifact from '../models/artifactSchema.js';
import fs from 'fs';

export const uploadArtifact = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: 'No artifact uploaded' });

        const artifactData = new Artifact({
            filename: req.file.filename,
            mimetype: req.file.mimetype,
            path: req.file.path,
            size: req.file.size
        });

        await artifactData.save();
        res.status(201).json({ message: 'Artifact uploaded successfully', artifact: artifactData });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const retrieveArtifact = async (req, res) => {
    try {
        const { limit = 10, skip = 0, sort = 'createdAt' } = req.query;
        const artifacts = await Artifact.find()
            .sort({ [sort]: -1 })
            .skip(parseInt(skip))
            .limit(parseInt(limit));

        res.json(artifacts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const deleteArtifact = async (req, res) => {
    try {
        const artifact = await Artifact.findByIdAndDelete(req.params.id);

        if (!artifact) return res.status(404).json({ message: 'Artifact not found' });

        fs.unlink(artifact.path, err => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Error: Metadata wiped from server, but artifact could not be deleted from disk' });
            }
            res.json({ message: 'Artifact has been deleted' });
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export default { uploadArtifact, retrieveArtifact, deleteArtifact };