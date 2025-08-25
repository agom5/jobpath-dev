import { body, validationResult, param } from 'express-validator';

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map((err) => ({
        field: err.path,
        message: err.msg,
        value: err.value,
      })),
    });
  }
  next();
};

const validateRegister = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),

  body('email')
    .trim()
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),

  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage(
      'Password must contain at least one lowercase letter, one uppercase letter, and one number'
    ),

  handleValidationErrors,
];

const validateLogin = [
  body('email')
    .trim()
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),

  body('password').notEmpty().withMessage('Password is required'),

  handleValidationErrors,
];

const validateJob = [
  body('company')
    .trim()
    .notEmpty()
    .withMessage('Company name is required')
    .isLength({ max: 200 })
    .withMessage('Company name cannot exceed 200 characters'),

  body('position')
    .trim()
    .notEmpty()
    .withMessage('Position is required')
    .isLength({ max: 200 })
    .withMessage('Position cannot exceed 200 characters'),

  body('status')
    .isIn(['applied', 'interviewing', 'rejected', 'offered'])
    .withMessage(
      'Status must be one of: applied, interviewing, rejected, offered'
    ),

  body('applicationDate')
    .isISO8601()
    .withMessage('Application date must be a valid date')
    .custom((value) => {
      if (new Date(value) > new Date()) {
        throw new Error('Application date cannot be in the future');
      }
      return true;
    }),

  body('location')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('Location cannot exceed 200 characters'),

  body('salary')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Salary cannot exceed 100 characters'),

  body('description')
    .optional()
    .trim()
    .isLength({ max: 2000 })
    .withMessage('Description cannot exceed 2000 characters'),

  body('notes')
    .optional()
    .trim()
    .isLength({ max: 2000 })
    .withMessage('Notes cannot exceed 2000 characters'),

  handleValidationErrors,
];

const validateJobUpdate = [
  body('company')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Company name cannot be empty')
    .isLength({ max: 200 })
    .withMessage('Company name cannot exceed 200 characters'),

  body('position')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Position cannot be empty')
    .isLength({ max: 200 })
    .withMessage('Position cannot exceed 200 characters'),

  body('status')
    .optional()
    .isIn(['applied', 'interviewing', 'rejected', 'offered'])
    .withMessage(
      'Status must be one of: applied, interviewing, rejected, offered'
    ),

  body('applicationDate')
    .optional()
    .isISO8601()
    .withMessage('Application date must be a valid date')
    .custom((value) => {
      if (new Date(value) > new Date()) {
        throw new Error('Application date cannot be in the future');
      }
      return true;
    }),

  body('location')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('Location cannot exceed 200 characters'),

  body('salary')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Salary cannot exceed 100 characters'),

  body('description')
    .optional()
    .trim()
    .isLength({ max: 2000 })
    .withMessage('Description cannot exceed 2000 characters'),

  body('notes')
    .optional()
    .trim()
    .isLength({ max: 2000 })
    .withMessage('Notes cannot exceed 2000 characters'),

  handleValidationErrors,
];

const validateObjectId = [
  param('id').isMongoId().withMessage('Invalid ID format'),

  handleValidationErrors,
];

export {
  validateRegister,
  validateLogin,
  validateJob,
  validateJobUpdate,
  validateObjectId,
};
