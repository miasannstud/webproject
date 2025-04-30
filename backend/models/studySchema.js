import mongoose from 'mongoose';

<<<<<<< HEAD
// create the schema for the studies
const studySchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    }
});
=======
// create the schema for the studies with embedded questions
const studySchema = new mongoose.Schema({
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    studyTitle: {
        type: String,
        max: 70,
    },
    description: {
        type: String,
        required: true,
        max: 200,
    },
    published: {
        type: Boolean,
        default: false,
    },
    // questions
    questions: [
        {
            questionText: {
                type: String,
                required: true,
                max: 150,
            },
            questionType: {
                type: String,
                required: true,
                enum: ['multiple-choice', 'text-box', 'slider'],
            },
            artifact: [
                {
                arttId: { type: mongoose.Schema.Types.ObjectId, ref: 'Artifact' },
                artUrl: { type: String },
                artType: { type: String },
                }
            ],
            options: [
                {
                    text: { type: String },
                }
            ],
        }
    ]
}, { timestamps: true });
>>>>>>> 49ad9388a459427b898415829234b7f7f4982060

export default mongoose.model('Study', studySchema);