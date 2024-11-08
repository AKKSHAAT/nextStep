const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  jobRole: {
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
  resume: {
    education: [
      {
        institution: { type: String, required: true },
        degree: { type: String, required: true },
        startYear: { type: Number, required: true },
        endYear: { type: Number },
      },
    ],
    projects: [
      {
        title: { type: String, required: true },
        description: { type: String },
        technologies: [String],
        link: { type: String },
      },
    ],
    skills: [String], // Array of skill strings
  },
});

module.exports = mongoose.model('Student', studentSchema);
