import mongoose from 'mongoose';

// how to fetch   const resume = await Resume.findOne({ studentId }).populate('studentId');

const educationSchema = new mongoose.Schema({
  institution: { type: String, required: true },
  
  degree: { type: String, required: true },
});

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  technologies: { type: [String], required: true },
  link: { type: String, required: true },
});

// Define the resume schema
const resumeSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true }, // Reference to the Student model
  education: [educationSchema], // Array of education objects
  projects: [projectSchema], // Array of project objects
  skills: { type: [String]}, // Array of skill strings
}, { timestamps: true }); // Automatically adds `createdAt` and `updatedAt`

export default mongoose.model('Resume', resumeSchema);
