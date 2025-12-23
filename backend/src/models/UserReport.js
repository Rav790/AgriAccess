const mongoose = require('mongoose');

const userReportSchema = new mongoose.Schema({
  userId: {
    type: Number,
    required: true,
    index: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  reportType: {
    type: String,
    enum: ['summary', 'prediction', 'custom', 'ai_generated'],
    required: true
  },
  filters: {
    states: [String],
    districts: [String],
    years: [Number],
    crops: [String],
    irrigationSources: [String]
  },
  dataSnapshot: {
    type: mongoose.Schema.Types.Mixed
  },
  aiInsights: {
    summary: String,
    recommendations: [String],
    predictions: mongoose.Schema.Types.Mixed,
    confidence: Number
  },
  visualizations: [{
    type: String,
    chartData: mongoose.Schema.Types.Mixed
  }],
  isPublic: {
    type: Boolean,
    default: false
  },
  tags: [String],
  favoriteRegions: [String]
}, {
  timestamps: true
});

// Index for faster queries
userReportSchema.index({ userId: 1, createdAt: -1 });
userReportSchema.index({ tags: 1 });

module.exports = mongoose.model('UserReport', userReportSchema);
