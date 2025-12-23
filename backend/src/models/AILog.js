const mongoose = require('mongoose');

const aiLogSchema = new mongoose.Schema({
  userId: {
    type: Number,
    index: true
  },
  queryType: {
    type: String,
    enum: ['summary', 'prediction', 'chat', 'report'],
    required: true
  },
  prompt: {
    type: String,
    required: true
  },
  inputData: {
    type: mongoose.Schema.Types.Mixed
  },
  response: {
    type: mongoose.Schema.Types.Mixed
  },
  model: {
    type: String,
    default: 'gemini-1.5-flash'
  },
  tokensUsed: {
    type: Number
  },
  responseTime: {
    type: Number, // in milliseconds
  },
  success: {
    type: Boolean,
    default: true
  },
  errorMessage: {
    type: String
  },
  ipAddress: {
    type: String
  }
}, {
  timestamps: true
});

// Index for analytics
aiLogSchema.index({ userId: 1, createdAt: -1 });
aiLogSchema.index({ queryType: 1 });
aiLogSchema.index({ success: 1 });

module.exports = mongoose.model('AILog', aiLogSchema);
