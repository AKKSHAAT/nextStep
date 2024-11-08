const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  jobTitle: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  jobRole: {
    type: String,
    required: true,
  },
  aboutJob: {
    type: String,
    required: true,
  },
  jobType: {
    type: String,
    enum: ['Internship', 'Part-Time', 'Full-Time'],
    required: true,
  },
  skillsRequired: [String], // Array of required skill strings
  salary: {
    type: Number,
  },
  whoCanApply: [
    {
      qualification: { type: String, required: true },
      experience: { type: String, required: true },
    },
  ],
  dateOfPosting: {
    type: Date,
    default: Date.now,
  },
  lastDateToApply: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model('Post', postSchema);
