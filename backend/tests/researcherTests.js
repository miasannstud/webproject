import mongoose from "mongoose";
import Researcher from "../models/researcher-schema.js";

import dotenv from "dotenv";
dotenv.config({ path: "../.env" });  // Adjust path if needed

console.log("Environment Variables:", process.env); // Debug output

const { MONGO_PROTOCOL, MONGO_HOST, MONGO_PORT, MONGO_DB_NAME } = process.env;
const MongoUrl = `${MONGO_PROTOCOL}://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB_NAME}`;

console.log("MongoDB URL:", MongoUrl); // Debug output
async function saveResearcher() {
    try {
        console.log("Connecting to MongoDB...");
        await mongoose.connect(MongoUrl);
        console.log("Connected to MongoDB");

        const newResearcher = new Researcher({
            firstName: "John",
            lastName: "Doe",
            username: "johndoe",
            email: "john.doe@example.com",
            password: "securepassword",
            institution: "NTNU"
        });

        const savedResearcher = await newResearcher.save();
        console.log("Researcher saved:", savedResearcher);

    } catch (error) {
        console.error("Error saving researcher:", error);
    } finally {
        mongoose.connection.close();
    }
}

saveResearcher();