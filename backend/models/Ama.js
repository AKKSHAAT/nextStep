import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  creatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Recruiter', required: true },
}, { timestamps: true });

const amaSchema = new mongoose.Schema({
  title: { type: String, required: true },  // Title of the AMA post (required)
  content: { type: String, required: true }, // Content of the AMA post (required)
  creatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Creator of the AMA post (reference to User model)
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }], // Array of comment references (reference to Comment model)
}, { timestamps: true }); // Automatically adds `createdAt` and `updatedAt` fields

// Create the Comment model
// Ama.js

export const Comment = mongoose.model('Comment', commentSchema);
export const Ama = mongoose.model('Ama', amaSchema);
