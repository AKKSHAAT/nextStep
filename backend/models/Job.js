import mongoose from 'mongoose';

// Define the Job schema
const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true }, // Job title (required)
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }], // Array of students who applied (optional)
    recruiterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Recruiter', required: true }, // Reference to Recruiter model
    companyName: { type: String, required: true }, // Company name (required)
    skills: { type: [String], required: true }, // Skills array (required)
  },
  { timestamps: true } // Automatically adds `createdAt` and `updatedAt` fields
);

// Create the Job model
export default mongoose.model('Job', jobSchema);


