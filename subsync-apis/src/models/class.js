const mongoose = require('mongoose');

const ClassSchema = new mongoose.Schema({
  studentInfo: {
    docs: { type: [String], default: [] }, // Array of document URLs or IDs
    voiceNotes: { type: [String], default: [] }, // Array of voice note URLs
    notes: { type: [String], default: [] }, // Array of text notes
  },
  schoolId: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true }, // Foreign key
}, { timestamps: true });

module.exports = mongoose.model('classes', ClassSchema);
