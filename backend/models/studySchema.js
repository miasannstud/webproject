import mongoose from 'mongoose';

// create the schema for the studies with embedded questions
const studySchema = new mongoose.Schema({
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Researcher',
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
    demographics: {
        type: [String],
        default: [],
    },
    expirationDate: {
        type: Date,
    },
    consent: {
        title: { type: String, max: 100, required: function() { return this.published; } },
        subtitle: { type: String, max: 150, },
        text: { type: String, required: function() { return this.published; } },
    },
    // questions
    questions: [
        {
            questionText: { type: String, max: 150 },
            questionType: { type: String, enum: ['multiple-choice', 'text-box', 'slider'] },
            artifact: [
                {
                    artId: { type: mongoose.Schema.Types.ObjectId, ref: 'Artifact' },
                    artUrl: { type: String },
                    mimetype: { type: String },
                }
            ],
            options: [
                { text: { type: String } }
            ],
            sliderRange: {
                minLabel: { type: String, default: "Add your own minimun parameters" },
                maxLabel: { type: String, default: "Add your own maximun parameters" },
                minValue: { type: Number, default: 0 },
                maxValue: { type: Number, default: 10 },
            },
        }
    ]
}, { timestamps: true });

export default mongoose.model('Study', studySchema);