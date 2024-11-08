const mongoose = require('mongoose');

// Define the Job schema
const jobSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Job title (required)
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }], // Array of students who applied
  recruiterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Recruiter', required: true }, // Reference to Recruiter model
  companyName: { type: String, required: true }, // Company name (required)
  skills: { type: [String]},
}, { timestamps: true }); // Automatically adds `createdAt` and `updatedAt` fields

// Create the Job model
const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
