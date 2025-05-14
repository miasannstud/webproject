import express from 'express';
import {createSession, answerQuestions, countSessions} from '../controllers/sessionController.js';
/* import { validateCreateSession, validateAnswerQuestions } from '../validators/sessionValidators.js'; */

const sessionRoutes = express.Router();

// this functionality is created in sessionController.js

sessionRoutes.post('/:studyId/sessions', /* validateCreateSession, */ createSession);
sessionRoutes.post('/:studyId/sessions/:sessionId/answers/:questionId', /* validateAnswerQuestions, */ answerQuestions);
sessionRoutes.get('/:studyId/sessions/count', countSessions);

export default sessionRoutes;