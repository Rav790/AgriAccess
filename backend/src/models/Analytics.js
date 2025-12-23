const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
  userId: {
    type: Number,
    index: true
  },
  eventType: {
    type: String,
    required: true,
    enum: ['page_view', 'data_query', 'filter_applied', 'export', 'share', 'ai_query']
  },
  page: {
    type: String
  },
  action: {
    type: String
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed
  },
  duration: {
    type: Number // in seconds
  },
  sessionId: {
    type: String,
    index: true
  },
  ipAddress: {
    type: String
  },
  userAgent: {
    type: String
  }
}, {
  timestamps: true
});

// Indexes for analytics queries
analyticsSchema.index({ eventType: 1, createdAt: -1 });
analyticsSchema.index({ userId: 1, sessionId: 1 });

module.exports = mongoose.model('Analytics', analyticsSchema);
