<<<<<<< HEAD
import express from 'express'
const ResearcherRouter = express.Router();

// Get post researcher
ResearcherRouter.get('/', ResearcherValidators.findResearcher,researcherController.getResearcher);
ResearcherRouter.post('/', ResearcherValidators.createResearcher,researcherController.createResearcher);

export default ResearcherRouter
=======
import express from 'express';
import { createUserValidator } from '../validators/researcherValidators.js';
import { handleValidationErrors } from '../middelware/vaildateErrors.js';
import { registerUser, loginUser } from '../controllers/researcherController.js';

const router = express.Router();

// Route for user registration
router.post('/signup', registerUser);

// Route for user login
router.post('/login', loginUser);

export default router; 
>>>>>>> 49ad9388a459427b898415829234b7f7f4982060
