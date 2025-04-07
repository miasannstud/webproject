import express from 'express';
import {studyController} from '../controllers/studyController.js';

const studyRoutes = express.Router();

// overview of all the routes. Theis functionality is created in studyController.js
studyRoutes.get('/', studyController.getStudies);
studyRoutes.get('/:studyId', studyController.getStudyById);
studyRoutes.post('/', studyController.createStudy);
studyRoutes.patch('/:studyId', studyController.updateStudy);
studyRoutes.delete('/:studyId', studyController.deleteStudy);
studyRoutes.patch('/:studyId/public', studyController.publishStudy);
studyRoutes.get('/:studyId/studyUrl', studyController.getStudyLink); // nope
// studyRoutes.get('/:studyId/sessions/responses', studyController.getStudyData); // nope
studyRoutes.get('/:studyId/sessions/download', studyController.downloadStudyData); // nope
// do we need both those two endpoints, thw two above? we need to get some results for the results page
// and we need all the data for the download. but can i just filter out what will be displayed on the results page
// and just use the same endpoint for both??

// question routes
studyRoutes.post('/:studyId/questions', studyController.createQuestion);
studyRoutes.patch('/:studyId/questions/:questionId', studyController.updateQuestion);
studyRoutes.delete('/:studyId/questions/:questionId', studyController.deleteQuestion);

export default studyRoutes;