import { Schema, model } from "mongoose";

const ResearcherSchema = new Schema({
    "firstName":   { type: String, required: true},
    "lastName":    { type: String, required: true},
    "username":    { type: String, required: true, unique: true},
    "email":       { type: String, required: true, unique: true},
    "password":    { type: String, required: true},
    "institution": { type: String, enum:["NTNU", "Other"]},
    "createdAt":   { type: Date, default: Date.now,}
});

const Researcher = model("Researcher", ResearcherSchema);
export default Researcher;