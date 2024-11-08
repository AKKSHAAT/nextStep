import express from 'express';
import Resume from '../models/Resume'; // Path to the Resume model
import { verifyToken } from '../middleware/auth'; // Optional: Add JWT token verification middleware

const router = express.Router();

// Create a new resume
router.post('/create', verifyToken, async (req, res) => {
  const { studentId, education, projects, skills } = req.body;

  try {
    const newResume = new Resume({
      studentId,
      education,
      projects,
      skills,
    });

    const savedResume = await newResume.save();
    res.status(201).json(savedResume);
  } catch (error) {
    console.error('Error creating resume:', error);
    res.status(500).json({ message: 'Error creating resume' });
  }
});

// Get a resume by studentId
router.get('/student/:studentId', async (req, res) => {
  const { studentId } = req.params;

  try {
    const resume = await Resume.findOne({ studentId }).populate('studentId');
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    res.status(200).json(resume);
  } catch (error) {
    console.error('Error fetching resume:', error);
    res.status(500).json({ message: 'Error fetching resume' });
  }
});

// Update a resume by studentId
router.put('/update/:studentId', verifyToken, async (req, res) => {
  const { studentId } = req.params;
  const { education, projects, skills } = req.body;

  try {
    const updatedResume = await Resume.findOneAndUpdate(
      { studentId },
      { education, projects, skills },
      { new: true }
    );

    if (!updatedResume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    res.status(200).json(updatedResume);
  } catch (error) {
    console.error('Error updating resume:', error);
    res.status(500).json({ message: 'Error updating resume' });
  }
});

// Delete a resume by studentId
router.delete('/delete/:studentId', verifyToken, async (req, res) => {
  const { studentId } = req.params;

  try {
    const deletedResume = await Resume.findOneAndDelete({ studentId });

    if (!deletedResume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    res.status(200).json({ message: 'Resume deleted successfully' });
  } catch (error) {
    console.error('Error deleting resume:', error);
    res.status(500).json({ message: 'Error deleting resume' });
  }
});

export default router;
