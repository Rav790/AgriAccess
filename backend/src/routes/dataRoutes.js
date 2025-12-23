const express = require('express');
const router = express.Router();
const dataController = require('../controllers/dataController');
const { auth, authorize } = require('../middleware/auth');
const { validators, validate } = require('../middleware/validator');
const multer = require('multer');

// Configure multer for file uploads
const upload = multer({ 
  dest: 'uploads/',
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// Public routes (accessible to all, including guests)
router.get('/regions', validators.dataQuery, validate, dataController.getRegions);
router.get('/landholdings', validators.dataQuery, validate, dataController.getLandHoldings);
router.get('/irrigation', validators.dataQuery, validate, dataController.getIrrigationSources);
router.get('/cropping', validators.dataQuery, validate, dataController.getCroppingPatterns);
router.get('/wells', validators.dataQuery, validate, dataController.getWellDepths);
router.get('/stats', validators.dataQuery, validate, dataController.getStatistics);

// Protected routes (admin only)
router.post('/upload', auth, authorize('admin'), upload.single('file'), dataController.uploadData);

module.exports = router;
