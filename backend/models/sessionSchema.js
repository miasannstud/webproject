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
    type: Object,
    default: {},
  },
  answers: [
    {
      questionId: mongoose.Schema.Types.ObjectId,
      response: mongoose.Schema.Types.Mixed,
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Session", sessionSchema);
