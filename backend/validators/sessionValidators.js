import { param, body, validationResult } from 'express-validator';

const handleValidation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array()[0].msg });
    }
    next();
  };

export const validateCreateSession = [
    param('studyId')
      .notEmpty().withMessage('Study ID is required')
      .isMongoId().withMessage('Invalid Study ID'),
    body('demographics.age')
      .optional()
      .isInt().withMessage('Age must be an integer')
      .isInt({ min: 0, max: 116 }).withMessage('Age must be between 0 and 116'),
    body('demographics.gender')
      .optional()
      .isIn(['Male', 'Female', 'Other']).withMessage('Gender must be Male, Female, or Other'),
    body('demographics.education')
      .optional()
      .isString().withMessage('Education must be a string'),
    body('demographics.country')
      .optional()
      .isString().withMessage('Country must be a string'),

    handleValidation
  ];
  
  export const validateAnswerQuestions = [
    param('sessionId')
      .isMongoId().withMessage('Invalid Session ID'),
    param('studyId')
      .isMongoId().withMessage('Invalid Study ID'),
    param('questionId')
      .isMongoId().withMessage('Invalid Question ID'),
    body('answers')
      .notEmpty().withMessage('Answer is required')
      .custom((value) => {
        if (typeof value === "string") return true;
        if (typeof value === "object" && value !== null) return true;
        return false;
      }).withMessage('Answers must be a string or object'),

    handleValidation
  ];