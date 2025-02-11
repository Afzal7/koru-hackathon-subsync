const mongoose = require('mongoose');

const SchoolSchema = new mongoose.Schema({
  schoolInfo: {
    docs: { type: [String], default: [] },
    voiceNotes: { type: [String], default: [] },
    notes: { type: [String], default: [] },
  },
}, { timestamps: true });

module.exports = mongoose.model('schools', SchoolSchema);
