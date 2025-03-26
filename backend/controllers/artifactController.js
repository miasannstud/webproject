const Artifact = require('../models/artifactSchema');
const fs = require('fs');

exports.uploadArtifact = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    const fileData = new File({
        filename: req.file.filename,
        mimetype: req.file.mimetype,
        path: req.file.path,
        size: req.file.size
    });
    

    await fileData.save();

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.retrieveArtifact = async (req, res) => {
    try {
        const { limit = 10, skip = 0, sort = 'createdAt' } = req.query;
        const files = await File.find()
            .sort({ [sort]: -1 })
            .skip(parseInt(skip))
            .limit(parseInt(limit));

        res.json(files);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteArtifact = async (req, res) => {
    try {
       
        const file = await File.findByIdAndDelete(req.params.id);
        
        if (!file) return res.status(404).json({ message: 'File not found' });

        fs.unlink(file.path, err => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Error: Metadata wiped from server, but file could not be deleted from disk'});
            }
            res.json({ message: 'File has been deleted' });
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

