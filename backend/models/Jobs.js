const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  recruiterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recruiter', // Reference to the recruiter posting the job
    required: true,
  },
  jobPosts: [
    {
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
      qualifications: [String], // Array of required qualifications
      experience: { type: String }, // Experience required for the position
      salary: {
        type: Number,
      },
      dateOfPosting: {
        type: Date,
        default: Date.now,
      },
      lastDateToApply: {
        type: Date,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model('Post', postSchema);
