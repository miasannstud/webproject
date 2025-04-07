import express from 'express';
import {createSession} from '../controllers/sessionController.js';

const sessionRoutes = express.Router(); 

// this functionality is created in sessionController.js
sessionRoutes.post('/:studyId/sessions', createSession);

export default sessionRoutes;