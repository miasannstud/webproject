import express from 'express';
import {createSession, getSessions} from '../controllers/sessionController';

const sessionRoutes = express.Router();

// overview of all the routes. This functionality is created in studyController.js
studyRoutes.post('/', createSession);
studyRoutes.get('/:studyId', getSessions);

export default sessionRoutes;