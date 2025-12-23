const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { auth } = require('../middleware/auth');

// All user routes require authentication
router.get('/assessments', auth, userController.getAssessments);
router.post('/assessments', auth, userController.saveAssessment);
router.put('/assessments/:id', auth, userController.updateAssessment);
router.delete('/assessments/:id', auth, userController.deleteAssessment);
router.get('/analytics', auth, userController.getUserAnalytics);
router.post('/track', auth, userController.trackActivity);

module.exports = router;
