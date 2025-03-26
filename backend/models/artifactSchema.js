import mongoose from 'mongoose';

// create the schema for the studies
const artifactSchema = new mongoose.Schema({
    filename: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    },
    mimeType: {
        type: String,
    },
    size: {
        type: Number
    }, 
}, {timestamps: true });

export default mongoose.model('Artifact', artifactSchema);