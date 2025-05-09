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
  },
  answers: [
    {
      questionId: mongoose.Schema.Types.ObjectId,
      response: String, // think it is string..
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Session", sessionSchema);
