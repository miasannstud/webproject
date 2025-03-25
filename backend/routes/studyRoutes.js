import express from 'express';
import {studyController} from '../controllers/studyController.js';

const studyRoutes = express.Router();

// overview of all the routes. Theis functionality is created in studyController.js
studyRoutes.post('/', studyController.createStudy);
studyRoutes.get('/', studyController.getStudy);
studyRoutes.delete('/:id', studyController.deleteStudy);

export default studyRoutes;