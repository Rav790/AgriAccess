const { body, query, validationResult } = require('express-validator');

// Middleware to check validation results
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};

// Validation rules
const validators = {
  register: [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('role').optional().isIn(['user', 'admin', 'researcher']).withMessage('Invalid role')
  ],
  
  login: [
    body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required')
  ],

  dataQuery: [
    query('state').optional().trim(),
    query('district').optional().trim(),
    query('year').optional().isInt({ min: 2000, max: 2030 }).withMessage('Invalid year'),
    query('limit').optional().isInt({ min: 1, max: 1000 }).withMessage('Limit must be between 1 and 1000')
  ],

  aiQuery: [
    body('query').trim().notEmpty().withMessage('Query is required'),
    body('dataContext').optional().isObject().withMessage('Data context must be an object')
  ]
};

module.exports = { validate, validators };
