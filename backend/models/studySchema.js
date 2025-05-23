import mongoose from "mongoose";

// create the schema for the studies with embedded questions
const studySchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Researcher",
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
      title: { type: String, max: 100, required: true },
      author: { type: String, max: 100 },
      subtitle: { type: String, max: 150 },
      text: { type: String, required: true },
    },
    // questions
    questions: [
      {
        questionText: {
          type: String,
          max: 150,
        },
        questionType: {
          type: String,
          enum: ["multiple-choice", "text-box", "slider", "ranked"],
        },
        artifact: [
          {
            artId: { type: mongoose.Schema.Types.ObjectId, ref: "Artifact" },
            artUrl: { type: String },
            mimetype: { type: String },
          },
        ],
        options: [{ text: { type: String } }],
        sliderRange: {
          minLabel: {
            type: String,
            default: "Add your own minimum parameters",
          },
          maxLabel: {
            type: String,
            default: "Add your own maximum parameters",
          },
          minValue: { type: Number, default: 0 },
          maxValue: { type: Number, default: 10 },
        },

        rankedLabels: {
          type: [String],
          default: "Add your own parameters",
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Study", studySchema);
