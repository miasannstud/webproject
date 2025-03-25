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