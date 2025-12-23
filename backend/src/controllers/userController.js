const UserReport = require('../models/UserReport');
const Analytics = require('../models/Analytics');

// @desc    Get user's saved assessments
// @route   GET /api/users/assessments
// @access  Private
exports.getAssessments = async (req, res, next) => {
  try {
    const { limit = 20, skip = 0, reportType } = req.query;

    const filter = { userId: req.userId };
    if (reportType) filter.reportType = reportType;

    const assessments = await UserReport.find(filter)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(parseInt(skip));

    const total = await UserReport.countDocuments(filter);

    res.json({
      success: true,
      data: assessments,
      pagination: {
        total,
        limit: parseInt(limit),
        skip: parseInt(skip)
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Save new assessment
// @route   POST /api/users/assessments
// @access  Private
exports.saveAssessment = async (req, res, next) => {
  try {
    const { 
      title, 
      description, 
      reportType, 
      filters, 
      dataSnapshot, 
      aiInsights, 
      visualizations,
      tags,
      isPublic 
    } = req.body;

    const assessment = await UserReport.create({
      userId: req.userId,
      title,
      description,
      reportType,
      filters,
      dataSnapshot,
      aiInsights,
      visualizations,
      tags,
      isPublic: isPublic || false
    });

    // Log analytics
    await Analytics.create({
      userId: req.userId,
      eventType: 'data_query',
      action: 'save_assessment',
      metadata: { assessmentId: assessment._id, reportType },
      ipAddress: req.ip
    });

    res.status(201).json({
      success: true,
      message: 'Assessment saved successfully',
      data: assessment
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update assessment
// @route   PUT /api/users/assessments/:id
// @access  Private
exports.updateAssessment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const assessment = await UserReport.findOne({
      _id: id,
      userId: req.userId
    });

    if (!assessment) {
      return res.status(404).json({
        success: false,
        message: 'Assessment not found'
      });
    }

    Object.assign(assessment, updates);
    await assessment.save();

    res.json({
      success: true,
      message: 'Assessment updated successfully',
      data: assessment
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete assessment
// @route   DELETE /api/users/assessments/:id
// @access  Private
exports.deleteAssessment = async (req, res, next) => {
  try {
    const { id } = req.params;

    const assessment = await UserReport.findOneAndDelete({
      _id: id,
      userId: req.userId
    });

    if (!assessment) {
      return res.status(404).json({
        success: false,
        message: 'Assessment not found'
      });
    }

    res.json({
      success: true,
      message: 'Assessment deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user analytics
// @route   GET /api/users/analytics
// @access  Private
exports.getUserAnalytics = async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;

    const filter = { userId: req.userId };
    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) filter.createdAt.$gte = new Date(startDate);
      if (endDate) filter.createdAt.$lte = new Date(endDate);
    }

    const analytics = await Analytics.aggregate([
      { $match: filter },
      {
        $group: {
          _id: '$eventType',
          count: { $sum: 1 }
        }
      }
    ]);

    const totalEvents = await Analytics.countDocuments(filter);

    // Get favorite regions
    const favoriteRegions = await Analytics.aggregate([
      { 
        $match: { 
          userId: req.userId,
          'metadata.state': { $exists: true }
        } 
      },
      {
        $group: {
          _id: '$metadata.state',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);

    res.json({
      success: true,
      data: {
        totalEvents,
        eventBreakdown: analytics,
        favoriteRegions: favoriteRegions.map(r => ({
          state: r._id,
          count: r.count
        }))
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Track user activity
// @route   POST /api/users/track
// @access  Private
exports.trackActivity = async (req, res, next) => {
  try {
    const { eventType, page, action, metadata, duration, sessionId } = req.body;

    await Analytics.create({
      userId: req.userId,
      eventType,
      page,
      action,
      metadata,
      duration,
      sessionId,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    });

    res.json({
      success: true,
      message: 'Activity tracked'
    });
  } catch (error) {
    // Don't fail the request if tracking fails
    console.error('Analytics tracking error:', error);
    res.json({
      success: true,
      message: 'Request completed'
    });
  }
};

module.exports = exports;
