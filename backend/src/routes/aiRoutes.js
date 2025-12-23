const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');
const { auth } = require('../middleware/auth');
const { validators, validate } = require('../middleware/validator');

// All AI routes require authentication
router.post('/summary', auth, validators.aiQuery, validate, aiController.generateSummary);
router.post('/predict', auth, aiController.generatePrediction);
router.post('/chat', auth, aiController.chat);
router.post('/report', auth, aiController.generateReport);
router.get('/stats', auth, aiController.getAIStats);

module.exports = router;
