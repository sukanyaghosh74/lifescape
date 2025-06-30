const mongoose = require('mongoose');

const GoalSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ['active', 'completed', 'archived'], default: 'active' },
}, { timestamps: true });

module.exports = mongoose.model('Goal', GoalSchema); 