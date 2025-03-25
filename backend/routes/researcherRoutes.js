import express from 'express'
const ResearcherRouter = express.Router();

// Get post researcher
ResearcherRouter.get('/', ResearcherValidators.findResearcher,researcherController.getResearcher);
ResearcherRouter.post('/', ResearcherValidators.createResearcher,researcherController.createResearcher);

export default ResearcherRouter