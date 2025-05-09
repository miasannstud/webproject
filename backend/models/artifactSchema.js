import mongoose from 'mongoose';

const artifactSchema = new mongoose.Schema({
    filename: { type: String, required: true }, // Ensure filename is stored
    mimetype: { type: String, required: true }, // Ensure MIME type is stored
    path: { type: String, required: true },
    size: { type: Number, required: true },
    url: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    studyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Study' }
});

const Artifact = mongoose.model('Artifact', artifactSchema);
export default Artifact;
