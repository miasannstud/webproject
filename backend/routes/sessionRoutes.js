import express from 'express';
import {createSession, answerQuestions, countSessions} from '../controllers/sessionController.js';

const sessionRoutes = express.Router(); 

// this functionality is created in sessionController.js
sessionRoutes.post('/:studyId/sessions', createSession);
sessionRoutes.post('/:studyId/sessions/:sessionId/answers/:quizId', answerQuestions);
sessionRoutes.get('/:studyId/sessions/count', countSessions);

export default sessionRoutes;