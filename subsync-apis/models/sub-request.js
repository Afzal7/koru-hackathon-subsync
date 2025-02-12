const mongoose = require('mongoose');

const SubRequestSchema = new mongoose.Schema({
  lessonPlans: {
    docs: { type: [String], default: [] },
    voiceNotes: { type: [String], default: [] },
    notes: { type: [String], default: [] },
  },
  summary: { type: String, default: '' },
  startDate: { type: Date, default: null }, 
  endDate: { type: Date, default: null }, 
  subEmail: { type: String, required: true }, 
  classId: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true }, // Foreign key
}, { timestamps: true });

module.exports = mongoose.model('sub-requests', SubRequestSchema);
