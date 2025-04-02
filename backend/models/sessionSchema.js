import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
    studyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Study', required: true },
    demographics: {
        age: { type: Number, required: true },
        gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
        location: { type: String }
    },
    answers: [
        {
            questionId: { type: mongoose.Schema.Types.ObjectId, required: true },
            response: { type: String, required: true } // Can be text, rating, or choice
        }
    ],
    createdAt: { type: Date, default: Date.now }
});

const Session = mongoose.model('Session', sessionSchema);
export default Session;