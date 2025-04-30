<<<<<<< HEAD
import { validationResult } from "express-validator";
import { researcherService } from "../Schema/researcher-Schema.js";

// // [GET, POST] /researchers;

// researchersRouter.get('/', (req, res) => {
//     new Error("not implemented")
// });

export function getAllResearchers(req, res) {
    // Decide how to respond 404 400 or 201
    // Todo use researcherservice to find/crete/update researcher (and interact with mongodb)
    new Error("not implemented")
}

export function createResearcher(req, res) {
    new Error("not implemented")
}

export function getResearcher(req, res) {
    new Error("not implemented")
}

export function updateResearcher(req, res) {
    new Error("not implemented")
}

export function deleteResearcher(req, res) {
    new Error("not implemented")
}
=======
import bcrypt from 'bcrypt';
import Researcher from '../models/researcherSchema.js';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
    try {
        const { firstName, lastName, username, email, password, institution } = req.body;

        const existingUser = await Researcher.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists!" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await Researcher.create({ firstName, lastName, username, email, password: hashedPassword, institution });

        res.status(201).json({ message: "User registered successfully!", user: newUser });
    } catch (error) {
        res.status(500).json({ message: "Error registering user", error });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await Researcher.findOne({ username });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Check if JWT_SECRET is defined
        if (!process.env.JWT_SECRET) {
            return res.status(500).json({ message: "JWT_SECRET is not defined in the environment variables" });
        }

        // Create JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: "Login successful", id: user._id, token });
    } catch (error) {
        console.error("Login error:", error.message); // Log the error for debugging
        res.status(500).json({ message: "Error logging in", error: error.message });
    }
};
>>>>>>> 49ad9388a459427b898415829234b7f7f4982060
