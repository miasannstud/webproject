/* import express from 'express';
import {studyController} from '../controllers/studyController.js';

const studyRoutes = express.Router();

// overview of all the routes. Theis functionality is created in studyController.js
studyRoutes.get('/', studyController.getStudies);
studyRoutes.get('/:studyId', studyController.getStudyById);
studyRoutes.post('/', studyController.createStudy);
studyRoutes.patch('/:studyId', studyController.updateStudy);
studyRoutes.delete('/:studyId', studyController.deleteStudy);
studyRoutes.patch('/:studyId/public', studyController.publishStudy);
studyRoutes.get('/:studyId/studyUrl', studyController.getStudyLink);
studyRoutes.get('/:studyId/sessions/download', studyController.getStudyData);

// question routes
studyRoutes.post('/:studyId/questions', studyController.createQuestion);
studyRoutes.patch('/:studyId/questions/:questionId', studyController.updateQuestion);
studyRoutes.delete('/:studyId/questions/:questionId', studyController.deleteQuestion);

export default studyRoutes; */