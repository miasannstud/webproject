import bcrypt from "bcrypt";
import Researcher from "../models/researcherSchema.js";
import jwt from "jsonwebtoken";
import Study from "../models/studySchema.js";
import mongoose from "mongoose";

export const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, username, email, password, institution } =
      req.body;

    const existingUser = await Researcher.findOne({
      $or: [{ email }, { username }],
    });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await Researcher.create({
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword,
      institution,
    });

    res
      .status(201)
      .json({ message: "User registered successfully!", user: newUser });
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
      return res
        .status(500)
        .json({
          message: "JWT_SECRET is not defined in the environment variables",
        });
    }

    // Create JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      message: "Login successful",
      id: user._id,
      firstName: user.firstName,
      token,
    });
  } catch (error) {
    console.error("Login error:", error.message); // Log the error for debugging
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};

export const getStudiesByResearcherId = async (req, res) => {
  const researcherId = req.params.researcherId;

  try {
    const studies = await Study.find({ createdBy: researcherId });
    res.status(200).json(studies);
  } catch (error) {
    console.error("Error fetching studies:", error);
    res.status(500).json({ message: "Error fetching studies", error });
  }
};
