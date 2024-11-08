import express from 'express';
import Recruiter from '../models/Recruiter.js'; // Path to your recruiter model
import jwt from 'jsonwebtoken';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Register a new recruiter
router.post('/register', async (req, res) => {
  const { email, companyName, password, profilePicture } = req.body;

  try {
    const existingRecruiter = await Recruiter.findOne({ email });
    if (existingRecruiter) {
      return res.status(400).json({ message: 'Recruiter already exists' });
    }

    const newRecruiter = new Recruiter({
      email,
      companyName,
      password,
      profilePicture,
    });

    const savedRecruiter = await newRecruiter.save();
    const token = jwt.sign({ id: savedRecruiter._id, email: savedRecruiter.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ message: 'Recruiter registered successfully', token });
  } catch (error) {
    console.error('Error registering recruiter:', error);
    res.status(500).json({ message: 'Error registering recruiter' });
  }
});

// Login recruiter
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const recruiter = await Recruiter.findOne({ email });
    if (!recruiter) {
      return res.status(404).json({ message: 'Recruiter not found' });
    }

    // Here we are directly comparing passwords without bcrypt (not recommended in production)
    if (recruiter.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: recruiter._id, email: recruiter.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error logging in recruiter:', error);
    res.status(500).json({ message: 'Error logging in recruiter' });
  }
});

// Update recruiter profile
router.put('/update', verifyToken, async (req, res) => {
  const { companyName, profilePicture } = req.body;

  try {
    const recruiter = await Recruiter.findById(req.user.id);
    if (!recruiter) {
      return res.status(404).json({ message: 'Recruiter not found' });
    }

    // Update the fields
    recruiter.companyName = companyName || recruiter.companyName;
    recruiter.profilePicture = profilePicture || recruiter.profilePicture;

    const updatedRecruiter = await recruiter.save();
    res.status(200).json({ message: 'Profile updated successfully', updatedRecruiter });
  } catch (error) {
    console.error('Error updating recruiter:', error);
    res.status(500).json({ message: 'Error updating recruiter' });
  }
});

// Delete recruiter account
router.delete('/delete', verifyToken, async (req, res) => {
  try {
    const recruiter = await Recruiter.findByIdAndDelete(req.user.id);
    if (!recruiter) {
      return res.status(404).json({ message: 'Recruiter not found' });
    }

    res.status(200).json({ message: 'Recruiter account deleted successfully' });
  } catch (error) {
    console.error('Error deleting recruiter:', error);
    res.status(500).json({ message: 'Error deleting recruiter' });
  }
});


router.get('/:recruiterId', verifyToken, async (req, res) => {
  const { recruiterId } = req.params;

  try {
    // Find recruiter by ID
    const recruiter = await Recruiter.findById(recruiterId);

    // If recruiter is not found
    if (!recruiter) {
      return res.status(404).json({ message: 'Recruiter not found' });
    }

    res.status(200).json(recruiter);
  } catch (error) {
    console.error('Error fetching recruiter:', error);
    res.status(500).json({ message: 'Error fetching recruiter' });
  }
});

export default router;
