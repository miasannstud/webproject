import express from 'express';
import { createUserValidator } from '../validators/researcherValidators.js';
import { handleValidationErrors } from '../middelware/vaildateErrors.js';
import { registerUser, loginUser, getStudiesByResearcherId } from '../controllers/researcherController.js';

const router = express.Router();

// Route for user registration
router.post('/signup', createUserValidator, handleValidationErrors, registerUser);

// Route for user login
router.post('/login', loginUser);

/* router.delete('/api/researchers/:id'); */

// Get studies for a one researcher
router.get('/:researcherId/studies', getStudiesByResearcherId); 

export default router; 