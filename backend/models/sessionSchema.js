import mongoose from "mongoose";

// session schema
const sessionSchema = new mongoose.Schema({
  // link session to study
  studyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Study",
    required: true,
  },
  demographics: {
    age: { type: Number, required: true },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    education: { type: String, enum: ["High school", "Bachelor's", "Master's", "PhD", "Other"], required: true },
    country: { type: String, required: true },
  },
  answers: [
    {
      questionId: mongoose.Schema.Types.ObjectId,
      response: String,
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Session", sessionSchema);
