const mongoose = require('mongoose');

const recruiterSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
  },
  socialLinks: [
    {
      platform: { type: String, required: true },
      link: { type: String, required: true },
    },
  ],
  jobList: [
    {
      role: { type: String, required: true },
      description: { type: String, required: true },
      skillsRequired: [String], // Array of required skill strings
      salary: { type: Number },
    },
  ],
});

module.exports = mongoose.model('Recruiter', recruiterSchema);
