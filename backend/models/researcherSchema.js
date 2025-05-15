import mongoose from "mongoose";

const researcherSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: {
    type: String,
    required: true,
    unique: true,
    match: /^[a-zA-Z0-9]+$/,
  },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  institution: { type: String, enum: ["NTNU", "Other"] },
  createdAt: { type: Date, default: Date.now },
});

const Researcher = mongoose.model("Researcher", researcherSchema);
export default Researcher;
