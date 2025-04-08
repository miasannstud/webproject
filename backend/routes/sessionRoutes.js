import express from 'express';
import {createSession, countSessions} from '../controllers/sessionController.js';

const sessionRoutes = express.Router(); 

// this functionality is created in sessionController.js
sessionRoutes.post('/:studyId/sessions', createSession);
sessionRoutes.get('/:studyId/sessions/count', countSessions);

export default sessionRoutes;